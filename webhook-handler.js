import crypto from "crypto";

/**
 * Verifies Shopify / WooCommerce Webhook HMAC-SHA256 Signature
 * @param {Buffer} rawBody - Raw request buffer
 * @param {string} hmacHeader - X-Shopify-Hmac-Sha256 or X-WC-Webhook-Signature
 * @param {string} secret - Store webhook secret key
 * @returns {boolean}
 */
export function verifyWebhookSignature(rawBody, hmacHeader, secret) {
  if (!rawBody || !hmacHeader || !secret) return false;

  const generatedHash = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("base64");

  const hashBuffer = Buffer.from(generatedHash, "utf8");
  const headerBuffer = Buffer.from(hmacHeader, "utf8");

  if (hashBuffer.length !== headerBuffer.length) return false;
  return crypto.timingSafeEqual(hashBuffer, headerBuffer);
}

export async function handleOrderCreated(orderPayload) {
  const { id, order_number, total_price, currency, line_items = [] } = orderPayload;

  return {
    status: "synced",
    orderId: id,
    orderNumber: order_number,
    total: `${total_price} ${currency}`,
    itemCount: line_items.length,
    syncedAt: new Date().toISOString(),
  };
}
