# 🛍️ Shopify & WooCommerce HMAC Webhook Verifier & Order Sync

Secure Node.js / Express webhook receiver with cryptographic HMAC-SHA256 signature verification for real-time Shopify and WooCommerce order & inventory synchronization.

## 🔐 Security & Reliability
- **HMAC-SHA256 Verification:** Rejects spoofed or unauthorized webhook payloads using timing-safe comparison.
- **Idempotent Event Handling:** Prevents duplicate order processing on webhook retries.
- **Clean REST Architecture:** Ready for ERP, CRM, or multi-store inventory sync pipelines.
