# SOFTTEX FASHIONS WEAR LIMITED
## cPanel Deployment & GitHub Auto-Deploy Guide
### লোকালহোস্ট ও সিপ্যানেল ডুয়েল-এনভায়রনমেন্ট সেটআপ এবং গিটহাব অটো-ডিপ্লয়মেন্ট গাইড

এই প্রজেক্টটি এমনভাবে সাজানো হয়েছে যেন এটি **লোকালহোস্ট (Localhost/XAMPP/Tailscale)** এবং **সিপ্যানেল (cPanel Shared Hosting)** উভয় প্ল্যাটফর্মেই কোনো ফাইল কনফিগারেশন পরিবর্তন ছাড়াই সম্পূর্ণ স্মুথলি চলে। এছাড়া গিটহাবের মাধ্যমে একটি পুশ করলেই স্বয়ংক্রিয়ভাবে সিপ্যানেল সার্ভার আপডেট হওয়ার জন্য অটো-ডিপ্লয়মেন্ট ওয়েবমডেল সংযুক্ত করা হয়েছে।

---

## ১. ডুয়েল-এনভায়রনমেন্ট আর্কিটেকচার (Localhost + cPanel)

- **সিপ্যানেল ডাইরেক্ট রুট সাপোর্ট:** রুট ডিরেক্টরিতে থাকা `.htaccess` এবং `index.php` ফাইল সার্ভারের সমস্ত রিকোয়েস্টকে স্বয়ংক্রিয়ভাবে এবং নিরাপদে `public/` ডিরেক্টরিতে রিডাইরেক্ট করে।
- **নিরাপত্তা ব্লকিং:** `.env`, `.git`, `app/`, `vendor/`, `storage/` ইত্যাদিতে ব্রাউজার থেকে সরাসরি অ্যাক্সেস অ্যাপাচি লেভেলে ব্লক করা থাকে।
- **নোড বা এনপিএম এর ঝামেলাহীন অ্যাসেট:** ফ্রন্টএন্ডের সমস্ত React 19 এবং CSS অ্যাসেট (`public/build`) আগেই বিল্ড করে গিট ট্র্যাকিংয়ে অন্তর্ভুক্ত করা হয়েছে। ফলে সিপ্যানেল সার্ভারে কোনো `npm` বা `node` রান করার প্রয়োজন নেই।

---

## ২. সিপ্যানেলে প্রাথমিক সেটআপ (Initial Setup)

### ধাপ ১: ফাইল আপলোড বা গিট ক্লোন
- **বিকল্প ক (টার ফাইল):** `softtex-laravel-cpanel.tar.gz` ফাইলটি cPanel **File Manager** দিয়ে `public_html`-এ আপলোড করে **Extract** করুন।
- **বিকল্প খ (Git Version Control):** cPanel-এর **Git™ Version Control** দিয়ে `https://github.com/farukmail01-bit/softtexfashions.git` রিপোজিটরি ক্লোন করুন।

### ধাপ ২: ডাটাবেজ তৈরি ও ইমপোর্ট
1. cPanel থেকে **MySQL Databases**-এ গিয়ে নতুন ডাটাবেজ এবং ইউজার তৈরি করে **ALL PRIVILEGES** দিন।
2. cPanel **phpMyAdmin** ওপেন করে প্রজেক্টের `database/softtex_db_production.sql` ফাইলটি ইমপোর্ট করুন।

### ধাপ ৩: `.env` ফাইল কনফিগারেশন
1. `.env.cpanel.example` কপি করে `.env` তৈরি করুন।
2. ডাটাবেজ ক্রেডেনশিয়াল এবং ওয়েব হুক সিক্রেট সেট করুন:
   ```env
   APP_NAME="SOFTTEX FASHIONS WEAR LIMITED"
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://yourdomain.com

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=yourcpanel_db_name
   DB_USERNAME=yourcpanel_db_user
   DB_PASSWORD=yourcpanel_db_password

   DEPLOY_SECRET=softtex_auto_deploy_key_2026
   DEPLOY_BRANCH=main
   ```

### ধাপ ৪: ফোল্ডার পারমিশন
`storage/` এবং `bootstrap/cache/` ডিরেক্টরির পারমিশন **775** বা **755** নিশ্চিত করুন।

---

## ৩. গিটহাব অটো-ডিপ্লয়মেন্ট ওয়েবমডেল সেটআপ (GitHub Webhook)

