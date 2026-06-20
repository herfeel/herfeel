<?php
/**
 * Plugin Name: PlayAh Auth Bridge V2
 * Description: Customer auth bridge for PlayAh storefront sessions.
 * Version: 0.1.5
 * Author: PlayAh
 */

if (!defined('ABSPATH')) {
    exit;
}

const PLAYAH_AUTH_NAMESPACE = 'playah/v1';
const PLAYAH_AUTH_BRIDGE_VERSION = '0.1.5';
const PLAYAH_AUTH_SESSION_TTL = WEEK_IN_SECONDS;
const PLAYAH_AUTH_RATE_LIMIT = 5;
const PLAYAH_AUTH_RATE_WINDOW = 15 * MINUTE_IN_SECONDS;
const PLAYAH_AUTH_CART_META_KEY = 'playah_cart_snapshot';
const PLAYAH_AUTH_CART_MAX_ITEMS = 24;

register_activation_hook(__FILE__, 'playah_auth_bridge_activate');
add_action('rest_api_init', 'playah_auth_bridge_register_routes');
add_filter('rest_pre_serve_request', 'playah_auth_bridge_send_cors_headers', 10, 4);

function playah_auth_bridge_activate(): void
{
    global $wpdb;

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';

    $table = playah_auth_bridge_table_name();
    $charset_collate = $wpdb->get_charset_collate();

    dbDelta("CREATE TABLE {$table} (
        id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        token_hash char(64) NOT NULL,
        user_id bigint(20) unsigned NOT NULL,
        expires_at datetime NOT NULL,
        revoked_at datetime DEFAULT NULL,
        created_at datetime NOT NULL,
        last_seen_at datetime DEFAULT NULL,
        ip_hash char(64) DEFAULT NULL,
        user_agent varchar(255) DEFAULT NULL,
        PRIMARY KEY  (id),
        UNIQUE KEY token_hash (token_hash),
        KEY user_id (user_id),
        KEY expires_at (expires_at)
    ) {$charset_collate};");
}

