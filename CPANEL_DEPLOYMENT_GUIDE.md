# SOFTTEX FASHIONS WEAR LIMITED
## cPanel Deployment Guide / সিপ্যানেলে আপলোড ও সেটআপ গাইড

এই প্রজেক্টটি cPanel-এ আপলোড করার জন্য সম্পূর্ণ প্রস্তুত করা হয়েছে। নিচে ধাপে ধাপে নির্দেশিকা দেওয়া হলো:

---

### ধাপ ১: ফাইল আপলোড ও আনজিপ (File Upload & Extract)
1. আপনার cPanel-এ লগইন করুন এবং **File Manager**-এ যান।
2. আপনার ডোমেইনের রুট ফোল্ডারে প্রবেশ করুন (সাধারণত `public_html`)।
3. প্রোভাইড করা `.zip` ফাইলটি আপলোড করুন।
4. আপলোড শেষে ফাইলটির ওপর রাইট-ক্লিক করে **Extract** করুন।
*(নোট: ফাইলে রুট `.htaccess` এবং `index.php` অন্তর্ভুক্ত আছে, তাই আলাদা করে ফোল্ডার সাজানোর জটিলতা নেই। সরাসরি `public_html`-এ আনজিপ করলেই ওয়েবসাইট চালু হবে।)*

---

### ধাপ ২: ডাটাবেজ তৈরি ও ইমপোর্ট (Database Setup)
1. cPanel থেকে **MySQL Databases** অথবা **MySQL Database Wizard**-এ যান।
2. নতুন একটি Database তৈরি করুন (যেমন: `username_softtex`).
3. নতুন একটি User তৈরি করুন এবং একটি শক্তিশালী পাসওয়ার্ড সেট করুন।
4. User-কে Database-এর সাথে যুক্ত করে **ALL PRIVILEGES** পারমিশন দিন।
5. cPanel মেন্যু থেকে **phpMyAdmin** ওপেন করুন।
6. আপনার সদ্য তৈরি করা ডাটাবেজটি সিলেক্ট করে **Import** ট্যাবে যান।
7. প্রজেক্টের `database/softtex_db_production.sql` ফাইলটি ব্রাউজ করে **Import / Go** বাটনে ক্লিক করুন।
*(এতে সম্পূর্ণ ৩৪৫টি প্রোডাক্ট স্টাইল, সিএমএস সেটিংস এবং এডমিন ডাটাবেজ ইমপোর্ট হয়ে যাবে।)*

---

### ধাপ ৩: `.env` ফাইল কনফিগারেশন
1. File Manager-এ যদি ডট ফাইল না দেখা যায়, তবে ডানদিকের উপরের **Settings** থেকে **"Show Hidden Files (dotfiles)"** টিক দিয়ে Save করুন।
2. প্রজেক্টের ভেতরে থাকা `.env.cpanel.example` ফাইলটিকে রিনেম করে `.env` করুন (অথবা বিদ্যমান `.env` এডিট করুন)।
3. নিচের লাইনগুলো আপনার cPanel অনুযায়ী আপডেট করুন:
   ```env
   APP_NAME="SOFTTEX FASHIONS WEAR LIMITED"
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://yourdomain.com

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_cpanel_db_name
   DB_USERNAME=your_cpanel_db_user
   DB_PASSWORD=your_cpanel_db_password
   ```

---

### ধাপ ৪: ফোল্ডার পারমিশন (Permissions)
নিচের দুটি ফোল্ডারের পারমিশন নিশ্চিত করুন **775** বা **755**:
- `storage/` (এবং এর ভেতরের সকল সাবফোল্ডার)
- `bootstrap/cache/`

---

### 🔑 এডমিন লগইন ক্রেডেনশিয়াল (Admin Credentials)
- **এডমিন প্যানেল URL:** `https://yourdomain.com/admin`
- **ইমেইল:** `admin@softtexfashions.com`
- **পাসওয়ার্ড:** `softtex2026`

---
প্রজেক্টের সকল ফ্রন্টএন্ড অ্যাসেট (`npm run build`) আগেই কম্পাইল করে `public/build/`-এ অন্তর্ভুক্ত করা হয়েছে। সার্ভারে কোনো `npm` বা `node` কমান্ড রান করার প্রয়োজন নেই।
