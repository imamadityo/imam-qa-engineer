-- Data Integrity Checks
-- Memastikan konsistensi data antar tabel

-- =====================================================
-- REFERENTIAL INTEGRITY
-- =====================================================

-- 1. Order items harus merujuk ke order yang valid
SELECT oi.order_id
FROM order_items oi
LEFT JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_id IS NULL;

-- 2. Order items harus merujuk ke produk yang valid
SELECT oi.product_id
FROM order_items oi
LEFT JOIN products p ON oi.product_id = p.product_id
WHERE p.product_id IS NULL;

-- 3. Checkout harus merujuk ke order yang valid
SELECT ci.order_id
FROM checkout_info ci
LEFT JOIN orders o ON ci.order_id = o.order_id
WHERE o.order_id IS NULL;

-- =====================================================
-- CONSISTENCY CHECKS
-- =====================================================

-- 4. Status order harus valid
SELECT order_id, status
FROM orders
WHERE status NOT IN ('pending', 'processing', 'completed', 'cancelled');

-- 5. Format email valid (basic check)
SELECT user_id, email
FROM users
WHERE email NOT LIKE '%_@_%.__%';

-- 6. Tanggal checkout harus setelah checkin
SELECT order_id, checkin_date, checkout_date
FROM booking_dates
WHERE checkout_date <= checkin_date;

-- =====================================================
-- AGGREGATE VALIDATION
-- =====================================================

-- 7. Total per order harus sama dengan sum items
SELECT
    o.order_id,
    o.item_total,
    SUM(oi.quantity * oi.unit_price) as calculated_total,
    CASE
        WHEN ABS(o.item_total - SUM(oi.quantity * oi.unit_price)) < 0.01 THEN 'PASS'
        ELSE 'FAIL'
    END as validation
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.item_total;

-- 8. Jumlah item di cart badge harus match
SELECT
    c.cart_id,
    c.expected_count,
    COUNT(ci.item_id) as actual_count,
    CASE
        WHEN c.expected_count = COUNT(ci.item_id) THEN 'PASS'
        ELSE 'FAIL'
    END as validation
FROM carts c
LEFT JOIN cart_items ci ON c.cart_id = ci.cart_id
GROUP BY c.cart_id, c.expected_count;