function playah_auth_bridge_register_routes(): void
{
    register_rest_route(PLAYAH_AUTH_NAMESPACE, '/login', [
        'methods' => WP_REST_Server::CREATABLE,
        'callback' => 'playah_auth_bridge_login',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route(PLAYAH_AUTH_NAMESPACE, '/register', [
        'methods' => WP_REST_Server::CREATABLE,
        'callback' => 'playah_auth_bridge_register',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route(PLAYAH_AUTH_NAMESPACE, '/me', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'playah_auth_bridge_me',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route(PLAYAH_AUTH_NAMESPACE, '/logout', [
        'methods' => WP_REST_Server::CREATABLE,
        'callback' => 'playah_auth_bridge_logout',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route(PLAYAH_AUTH_NAMESPACE, '/status', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'playah_auth_bridge_status',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route(PLAYAH_AUTH_NAMESPACE, '/cart', [
        [
            'methods' => WP_REST_Server::READABLE,
            'callback' => 'playah_auth_bridge_get_cart',
            'permission_callback' => '__return_true',
        ],
        [
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => 'playah_auth_bridge_put_cart',
            'permission_callback' => '__return_true',
        ],
    ]);

    register_rest_route(PLAYAH_AUTH_NAMESPACE, '/orders', [
        'methods' => WP_REST_Server::CREATABLE,
        'callback' => 'playah_auth_bridge_create_order',
        'permission_callback' => '__return_true',
    ]);
}

function playah_auth_bridge_status(WP_REST_Request $request)
{
    return new WP_REST_Response([
        'ok' => true,
        'pluginName' => 'PlayAh Auth Bridge V2',
        'version' => PLAYAH_AUTH_BRIDGE_VERSION,
        'namespace' => PLAYAH_AUTH_NAMESPACE,
        'cartEnabled' => true,
        'ordersEnabled' => true,
    ], 200);
}

function playah_auth_bridge_login(WP_REST_Request $request)
{
    $params = playah_auth_bridge_json_params($request);
    $email = sanitize_email($params['email'] ?? '');
    $password = (string) ($params['password'] ?? '');

    if (!is_email($email) || strlen($password) < 6) {
        return playah_auth_bridge_error('playah_invalid_credentials', 'Email hoặc mật khẩu không đúng.', 401);
    }

    if (!playah_auth_bridge_check_rate_limit('login', $email)) {
        return playah_auth_bridge_error('playah_rate_limited', 'Bạn thử quá nhiều lần. Vui lòng quay lại sau vài phút.', 429);
    }

    $user = wp_authenticate($email, $password);

    if (is_wp_error($user)) {
        return playah_auth_bridge_error('playah_invalid_credentials', 'Email hoặc mật khẩu không đúng.', 401);
    }

    $token = playah_auth_bridge_create_session((int) $user->ID);

    return new WP_REST_Response([
        'ok' => true,
        'token' => $token,
        'user' => playah_auth_bridge_user_payload($user),
    ], 200);
}

function playah_auth_bridge_register(WP_REST_Request $request)
{
    $params = playah_auth_bridge_json_params($request);
    $email = sanitize_email($params['email'] ?? '');
    $password = (string) ($params['password'] ?? '');
    $first_name = sanitize_text_field($params['firstName'] ?? '');
    $last_name = sanitize_text_field($params['lastName'] ?? '');
    $phone = sanitize_text_field($params['phone'] ?? '');

    if (!is_email($email) || strlen($password) < 6 || $first_name === '' || $last_name === '') {
        return playah_auth_bridge_error('playah_invalid_register', 'Thông tin đăng ký chưa hợp lệ.', 400);
    }

    if (!playah_auth_bridge_check_rate_limit('register', $email)) {
        return playah_auth_bridge_error('playah_rate_limited', 'Bạn thử quá nhiều lần. Vui lòng quay lại sau vài phút.', 429);
    }

    if (email_exists($email) || username_exists($email)) {
        return playah_auth_bridge_error('playah_existing_customer', 'Email này đã có tài khoản.', 409);
    }

    $user_id = wp_create_user($email, $password, $email);

    if (is_wp_error($user_id)) {
        return playah_auth_bridge_error($user_id->get_error_code(), $user_id->get_error_message(), 400);
    }

    wp_update_user([
        'ID' => $user_id,
        'first_name' => $first_name,
        'last_name' => $last_name,
    ]);

    $user = get_user_by('id', $user_id);
    if ($user instanceof WP_User) {
        $role = get_role('customer') ? 'customer' : 'subscriber';
        $user->set_role($role);
    }

    update_user_meta($user_id, 'billing_first_name', $first_name);
    update_user_meta($user_id, 'billing_last_name', $last_name);
    update_user_meta($user_id, 'billing_phone', $phone);

    $token = playah_auth_bridge_create_session((int) $user_id);

    return new WP_REST_Response([
        'ok' => true,
        'token' => $token,
        'user' => playah_auth_bridge_user_payload(get_user_by('id', $user_id)),
    ], 201);
}

function playah_auth_bridge_me(WP_REST_Request $request)
{
    $session = playah_auth_bridge_get_session_from_request($request);

    if (!$session) {
        return playah_auth_bridge_error('playah_invalid_session', 'Phiên đăng nhập đã hết hạn.', 401);
    }

    $user = get_user_by('id', (int) $session['user_id']);

    if (!$user instanceof WP_User) {
        return playah_auth_bridge_error('playah_invalid_session', 'Phiên đăng nhập đã hết hạn.', 401);
    }

    playah_auth_bridge_touch_session((int) $session['id']);

    return new WP_REST_Response([
        'ok' => true,
        'user' => playah_auth_bridge_user_payload($user),
    ], 200);
}

function playah_auth_bridge_logout(WP_REST_Request $request)
{
    $session = playah_auth_bridge_get_session_from_request($request);

    if ($session) {
        playah_auth_bridge_revoke_session((int) $session['id']);
    }

    return new WP_REST_Response(['ok' => true], 200);
}

function playah_auth_bridge_get_cart(WP_REST_Request $request)
{
    $session = playah_auth_bridge_get_session_from_request($request);

    if (!$session) {
        return playah_auth_bridge_error('playah_invalid_session', 'Phiên đăng nhập đã hết hạn.', 401);
    }

    playah_auth_bridge_touch_session((int) $session['id']);

    return new WP_REST_Response([
        'ok' => true,
        'cart' => playah_auth_bridge_read_cart_snapshot((int) $session['user_id']),
    ], 200);
}

function playah_auth_bridge_put_cart(WP_REST_Request $request)
{
    $session = playah_auth_bridge_get_session_from_request($request);

    if (!$session) {
        return playah_auth_bridge_error('playah_invalid_session', 'Phiên đăng nhập đã hết hạn.', 401);
    }

    $params = playah_auth_bridge_json_params($request);
    if (!isset($params['cart']) || !is_array($params['cart'])) {
        return playah_auth_bridge_error('playah_invalid_cart', 'Giỏ hàng chưa hợp lệ.', 400);
    }

    $cart = playah_auth_bridge_sanitize_cart_snapshot($params['cart']);
    if ($cart === null) {
        return playah_auth_bridge_error('playah_invalid_cart', 'Giỏ hàng chưa hợp lệ.', 400);
    }

    update_user_meta((int) $session['user_id'], PLAYAH_AUTH_CART_META_KEY, wp_json_encode($cart));
    playah_auth_bridge_touch_session((int) $session['id']);

    return new WP_REST_Response([
        'ok' => true,
        'cart' => $cart,
    ], 200);
}

function playah_auth_bridge_create_order(WP_REST_Request $request)
{
    $session = playah_auth_bridge_get_session_from_request($request);

    if (!$session) {
        return playah_auth_bridge_error('playah_invalid_session', 'Phiên đăng nhập đã hết hạn.', 401);
    }

    if (!function_exists('wc_create_order') || !function_exists('wc_get_product')) {
        return playah_auth_bridge_error('playah_woocommerce_unavailable', 'WooCommerce chưa sẵn sàng để tạo đơn.', 503);
    }

    $params = playah_auth_bridge_json_params($request);
    $payment_method = sanitize_text_field($params['paymentMethod'] ?? '');

    if ($payment_method !== 'cod') {
        return playah_auth_bridge_error('playah_invalid_payment_method', 'Hiện tại chỉ hỗ trợ COD.', 400);
    }

    if (!isset($params['cart']) || !is_array($params['cart']) || !isset($params['checkout']) || !is_array($params['checkout'])) {
        return playah_auth_bridge_error('playah_invalid_order', 'Thông tin đơn hàng chưa hợp lệ.', 400);
    }

    $cart = playah_auth_bridge_sanitize_cart_snapshot($params['cart']);
    $checkout = playah_auth_bridge_sanitize_checkout($params['checkout']);

    if ($cart === null || count($cart['items']) < 1) {
        return playah_auth_bridge_error('playah_empty_cart', 'Giỏ hàng đang trống.', 400);
    }

    if ($checkout === null) {
        return playah_auth_bridge_error('playah_invalid_checkout', 'Thông tin giao hàng chưa hợp lệ.', 400);
    }

    $order_lines = [];
    foreach ($cart['items'] as $item) {
        $product_id_raw = $item['productId'] ?? '';
        $variation_id_raw = $item['variationId'] ?? null;
        $quantity = absint($item['quantity'] ?? 0);

        if (!playah_auth_bridge_is_positive_integer_string($product_id_raw) || ($variation_id_raw !== null && $variation_id_raw !== '' && !playah_auth_bridge_is_positive_integer_string($variation_id_raw))) {
            return playah_auth_bridge_error('playah_invalid_cart_product', 'Sản phẩm trong giỏ hàng không còn hợp lệ. Vui lòng xóa và thêm lại sản phẩm.', 400);
        }

        $product_id = absint($product_id_raw);
        $variation_id = ($variation_id_raw !== null && $variation_id_raw !== '') ? absint($variation_id_raw) : 0;
        $product = $variation_id > 0 ? wc_get_product($variation_id) : wc_get_product($product_id);

        if (!$product || $quantity < 1 || !playah_auth_bridge_product_can_be_ordered($product, $quantity)) {
            return playah_auth_bridge_error('playah_invalid_cart_product', 'Sản phẩm trong giỏ hàng không còn hợp lệ. Vui lòng xóa và thêm lại sản phẩm.', 400);
        }

        if ($variation_id > 0 && (!$product->is_type('variation') || (int) $product->get_parent_id() !== $product_id)) {
            return playah_auth_bridge_error('playah_invalid_cart_product', 'Sản phẩm trong giỏ hàng không còn hợp lệ. Vui lòng xóa và thêm lại sản phẩm.', 400);
        }

        $order_lines[] = ['product' => $product, 'quantity' => $quantity];
    }

    try {
        $order = wc_create_order(['customer_id' => (int) $session['user_id']]);

        if (is_wp_error($order)) {
            return playah_auth_bridge_error($order->get_error_code(), $order->get_error_message(), 400);
        }

        foreach ($order_lines as $line) {
            $line_item_id = $order->add_product($line['product'], $line['quantity']);
            if (!$line_item_id) {
                $order->delete(true);
                return playah_auth_bridge_error('playah_order_line_failed', 'Không thể thêm sản phẩm vào đơn.', 400);
            }
        }

        $order->set_address($checkout['billing'], 'billing');
        $order->set_address($checkout['shipping'], 'shipping');
        $order->set_payment_method('cod');
        $order->set_payment_method_title('Thanh toán khi nhận hàng (COD)');
        $order->set_customer_note($checkout['note']);
        $order->calculate_totals();
        $order->update_status('on-hold', 'PlayAh COD order created from storefront checkout.', true);
        $order->save();

        update_user_meta((int) $session['user_id'], PLAYAH_AUTH_CART_META_KEY, wp_json_encode(playah_auth_bridge_empty_cart_snapshot()));
        playah_auth_bridge_touch_session((int) $session['id']);

        return new WP_REST_Response([
            'ok' => true,
            'message' => 'Đã tạo đơn hàng.',
            'orderId' => (int) $order->get_id(),
            'orderNumber' => (string) $order->get_order_number(),
        ], 201);
    } catch (Throwable $error) {
        return playah_auth_bridge_error('playah_order_create_failed', 'Không thể tạo đơn WooCommerce.', 500);
    }
}

function playah_auth_bridge_is_positive_integer_string($value): bool
{
    return is_string($value) && preg_match('/^[1-9]\d*$/', $value) === 1;
}

function playah_auth_bridge_product_can_be_ordered($product, int $quantity): bool
{
    if (!$product || !$product->is_purchasable() || !$product->is_in_stock()) {
        return false;
    }

    if ((float) $product->get_price() <= 0) {
        return false;
    }

    if (method_exists($product, 'has_enough_stock') && !$product->has_enough_stock($quantity)) {
        return false;
    }

    return true;
}

function playah_auth_bridge_sanitize_checkout(array $checkout): ?array
{
    $email = sanitize_email($checkout['email'] ?? '');
    $first_name = sanitize_text_field($checkout['firstName'] ?? '');
    $last_name = sanitize_text_field($checkout['lastName'] ?? '');
    $phone = sanitize_text_field($checkout['phone'] ?? '');
    $address_1 = sanitize_text_field($checkout['address'] ?? '');
    $address_2 = sanitize_text_field($checkout['apartment'] ?? '');
    $city = sanitize_text_field($checkout['city'] ?? '');
    $state = sanitize_text_field($checkout['state'] ?? '');
    $postcode = sanitize_text_field($checkout['zip'] ?? '');
    $country = playah_auth_bridge_country_code(sanitize_text_field($checkout['country'] ?? 'VN'));

    if (!is_email($email) || $first_name === '' || $last_name === '' || $phone === '' || $address_1 === '' || $city === '' || $state === '' || $country === '') {
        return null;
    }

    $address = [
        'first_name' => $first_name,
        'last_name' => $last_name,
        'company' => sanitize_text_field($checkout['company'] ?? ''),
        'email' => $email,
        'phone' => $phone,
        'address_1' => $address_1,
        'address_2' => $address_2,
        'city' => $city,
        'state' => $state,
        'postcode' => $postcode,
        'country' => $country,
    ];

    return [
        'billing' => $address,
        'shipping' => array_diff_key($address, ['email' => true, 'phone' => true]),
        'note' => $address_2 ? 'Ghi chú giao hàng: ' . $address_2 : '',
    ];
}

function playah_auth_bridge_country_code(string $country): string
{
    $normalized = strtolower(remove_accents(trim($country)));

    if ($normalized === 'viet nam' || strtoupper($country) === 'VN') {
        return 'VN';
    }

    if ($normalized === 'hoa ky' || $normalized === 'united states' || strtoupper($country) === 'US') {
        return 'US';
    }

    return preg_match('/^[A-Z]{2}$/', strtoupper($country)) ? strtoupper($country) : 'VN';
}

function playah_auth_bridge_empty_cart_snapshot(): array
{
    return [
        'source' => 'woocommerce-store-api',
        'items' => [],
        'coupons' => [],
        'totals' => playah_auth_bridge_sanitize_cart_totals([], 'VND'),
        'isLoading' => false,
        'updatedAt' => gmdate('c'),
    ];
}

function playah_auth_bridge_read_cart_snapshot(int $user_id): ?array
{
    $saved = get_user_meta($user_id, PLAYAH_AUTH_CART_META_KEY, true);

    if (!$saved) {
        return null;
    }

    if (is_string($saved)) {
        $decoded = json_decode($saved, true);
        return is_array($decoded) ? $decoded : null;
    }

    return is_array($saved) ? $saved : null;
}

function playah_auth_bridge_sanitize_cart_snapshot(array $cart): ?array
{
    if (!isset($cart['items']) || !is_array($cart['items']) || count($cart['items']) > PLAYAH_AUTH_CART_MAX_ITEMS) {
        return null;
    }

    $items = [];
    foreach ($cart['items'] as $item) {
        if (!is_array($item)) {
            return null;
        }

        $sanitized_item = playah_auth_bridge_sanitize_cart_item($item);
        if ($sanitized_item === null) {
            return null;
        }

        $items[] = $sanitized_item;
    }

    $currency = sanitize_text_field($cart['totals']['total']['currency'] ?? $cart['items'][0]['unitPrice']['currency'] ?? 'VND');

    return [
        'source' => sanitize_text_field($cart['source'] ?? 'mock'),
        'cartToken' => isset($cart['cartToken']) ? sanitize_text_field($cart['cartToken']) : null,
        'customerId' => isset($cart['customerId']) ? sanitize_text_field($cart['customerId']) : null,
        'items' => $items,
        'coupons' => playah_auth_bridge_sanitize_cart_coupons($cart['coupons'] ?? [], $currency),
        'totals' => playah_auth_bridge_sanitize_cart_totals($cart['totals'] ?? [], $currency),
        'isLoading' => false,
        'error' => isset($cart['error']) ? sanitize_text_field($cart['error']) : null,
        'updatedAt' => isset($cart['updatedAt']) ? sanitize_text_field($cart['updatedAt']) : gmdate('c'),
    ];
}

function playah_auth_bridge_sanitize_cart_item(array $item): ?array
{
    $key = sanitize_text_field($item['key'] ?? '');
    $product_id = sanitize_text_field($item['productId'] ?? '');
    $name = sanitize_text_field($item['name'] ?? '');
    $quantity = absint($item['quantity'] ?? 0);

    if ($key === '' || $product_id === '' || $name === '' || $quantity < 1) {
        return null;
    }

    $quantity = min($quantity, PLAYAH_AUTH_CART_MAX_ITEMS);
    $unit_price = playah_auth_bridge_sanitize_money($item['unitPrice'] ?? []);
    $line_subtotal = playah_auth_bridge_sanitize_money($item['lineSubtotal'] ?? [], $unit_price['currency']);

    return [
        'key' => $key,
        'productId' => $product_id,
        'variationId' => isset($item['variationId']) ? sanitize_text_field($item['variationId']) : null,
        'sku' => isset($item['sku']) ? sanitize_text_field($item['sku']) : null,
        'name' => $name,
        'variantLabel' => isset($item['variantLabel']) ? sanitize_text_field($item['variantLabel']) : null,
        'quantity' => $quantity,
        'unitPrice' => $unit_price,
        'lineSubtotal' => $line_subtotal,
        'image' => playah_auth_bridge_sanitize_cart_image($item['image'] ?? null),
        'attributes' => playah_auth_bridge_sanitize_cart_attributes($item['attributes'] ?? []),
        'wooCartItemKey' => isset($item['wooCartItemKey']) ? sanitize_text_field($item['wooCartItemKey']) : null,
    ];
}

function playah_auth_bridge_sanitize_money($money, string $fallback_currency = 'VND'): array
{
    $money = is_array($money) ? $money : [];

    return [
        'value' => max(0, (float) ($money['value'] ?? 0)),
        'currency' => sanitize_text_field($money['currency'] ?? $fallback_currency),
    ];
}

function playah_auth_bridge_sanitize_cart_image($image): ?array
{
    if (!is_array($image)) {
        return null;
    }

    return [
        'src' => esc_url_raw($image['src'] ?? ''),
        'alt' => sanitize_text_field($image['alt'] ?? ''),
        'width' => absint($image['width'] ?? 0),
        'height' => absint($image['height'] ?? 0),
    ];
}

function playah_auth_bridge_sanitize_cart_attributes($attributes): array
{
    if (!is_array($attributes)) {
        return [];
    }

    return array_values(array_map(static function ($attribute) {
        $attribute = is_array($attribute) ? $attribute : [];

        return [
            'name' => sanitize_text_field($attribute['name'] ?? ''),
            'value' => sanitize_text_field($attribute['value'] ?? ''),
        ];
    }, array_slice($attributes, 0, 12)));
}

function playah_auth_bridge_sanitize_cart_coupons($coupons, string $currency): array
{
    if (!is_array($coupons)) {
        return [];
    }

    return array_values(array_map(static function ($coupon) use ($currency) {
        $coupon = is_array($coupon) ? $coupon : [];

        return [
            'code' => sanitize_text_field($coupon['code'] ?? ''),
            'label' => sanitize_text_field($coupon['label'] ?? ''),
            'amount' => playah_auth_bridge_sanitize_money($coupon['amount'] ?? [], $currency),
            'source' => sanitize_text_field($coupon['source'] ?? 'mock'),
        ];
    }, array_slice($coupons, 0, 12)));
}

function playah_auth_bridge_sanitize_cart_totals($totals, string $currency): array
{
    $totals = is_array($totals) ? $totals : [];

    return [
        'subtotal' => playah_auth_bridge_sanitize_money($totals['subtotal'] ?? [], $currency),
        'discountTotal' => playah_auth_bridge_sanitize_money($totals['discountTotal'] ?? [], $currency),
        'shippingTotal' => playah_auth_bridge_sanitize_money($totals['shippingTotal'] ?? [], $currency),
        'taxTotal' => playah_auth_bridge_sanitize_money($totals['taxTotal'] ?? [], $currency),
        'total' => playah_auth_bridge_sanitize_money($totals['total'] ?? [], $currency),
    ];
}

function playah_auth_bridge_create_session(int $user_id): string
{
    global $wpdb;

    playah_auth_bridge_cleanup_expired_sessions();

    $token = bin2hex(random_bytes(32));
    $now = current_time('mysql', true);
    $expires = gmdate('Y-m-d H:i:s', time() + PLAYAH_AUTH_SESSION_TTL);

    $wpdb->insert(playah_auth_bridge_table_name(), [
        'token_hash' => playah_auth_bridge_hash_token($token),
        'user_id' => $user_id,
        'expires_at' => $expires,
        'created_at' => $now,
        'last_seen_at' => $now,
        'ip_hash' => playah_auth_bridge_hash_ip(playah_auth_bridge_client_ip()),
        'user_agent' => substr(sanitize_text_field($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 255),
    ], ['%s', '%d', '%s', '%s', '%s', '%s', '%s']);

    return $token;
}

function playah_auth_bridge_get_session_from_request(WP_REST_Request $request): ?array
{
    global $wpdb;

    $token = playah_auth_bridge_bearer_token($request);
    if ($token === '') {
        return null;
    }

    $session = $wpdb->get_row(
        $wpdb->prepare(
            'SELECT * FROM ' . playah_auth_bridge_table_name() . ' WHERE token_hash = %s AND revoked_at IS NULL AND expires_at > %s LIMIT 1',
            playah_auth_bridge_hash_token($token),
            current_time('mysql', true)
        ),
        ARRAY_A
    );

    return is_array($session) ? $session : null;
}

function playah_auth_bridge_touch_session(int $session_id): void
{
    global $wpdb;

    $wpdb->update(playah_auth_bridge_table_name(), ['last_seen_at' => current_time('mysql', true)], ['id' => $session_id], ['%s'], ['%d']);
}

function playah_auth_bridge_revoke_session(int $session_id): void
{
    global $wpdb;

    $wpdb->update(playah_auth_bridge_table_name(), ['revoked_at' => current_time('mysql', true)], ['id' => $session_id], ['%s'], ['%d']);
}

function playah_auth_bridge_cleanup_expired_sessions(): void
{
    global $wpdb;

    $wpdb->query($wpdb->prepare('DELETE FROM ' . playah_auth_bridge_table_name() . ' WHERE expires_at <= %s OR revoked_at IS NOT NULL', current_time('mysql', true)));
}

function playah_auth_bridge_check_rate_limit(string $action, string $email): bool
{
    $key = 'playah_auth_rate_' . md5($action . '|' . strtolower($email) . '|' . playah_auth_bridge_client_ip());
    $count = (int) get_transient($key);

    if ($count >= PLAYAH_AUTH_RATE_LIMIT) {
        return false;
    }

    set_transient($key, $count + 1, PLAYAH_AUTH_RATE_WINDOW);

    return true;
}

function playah_auth_bridge_user_payload($user): array
{
    if (!$user instanceof WP_User) {
        return [];
    }

    return [
        'id' => (int) $user->ID,
        'email' => $user->user_email,
        'firstName' => get_user_meta($user->ID, 'first_name', true) ?: get_user_meta($user->ID, 'billing_first_name', true),
        'lastName' => get_user_meta($user->ID, 'last_name', true) ?: get_user_meta($user->ID, 'billing_last_name', true),
        'phone' => get_user_meta($user->ID, 'billing_phone', true),
    ];
}

function playah_auth_bridge_bearer_token(WP_REST_Request $request): string
{
    $header = $request->get_header('authorization');
    if (!$header && isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $header = sanitize_text_field(wp_unslash($_SERVER['HTTP_AUTHORIZATION']));
    }
    if (!$header && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $header = sanitize_text_field(wp_unslash($_SERVER['REDIRECT_HTTP_AUTHORIZATION']));
    }

    if (is_string($header) && preg_match('/Bearer\s+(.*)$/i', $header, $matches)) {
        return trim($matches[1]);
    }

    return '';
}

function playah_auth_bridge_hash_token(string $token): string
{
    return hash_hmac('sha256', $token, wp_salt('auth'));
}

function playah_auth_bridge_hash_ip(string $ip): string
{
    return $ip === '' ? '' : hash_hmac('sha256', $ip, wp_salt('nonce'));
}

function playah_auth_bridge_client_ip(): string
{
    return sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'] ?? ''));
}

function playah_auth_bridge_table_name(): string
{
    global $wpdb;

    return $wpdb->prefix . 'playah_customer_sessions';
}

function playah_auth_bridge_json_params(WP_REST_Request $request): array
{
    $params = $request->get_json_params();

    return is_array($params) ? $params : [];
}

function playah_auth_bridge_error(string $code, string $message, int $status): WP_Error
{
    return new WP_Error($code, $message, ['status' => $status, 'ok' => false]);
}

function playah_auth_bridge_send_cors_headers(bool $served, WP_HTTP_Response $result, WP_REST_Request $request, WP_REST_Server $server): bool
{
    if (strpos($request->get_route(), '/' . PLAYAH_AUTH_NAMESPACE . '/') !== 0) {
        return $served;
    }

    $origin = get_http_origin();
    $allowed_origin = defined('PLAYAH_STOREFRONT_ORIGIN') ? PLAYAH_STOREFRONT_ORIGIN : '';

    if ($origin && $allowed_origin && $origin === $allowed_origin) {
        header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
        header('Vary: Origin', false);
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
    }

    return $served;
}
