-- Database Testing - SQL Validation Queries
-- Target: Saucedemo (simulated data structure)

-- =====================================================
-- DATA VALIDATION QUERIES
-- =====================================================

-- 1. Verifikasi tidak ada duplikasi user
SELECT username, COUNT(*) as count
FROM users
GROUP BY username
HAVING COUNT(*) > 1;

-- 2. Verifikasi semua user memiliki password
SELECT username
FROM users
WHERE password IS NULL OR password = '';

-- 3. Verifikasi harga produk tidak negatif
SELECT product_id, product_name, price
FROM products
WHERE price < 0;

-- 4. Verifikasi harga produk dalam range wajar
SELECT product_id, product_name, price
FROM products
WHERE price < 0.01 OR price > 10000;

-- 5. Verifikasi stok produk tidak negatif
SELECT product_id, product_name, stock
FROM products
WHERE stock < 0;

-- 6. Verifikasi order total = item total + tax
SELECT
    order_id,
    item_total,
    tax,
    total,
    (item_total + tax) as calculated_total,
    CASE
        WHEN ABS(total - (item_total + tax)) < 0.01 THEN 'PASS'
        ELSE 'FAIL'
    END as validation
FROM orders;

-- 7. Verifikasi tidak ada order tanpa item
SELECT o.order_id
FROM orders o
LEFT JOIN order_items oi ON o.order_id = oi.order_id
WHERE oi.order_id IS NULL;

-- 8. Verifikasi tidak ada item dengan quantity 0 atau negatif
SELECT order_id, product_id, quantity
FROM order_items
WHERE quantity <= 0;

-- 9. Verifikasi checkout info lengkap
SELECT order_id, first_name, last_name, postal_code
FROM checkout_info
WHERE first_name IS NULL
   OR last_name IS NULL
   OR postal_code IS NULL;

-- 10. Verifikasi tidak ada cart item orphan
SELECT ci.cart_id, ci.product_id
FROM cart_items ci
LEFT JOIN products p ON ci.product_id = p.product_id
WHERE p.product_id IS NULL;