যখনই আপনি লোকাল কম্পিউটারে কাজ করে গিটহাবে `git push` করবেন, সাথে সাথে গিটহাব আপনার সিপ্যানেল সার্ভারে ওয়েবমডেলের মাধ্যমে সিগন্যাল পাঠাবে এবং সার্ভার অটোমেটিক আপডেট হয়ে যাবে।

### গিটহাবে ওয়েবমডেল যুক্ত করার ধাপসমূহ:

1. আপনার গিটহাব রিপোজিটরিতে যান:
   `https://github.com/farukmail01-bit/softtexfashions`
2. উপরে **Settings** ট্যাবে ক্লিক করুন।
3. বামদিকের মেন্যু থেকে **Webhooks** সিলেক্ট করুন এবং **Add webhook** বাটনে ক্লিক করুন।
4. নিচের তথ্যগুলো দিয়ে ফর্মটি পূরণ করুন:
   - **Payload URL:**
     `https://yourdomain.com/deploy.php`
     *(অথবা: `https://yourdomain.com/api/deploy-webhook`)*
   - **Content type:**
     `application/json` (অবশ্যই এটি নির্বাচন করবেন)
   - **Secret:**
     `.env` ফাইলে দেওয়া `DEPLOY_SECRET` এর মান (ডিফল্ট: `softtex_auto_deploy_key_2026`)
   - **SSL verification:**
     `Enable SSL verification` (যদি সাইটে SSL সক্রিয় থাকে)
   - **Which events would you like to trigger this webhook?**
     `Just the push event.` নির্বাচন করুন।
   - **Active:**
     চেকবক্সে টিক দিন।
5. **Add webhook** বাটনে ক্লিক করুন।

গিটহাব সাথে সাথে একটি টেস্ট পিং পাঠাবে এবং সবুজ টিক চিহ্ন (HTTP 200 OK) দেখতে পাবেন।

---

## ৪. ওয়েবমডেল যেভাবে স্বয়ংক্রিয় ডিপ্লয় পরিচালনা করে

একটি পুশ পাওয়া মাত্রই সার্ভারে নিচের কাজগুলো স্বয়ংক্রিয়ভাবে ধাপে ধাপে সম্পন্ন হয়:
1. **HMAC-SHA256 সিকিউরিটি ভেরিফিকেশন:** গিটহাবের সিক্রেট কি সঠিক কিনা তা যাচাই করে অননুমোদিত অ্যাক্সেস ব্লক করা হয়।
2. **Git Fetch & Reset:** `git fetch origin main` এবং `git reset --hard origin/main` চালিয়ে নতুন কোড সার্ভারে নামিয়ে নেওয়া হয়।
3. **Database Migration:** নতুন কোনো ডাটাবেজ মাইগ্রেশন থাকলে `php artisan migrate --force` স্বয়ংক্রিয়ভাবে চালানো হয়।
4. **Cache Optimization:** পুরনো ক্যাশ মুছে `php artisan optimize:clear` ও নতুন ক্যাশ তৈরি (`config:cache`, `route:cache`, `view:cache`) করা হয়।
5. **Permission Self-Healing:** `storage` ও `bootstrap/cache` ফোল্ডারের পারমিশন নিজে থেকেই ঠিক করে নেওয়া হয়।
6. **Detailed Audit Log:** প্রতিটি ডিপ্লয়মেন্টের ফলাফল `storage/logs/deploy.log` ফাইলে রেকর্ড করা হয়।

---

## ৫. ডিপ্লয়মেন্ট স্ট্যাটাস ও লগ ব্রাউজার থেকে চেক করার নিয়ম

সিপ্যানেলে লগইন না করেই যেকোনো সময় ব্রাউজার থেকে সর্বশেষ ডিপ্লয়মেন্ট সফল হয়েছে কিনা তা দেখতে পারবেন:

- **ব্রাউজার URL:**
  `https://yourdomain.com/deploy.php?secret=softtex_auto_deploy_key_2026`
  *(অথবা: `https://yourdomain.com/api/deploy-webhook/status?secret=softtex_auto_deploy_key_2026`)*

এতে গিট স্ট্যাটাস, ব্রাঞ্চ ইনফো এবং সর্বশেষ ৫০টি ডিপ্লয়মেন্ট লগের পূর্ণ বিবরণ স্ক্রিনে প্রদর্শিত হবে।

---

## ৬. এডমিন প্যানেল ক্রেডেনশিয়াল (Default Credentials)

- **এডমিন প্যানেল URL:** `https://yourdomain.com/admin`
- **ইমেইল:** `admin@softtexfashions.com`
- **পাসওয়ার্ড:** `softtex2026`
