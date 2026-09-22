# Bug Reports - Saucedemo

## Bug Report Summary

| Bug ID | Title | Severity | Status |
|--------|-------|----------|--------|
| BUG-001 | Error message tidak spesifik untuk locked out user | Low | Open |
| BUG-002 | Tidak ada validasi password strength saat login | Low | Open |
| BUG-003 | Cart badge tidak update real-time setelah remove | Medium | Open |
| BUG-004 | Checkout form menerima input angka untuk nama | Low | Open |
| BUG-005 | Tidak ada konfirmasi sebelum menghapus item dari cart | Low | Open |

---

## Detail Bug Reports

### BUG-001: Error Message Tidak Spesifik untuk Locked Out User

| Field | Detail |
|-------|--------|
| **Title** | Error message tidak spesifik untuk locked out user |
| **Severity** | Low |
| **Priority** | Low |
| **Status** | Open |
| **Environment** | Browser: Chrome 120, OS: Windows 11, URL: saucedemo.com |
| **Steps to Reproduce** | 1. Buka saucedemo.com<br>2. Input username: `locked_out_user`<br>3. Input password: `secret_sauce`<br>4. Click Login |
| **Expected Result** | Error message spesifik: "Sorry, this user has been locked out. Please contact support." |
| **Actual Result** | Error message generic: "Epic sadface: Sorry, this user has been locked out." |
| **Attachment** | Screenshot: login-error-locked-out.png |
| **Reported By** | Imam |
| **Date** | 2026-09-22 |

### BUG-002: Tidak Ada Validasi Password Strength

| Field | Detail |
|-------|--------|
| **Title** | Tidak ada validasi password strength saat login |
| **Severity** | Low |
| **Priority** | Low |
| **Status** | Open |
| **Environment** | Browser: Chrome 120, OS: Windows 11, URL: saucedemo.com |
| **Steps to Reproduce** | 1. Buka saucedemo.com<br>2. Input username: `standard_user`<br>3. Input password: `1` (sangat pendek)<br>4. Click Login |
| **Expected Result** | Sistem menampilkan peringatan bahwa password terlalu lemah atau tidak valid |
| **Actual Result** | Sistem tetap memproses login dan menampilkan error generic "username and password do not match" |
| **Attachment** | - |
| **Reported By** | Imam |
| **Date** | 2026-09-22 |

### BUG-003: Cart Badge Tidak Update Real-Time Setelah Remove

| Field | Detail |
|-------|--------|
| **Title** | Cart badge tidak update real-time setelah remove item |
| **Severity** | Medium |
| **Priority** | Medium |
| **Status** | Open |
| **Environment** | Browser: Chrome 120, OS: Windows 11, URL: saucedemo.com |
| **Steps to Reproduce** | 1. Login sebagai `standard_user`<br>2. Tambahkan 3 item ke cart<br>3. Buka halaman Cart<br>4. Remove 1 item<br>5. Kembali ke halaman Products<br>6. Perhatikan badge count pada ikon cart |
| **Expected Result** | Badge count berubah dari 3 menjadi 2 secara real-time |
| **Actual Result** | Badge count masih menampilkan 3, perlu refresh halaman untuk update |
| **Attachment** | Screenshot: cart-badge-issue.png |
| **Reported By** | Imam |
| **Date** | 2026-09-22 |

### BUG-004: Checkout Form Menerima Input Angka untuk Nama

| Field | Detail |
|-------|--------|
| **Title** | Checkout form menerima input angka untuk field nama |
| **Severity** | Low |
| **Priority** | Low |
| **Status** | Open |
| **Environment** | Browser: Chrome 120, OS: Windows 11, URL: saucedemo.com |
| **Steps to Reproduce** | 1. Login sebagai `standard_user`<br>2. Tambahkan item ke cart<br>3. Buka checkout<br>4. Input First Name: `12345`<br>5. Input Last Name: `67890`<br>6. Input Postal Code: `11111`<br>7. Click Continue |
| **Expected Result** | Validasi error: "First Name tidak boleh berisi angka" |
| **Actual Result** | Form menerima input angka dan melanjutkan ke Checkout Overview |
| **Attachment** | Screenshot: checkout-numeric-name.png |
| **Reported By** | Imam |
| **Date** | 2026-09-22 |

### BUG-005: Tidak Ada Konfirmasi Sebelum Menghapus Item dari Cart

| Field | Detail |
|-------|--------|
| **Title** | Tidak ada konfirmasi sebelum menghapus item dari cart |
| **Severity** | Low |
| **Priority** | Low |
| **Status** | Open |
| **Environment** | Browser: Chrome 120, OS: Windows 11, URL: saucedemo.com |
| **Steps to Reproduce** | 1. Login sebagai `standard_user`<br>2. Tambahkan item ke cart<br>3. Buka halaman Cart<br>4. Click "Remove" pada salah satu item |
| **Expected Result** | Muncul dialog konfirmasi: "Are you sure you want to remove this item?" |
| **Actual Result** | Item langsung dihapus tanpa konfirmasi |
| **Attachment** | - |
| **Reported By** | Imam |
| **Date** | 2026-09-22 |

---

## Bug Report Template

```markdown
### BUG-XXX: [Judul Bug]

| Field | Detail |
|-------|--------|
| **Title** | [Judul bug] |
| **Severity** | Critical / High / Medium / Low |
| **Priority** | High / Medium / Low |
| **Status** | Open / In Progress / Closed |
| **Environment** | Browser, OS, URL |
| **Steps to Reproduce** | 1. Step 1<br>2. Step 2<br>3. Step 3 |
| **Expected Result** | [Expected behavior] |
| **Actual Result** | [Actual behavior] |
| **Attachment** | [Screenshot/Video] |
| **Reported By** | [Nama] |
| **Date** | [YYYY-MM-DD] |
```
