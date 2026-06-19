export type WooCommercePrices = {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: {
    min_amount: string;
    max_amount: string;
  } | null;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
};

export type WooCommerceTaxonomy = {
  id: number;
  name: string;
  slug: string;
  link: string;
};

export type WooCommerceStockAvailability = {
  text: string;
  class: string;
};

export type WooCommerceDimensions = {
  length: string;
  width: string;
  height: string;
};

export type WooCommerceAddToCart = {
  text: string;
  description: string;
  url: string;
  single_text: string;
  minimum: number;
  maximum: number;
  multiple_of: number;
};

export type WooCommerceLink = {
  href: string;
  embeddable?: boolean;
  targetHints?: {
    allow: string[];
  };
};

export type WooCommerceLinks = {
  self: WooCommerceLink[];
  collection: WooCommerceLink[];
  related: WooCommerceLink[];
};

export type WooCommerceImage = Record<string, unknown>;

export type WooCommerceAttribute = Record<string, unknown>;

export type WooCommerceProductResponse = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  type: string;
  variation: string;
  permalink: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: WooCommercePrices;
  price_html: string;
  average_rating: string;
  review_count: number;
  images: WooCommerceImage[];
  categories: WooCommerceTaxonomy[];
  tags: WooCommerceTaxonomy[];
  brands: WooCommerceTaxonomy[];
  attributes: WooCommerceAttribute[];
  variations: number[];
  grouped_products: number[];
  has_options: boolean;
  is_purchasable: boolean;
  is_in_stock: boolean;
  is_on_backorder: boolean;
  low_stock_remaining: number | null;
  stock_availability: WooCommerceStockAvailability | null;
  sold_individually: boolean;
  weight: string;
  dimensions: WooCommerceDimensions;
  formatted_weight: string;
  formatted_dimensions: string;
  add_to_cart: WooCommerceAddToCart;
  is_password_protected: boolean;
  extensions: Record<string, unknown>;
  _links: WooCommerceLinks;
};
