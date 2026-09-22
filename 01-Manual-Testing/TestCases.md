# Test Cases - Saucedemo Checkout Flow

## Test Case Summary

| ID | Feature | Test Case | Priority | Status |
|----|---------|-----------|----------|--------|
| TC-001 | Login | Login dengan valid credentials | High | Pass |
| TC-002 | Login | Login dengan invalid password | High | Pass |
| TC-003 | Login | Login dengan empty username | High | Pass |
| TC-004 | Login | Login dengan empty password | High | Pass |
| TC-005 | Login | Login dengan locked_out_user | High | Pass |
| TC-006 | Products | Verifikasi product list tampil | Medium | Pass |
| TC-007 | Products | Sort produk A to Z | Medium | Pass |
| TC-008 | Products | Sort produk Z to A | Medium | Pass |
| TC-009 | Products | Sort produk Price Low to High | Medium | Pass |
| TC-010 | Products | Sort produk Price High to Low | Medium | Pass |
| TC-011 | Cart | Add single item ke cart | High | Pass |
| TC-012 | Cart | Add multiple items ke cart | High | Pass |
| TC-013 | Cart | Remove item dari cart | High | Pass |
| TC-014 | Cart | Verifikasi cart badge count | Medium | Pass |
| TC-015 | Checkout | Checkout dengan valid data | High | Pass |
| TC-016 | Checkout | Checkout dengan empty first name | High | Pass |
| TC-017 | Checkout | Checkout dengan empty last name | High | Pass |
| TC-018 | Checkout | Checkout dengan empty postal code | High | Pass |
| TC-019 | Checkout | Verifikasi total harga termasuk tax | High | Pass |
| TC-020 | Checkout | Complete order - finish | High | Pass |

---

## Detail Test Cases

