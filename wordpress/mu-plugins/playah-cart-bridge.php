<?php
/**
 * Plugin Name: PlayAh Cart Bridge MU
 * Description: MU fallback for PlayAh cart/status REST routes.
 * Version: 0.1.0
 * Author: PlayAh
 */

if (!defined('ABSPATH')) {
    exit;
}

const PLAYAH_CART_BRIDGE_MU_NAMESPACE = 'playah/v1';
const PLAYAH_CART_BRIDGE_MU_VERSION = '0.1.0';
const PLAYAH_CART_BRIDGE_MU_META_KEY = 'playah_cart_snapshot';
const PLAYAH_CART_BRIDGE_MU_MAX_ITEMS = 24;

add_action('rest_api_init', 'playah_cart_bridge_mu_register_routes');

function playah_cart_bridge_mu_register_routes(): void
{
    register_rest_route(PLAYAH_CART_BRIDGE_MU_NAMESPACE, '/status', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'playah_cart_bridge_mu_status',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route(PLAYAH_CART_BRIDGE_MU_NAMESPACE, '/cart', [
        [
            'methods' => WP_REST_Server::READABLE,
            'callback' => 'playah_cart_bridge_mu_get_cart',
            'permission_callback' => '__return_true',
        ],
        [
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => 'playah_cart_bridge_mu_put_cart',
            'permission_callback' => '__return_true',
        ],
    ]);
}

function playah_cart_bridge_mu_status(WP_REST_Request $request): WP_REST_Response
{
    return new WP_REST_Response([
        'ok' => true,
        'pluginName' => 'PlayAh Cart Bridge MU',
        'version' => PLAYAH_CART_BRIDGE_MU_VERSION,
        'namespace' => PLAYAH_CART_BRIDGE_MU_NAMESPACE,
        'cartEnabled' => true,
        'implementation' => 'mu-plugin',
    ], 200);
}

function playah_cart_bridge_mu_get_cart(WP_REST_Request $request)
{
    $session = playah_cart_bridge_mu_get_session_from_request($request);

    if (!$session) {
        return playah_cart_bridge_mu_error('playah_invalid_session', 'Phiên đăng nhập đã hết hạn.', 401);
    }

    playah_cart_bridge_mu_touch_session((int) $session['id']);

    return new WP_REST_Response([
        'ok' => true,
        'cart' => playah_cart_bridge_mu_read_cart_snapshot((int) $session['user_id']),
    ], 200);
}

function playah_cart_bridge_mu_put_cart(WP_REST_Request $request)
{
    $session = playah_cart_bridge_mu_get_session_from_request($request);

    if (!$session) {
        return playah_cart_bridge_mu_error('playah_invalid_session', 'Phiên đăng nhập đã hết hạn.', 401);
    }

    $params = $request->get_json_params();
    if (!is_array($params) || !isset($params['cart']) || !is_array($params['cart'])) {
        return playah_cart_bridge_mu_error('playah_invalid_cart', 'Giỏ hàng chưa hợp lệ.', 400);
    }

    $cart = playah_cart_bridge_mu_sanitize_cart_snapshot($params['cart']);
    if ($cart === null) {
        return playah_cart_bridge_mu_error('playah_invalid_cart', 'Giỏ hàng chưa hợp lệ.', 400);
    }

    update_user_meta((int) $session['user_id'], PLAYAH_CART_BRIDGE_MU_META_KEY, wp_json_encode($cart));
    playah_cart_bridge_mu_touch_session((int) $session['id']);

    return new WP_REST_Response([
        'ok' => true,
        'cart' => $cart,
    ], 200);
}

function playah_cart_bridge_mu_get_session_from_request(WP_REST_Request $request): ?array
{
    global $wpdb;

    $token = playah_cart_bridge_mu_bearer_token($request);
    if ($token === '') {
        return null;
    }

    $table = $wpdb->prefix . 'playah_customer_sessions';
    $session = $wpdb->get_row(
        $wpdb->prepare(
            'SELECT * FROM ' . $table . ' WHERE token_hash = %s AND revoked_at IS NULL AND expires_at > %s LIMIT 1',
            hash_hmac('sha256', $token, wp_salt('auth')),
            current_time('mysql', true)
        ),
        ARRAY_A
    );

    return is_array($session) ? $session : null;
}

function playah_cart_bridge_mu_bearer_token(WP_REST_Request $request): string
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

function playah_cart_bridge_mu_touch_session(int $session_id): void
{
    global $wpdb;

    $wpdb->update(
        $wpdb->prefix . 'playah_customer_sessions',
        ['last_seen_at' => current_time('mysql', true)],
        ['id' => $session_id],
        ['%s'],
        ['%d']
    );
}

function playah_cart_bridge_mu_read_cart_snapshot(int $user_id): ?array
{
    $saved = get_user_meta($user_id, PLAYAH_CART_BRIDGE_MU_META_KEY, true);

    if (!$saved) {
        return null;
    }

    if (is_string($saved)) {
        $decoded = json_decode($saved, true);
        return is_array($decoded) ? $decoded : null;
    }

    return is_array($saved) ? $saved : null;
}

function playah_cart_bridge_mu_sanitize_cart_snapshot(array $cart): ?array
{
    if (!isset($cart['items']) || !is_array($cart['items']) || count($cart['items']) > PLAYAH_CART_BRIDGE_MU_MAX_ITEMS) {
        return null;
    }

    $items = [];
    foreach ($cart['items'] as $item) {
        if (!is_array($item)) {
            return null;
        }

        $sanitized_item = playah_cart_bridge_mu_sanitize_cart_item($item);
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
        'coupons' => playah_cart_bridge_mu_sanitize_cart_coupons($cart['coupons'] ?? [], $currency),
        'totals' => playah_cart_bridge_mu_sanitize_cart_totals($cart['totals'] ?? [], $currency),
        'isLoading' => false,
        'error' => isset($cart['error']) ? sanitize_text_field($cart['error']) : null,
        'updatedAt' => isset($cart['updatedAt']) ? sanitize_text_field($cart['updatedAt']) : gmdate('c'),
    ];
}

function playah_cart_bridge_mu_sanitize_cart_item(array $item): ?array
{
    $key = sanitize_text_field($item['key'] ?? '');
    $product_id = sanitize_text_field($item['productId'] ?? '');
    $name = sanitize_text_field($item['name'] ?? '');
    $quantity = absint($item['quantity'] ?? 0);

    if ($key === '' || $product_id === '' || $name === '' || $quantity < 1) {
        return null;
    }

    return [
        'key' => $key,
        'productId' => $product_id,
        'variantId' => isset($item['variantId']) ? sanitize_text_field($item['variantId']) : null,
        'sku' => sanitize_text_field($item['sku'] ?? ''),
        'slug' => sanitize_text_field($item['slug'] ?? ''),
        'name' => $name,
        'category' => sanitize_text_field($item['category'] ?? ''),
        'image' => isset($item['image']) && is_array($item['image']) ? playah_cart_bridge_mu_sanitize_image($item['image']) : null,
        'unitPrice' => playah_cart_bridge_mu_sanitize_money($item['unitPrice'] ?? [], 'VND'),
        'lineTotal' => playah_cart_bridge_mu_sanitize_money($item['lineTotal'] ?? [], 'VND'),
        'quantity' => $quantity,
        'maxQuantity' => isset($item['maxQuantity']) ? absint($item['maxQuantity']) : null,
        'selectedOptions' => playah_cart_bridge_mu_sanitize_options($item['selectedOptions'] ?? []),
        'requiresShipping' => (bool) ($item['requiresShipping'] ?? true),
    ];
}

function playah_cart_bridge_mu_sanitize_image(array $image): array
{
    return [
        'src' => esc_url_raw($image['src'] ?? ''),
        'alt' => sanitize_text_field($image['alt'] ?? ''),
        'width' => absint($image['width'] ?? 0),
        'height' => absint($image['height'] ?? 0),
    ];
}

function playah_cart_bridge_mu_sanitize_money($money, string $fallback_currency): array
{
    $money = is_array($money) ? $money : [];

    return [
        'amount' => (float) ($money['amount'] ?? 0),
        'currency' => sanitize_text_field($money['currency'] ?? $fallback_currency),
    ];
}

function playah_cart_bridge_mu_sanitize_options($options): array
{
    if (!is_array($options)) {
        return [];
    }

    $sanitized = [];
    foreach ($options as $option) {
        if (!is_array($option)) {
            continue;
        }

        $sanitized[] = [
            'name' => sanitize_text_field($option['name'] ?? ''),
            'value' => sanitize_text_field($option['value'] ?? ''),
        ];
    }

    return $sanitized;
}

function playah_cart_bridge_mu_sanitize_cart_coupons($coupons, string $currency): array
{
    if (!is_array($coupons)) {
        return [];
    }

    $sanitized = [];
    foreach ($coupons as $coupon) {
        if (!is_array($coupon)) {
            continue;
        }

        $sanitized[] = [
            'code' => sanitize_text_field($coupon['code'] ?? ''),
            'label' => sanitize_text_field($coupon['label'] ?? ''),
            'amount' => playah_cart_bridge_mu_sanitize_money($coupon['amount'] ?? [], $currency),
        ];
    }

    return $sanitized;
}

function playah_cart_bridge_mu_sanitize_cart_totals($totals, string $currency): array
{
    $totals = is_array($totals) ? $totals : [];

    return [
        'subtotal' => playah_cart_bridge_mu_sanitize_money($totals['subtotal'] ?? [], $currency),
        'discount' => playah_cart_bridge_mu_sanitize_money($totals['discount'] ?? [], $currency),
        'shipping' => playah_cart_bridge_mu_sanitize_money($totals['shipping'] ?? [], $currency),
        'tax' => playah_cart_bridge_mu_sanitize_money($totals['tax'] ?? [], $currency),
        'total' => playah_cart_bridge_mu_sanitize_money($totals['total'] ?? [], $currency),
    ];
}

function playah_cart_bridge_mu_error(string $code, string $message, int $status): WP_Error
{
    return new WP_Error($code, $message, ['status' => $status, 'ok' => false]);
}