### TC-001: Login dengan Valid Credentials
| Item | Detail |
|------|--------|
| **Precondition** | User berada di halaman login |
| **Test Data** | Username: `standard_user`, Password: `secret_sauce` |
| **Steps** | 1. Buka https://www.saucedemo.com<br>2. Input username<br>3. Input password<br>4. Click Login button |
| **Expected Result** | User diarahkan ke halaman Products (inventory) |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-002: Login dengan Invalid Password
| Item | Detail |
|------|--------|
| **Precondition** | User berada di halaman login |
| **Test Data** | Username: `standard_user`, Password: `wrong_password` |
| **Steps** | 1. Buka https://www.saucedemo.com<br>2. Input username<br>3. Input password salah<br>4. Click Login button |
| **Expected Result** | Error message: "Username and password do not match any user in this service" |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-003: Login dengan Empty Username
| Item | Detail |
|------|--------|
| **Precondition** | User berada di halaman login |
| **Test Data** | Username: (kosong), Password: `secret_sauce` |
| **Steps** | 1. Buka https://www.saucedemo.com<br>2. Kosongkan username<br>3. Input password<br>4. Click Login button |
| **Expected Result** | Error message: "Username is required" |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-004: Login dengan Empty Password
| Item | Detail |
|------|--------|
| **Precondition** | User berada di halaman login |
| **Test Data** | Username: `standard_user`, Password: (kosong) |
| **Steps** | 1. Buka https://www.saucedemo.com<br>2. Input username<br>3. Kosongkan password<br>4. Click Login button |
| **Expected Result** | Error message: "Password is required" |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-005: Login dengan Locked Out User
| Item | Detail |
|------|--------|
| **Precondition** | User berada di halaman login |
| **Test Data** | Username: `locked_out_user`, Password: `secret_sauce` |
| **Steps** | 1. Buka https://www.saucedemo.com<br>2. Input username<br>3. Input password<br>4. Click Login button |
| **Expected Result** | Error message: "Sorry, this user has been locked out." |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-006: Verifikasi Product List Tampil
| Item | Detail |
|------|--------|
| **Precondition** | User berhasil login |
| **Steps** | 1. Login sebagai standard_user<br>2. Verifikasi halaman Products tampil<br>3. Verifikasi ada product items |
| **Expected Result** | Halaman Products menampilkan daftar produk dengan nama, harga, dan gambar |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-007: Sort Produk A to Z
| Item | Detail |
|------|--------|
| **Precondition** | User berada di halaman Products |
| **Steps** | 1. Click dropdown sort<br>2. Select "Name (A to Z)"<br>3. Verifikasi urutan produk |
| **Expected Result** | Produk diurutkan berdasarkan nama dari A ke Z |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-008: Sort Produk Z to A
| Item | Detail |
|------|--------|
| **Precondition** | User berada di halaman Products |
| **Steps** | 1. Click dropdown sort<br>2. Select "Name (Z to A)"<br>3. Verifikasi urutan produk |
| **Expected Result** | Produk diurutkan berdasarkan nama dari Z ke A |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-009: Sort Produk Price Low to High
| Item | Detail |
|------|--------|
| **Precondition** | User berada di halaman Products |
| **Steps** | 1. Click dropdown sort<br>2. Select "Price (low to high)"<br>3. Verifikasi urutan harga |
| **Expected Result** | Produk diurutkan berdasarkan harga dari rendah ke tinggi |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-010: Sort Produk Price High to Low
| Item | Detail |
|------|--------|
| **Precondition** | User berada di halaman Products |
| **Steps** | 1. Click dropdown sort<br>2. Select "Price (high to low)"<br>3. Verifikasi urutan harga |
| **Expected Result** | Produk diurutkan berdasarkan harga dari tinggi ke rendah |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-011: Add Single Item ke Cart
| Item | Detail |
|------|--------|
| **Precondition** | User berada di halaman Products |
| **Steps** | 1. Click "Add to cart" pada produk pertama<br>2. Click ikon cart<br>3. Verifikasi produk ada di cart |
| **Expected Result** | Produk muncul di halaman Cart dengan nama dan harga yang benar |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-012: Add Multiple Items ke Cart
| Item | Detail |
|------|--------|
| **Precondition** | User berada di halaman Products |
| **Steps** | 1. Click "Add to cart" pada 3 produk<br>2. Click ikon cart<br>3. Verifikasi semua produk ada di cart |
| **Expected Result** | Semua 3 produk muncul di halaman Cart |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-013: Remove Item dari Cart
| Item | Detail |
|------|--------|
| **Precondition** | User memiliki item di cart |
| **Steps** | 1. Tambahkan item ke cart<br>2. Buka halaman Cart<br>3. Click "Remove"<br>4. Verifikasi item hilang dari cart |
| **Expected Result** | Item berhasil dihapus dari cart |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-014: Verifikasi Cart Badge Count
| Item | Detail |
|------|--------|
| **Precondition** | User berada di halaman Products |
| **Steps** | 1. Tambahkan 2 item ke cart<br>2. Verifikasi badge count pada ikon cart |
| **Expected Result** | Badge menampilkan angka 2 |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-015: Checkout dengan Valid Data
| Item | Detail |
|------|--------|
| **Precondition** | User memiliki item di cart |
| **Test Data** | First Name: `John`, Last Name: `Doe`, Postal Code: `12345` |
| **Steps** | 1. Buka halaman Cart<br>2. Click "Checkout"<br>3. Input data diri<br>4. Click "Continue"<br>5. Verifikasi halaman Checkout Overview |
| **Expected Result** | User diarahkan ke halaman Checkout Overview dengan detail pesanan |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-016: Checkout dengan Empty First Name
| Item | Detail |
|------|--------|
| **Precondition** | User memiliki item di cart |
| **Test Data** | First Name: (kosong), Last Name: `Doe`, Postal Code: `12345` |
| **Steps** | 1. Buka halaman Cart<br>2. Click "Checkout"<br>3. Kosongkan First Name<br>4. Click "Continue" |
| **Expected Result** | Error message: "First Name is required" |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-017: Checkout dengan Empty Last Name
| Item | Detail |
|------|--------|
| **Precondition** | User memiliki item di cart |
| **Test Data** | First Name: `John`, Last Name: (kosong), Postal Code: `12345` |
| **Steps** | 1. Buka halaman Cart<br>2. Click "Checkout"<br>3. Kosongkan Last Name<br>4. Click "Continue" |
| **Expected Result** | Error message: "Last Name is required" |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-018: Checkout dengan Empty Postal Code
| Item | Detail |
|------|--------|
| **Precondition** | User memiliki item di cart |
| **Test Data** | First Name: `John`, Last Name: `Doe`, Postal Code: (kosong) |
| **Steps** | 1. Buka halaman Cart<br>2. Click "Checkout"<br>3. Kosongkan Postal Code<br>4. Click "Continue" |
| **Expected Result** | Error message: "Postal Code is required" |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-019: Verifikasi Total Harga Termasuk Tax
| Item | Detail |
|------|--------|
| **Precondition** | User berada di halaman Checkout Overview |
| **Steps** | 1. Tambahkan item ke cart<br>2. Lakukan checkout<br>3. Verifikasi Item Total dan Tax<br>4. Verifikasi Total = Item Total + Tax |
| **Expected Result** | Total harga = Subtotal + Tax (8%) |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |

### TC-020: Complete Order - Finish
| Item | Detail |
|------|--------|
| **Precondition** | User berada di halaman Checkout Overview |
| **Steps** | 1. Click "Finish" button<br>2. Verifikasi halaman "Thank you for your order"<br>3. Verifikasi pesan konfirmasi |
| **Expected Result** | Halaman "Thank you for your order" dengan pesan "Your order has been dispatched" |
| **Actual Result** | Pass |
| **Status** | ✅ Pass |
