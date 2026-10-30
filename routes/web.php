<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\SeoController;

/*
|--------------------------------------------------------------------------
| Web Routes (Softtex Architecture + Automated SEO Engine)
|--------------------------------------------------------------------------
*/

// 1. Core Corporate Pages
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/about/company-profile', [PageController::class, 'companyProfile'])->name('company-profile');
Route::get('/about/vision', [PageController::class, 'vision'])->name('vision');
Route::get('/about/management', [PageController::class, 'management'])->name('management');
Route::redirect('/management', '/about/management', 301);
Route::get('/services', [PageController::class, 'services'])->name('services');
Route::get('/quality', [PageController::class, 'quality'])->name('quality');
Route::get('/compliance', [PageController::class, 'compliance'])->name('compliance');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

// 2. Apparel Catalogue & Client Showcases (Primary: /catalogue/{slug})
Route::get('/catalogue/download/{category}', function ($category) {
    $map = [
        'womens' => 'Softtex_Fashions_Wear_Limited_Womens.pdf',
        'women' => 'Softtex_Fashions_Wear_Limited_Womens.pdf',
        'mens' => 'Softtex_Fashions_Wear_Limited_Mens.pdf',
        'men' => 'Softtex_Fashions_Wear_Limited_Mens.pdf',
        'kids' => 'Softtex_Fashions_Wear_Limited_Kids.pdf',
        'children' => 'Softtex_Fashions_Wear_Limited_Kids.pdf',
    ];

    $cat = strtolower(trim($category));
    if (!isset($map[$cat])) {
        abort(404, 'Catalogue not found');
    }

    $fileName = $map[$cat];
    $filePath = public_path("pdf/{$fileName}");
    if (!file_exists($filePath)) {
        $filePath = base_path("pdf/{$fileName}");
    }

    if (!file_exists($filePath)) {
        abort(404, 'Catalogue PDF file not found on server.');
    }

    return response()->download($filePath, $fileName, [
        'Content-Type' => 'application/pdf',
        'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
    ]);
})->name('catalogue.download');

Route::get('/pdf/{file}', function ($file) {
    $filePath = public_path("pdf/{$file}");
    if (!file_exists($filePath)) {
        $filePath = base_path("pdf/{$file}");
    }
    if (!file_exists($filePath)) {
        abort(404, 'PDF file not found.');
    }
    return response()->file($filePath, [
        'Content-Type' => 'application/pdf',
    ]);
})->where('file', '.*\.pdf$');

Route::redirect('/catalogue/misc', '/catalogue/womens', 301);
Route::get('/catalogue/{slug}', [PageController::class, 'productClient'])->name('product.client');
Route::redirect('/catalogue', '/catalogue/womens', 301);

// Backward Compatibility Routes for /products
Route::get('/products/{slug}', [PageController::class, 'productClient'])->name('products.slug');
Route::redirect('/products', '/catalogue/womens', 301);

// 3. Automated SEO Engine: Dynamic XML Sitemap & Robots.txt
Route::get('/sitemap.xml', [SeoController::class, 'sitemap'])->name('sitemap');
Route::get('/robots.txt', [SeoController::class, 'robots'])->name('robots');

// 4. Legacy .html Aliases & 301 Permanent SEO Redirects
Route::redirect('/index.html', '/', 301);
Route::redirect('/company-profile.html', '/about/company-profile', 301);
Route::redirect('/vision.html', '/about/vision', 301);
Route::redirect('/management.html', '/about/management', 301);
Route::redirect('/services.html', '/services', 301);
Route::redirect('/quality.html', '/quality', 301);
Route::redirect('/compliance.html', '/compliance', 301);
Route::redirect('/contact.html', '/contact', 301);
Route::redirect('/mens.html', '/catalogue/mens', 301);
Route::redirect('/womens.html', '/catalogue/womens', 301);
Route::redirect('/kids.html', '/catalogue/kids', 301);
Route::redirect('/us-polo.html', '/catalogue/us-polo', 301);
Route::redirect('/rich-cotton.html', '/catalogue/rich-cotton', 301);
Route::redirect('/emart.html', '/catalogue/emart', 301);
Route::redirect('/head.html', '/catalogue/head', 301);
Route::redirect('/tesco.html', '/catalogue/tesco', 301);
Route::redirect('/eddiebauer.html', '/catalogue/eddiebauer', 301);
Route::redirect('/forever.html', '/catalogue/forever', 301);
Route::redirect('/skechers.html', '/catalogue/skechers', 301);
Route::redirect('/keithhering.html', '/catalogue/keithhering', 301);

// 5. High-Throughput REST APIs for Interactive React Modules & Leads
Route::prefix('api')->group(function () {
    Route::get('/company-info', [ApiController::class, 'companyInfo']);
    Route::get('/catalog', [ApiController::class, 'catalog']);
    Route::get('/galleries/{slug}', [ApiController::class, 'publicGalleries']);
    Route::get('/rfq/track/{code}', [ApiController::class, 'trackRfq']);
    Route::post('/calculate-cost', [ApiController::class, 'calculateCost']);
    Route::post('/rfq', [ApiController::class, 'submitRfq']);
    Route::post('/contact', [ApiController::class, 'submitContact']);
    Route::get('/blogs', [ApiController::class, 'publicArticles']);
    Route::get('/blogs/{slug}', [ApiController::class, 'publicArticleDetail']);

    // Buyer Sourcing Utilities
    Route::get('/sourcing/swatches', [ApiController::class, 'getSwatches']);
    Route::post('/sourcing/request-swatch', [ApiController::class, 'requestSwatch']);
    Route::get('/sourcing/audits', [ApiController::class, 'getAudits']);
    Route::post('/sourcing/download-audit', [ApiController::class, 'downloadAuditDossier']);
});

// 6. Dynamic Headless CMS Public APIs
Route::prefix('api/cms')->group(function () {
    Route::get('/pages', function () {
        return response()->json(['pages' => \App\Models\Page::where('status', 'published')->get()]);
    });
    Route::get('/pages/{slug}', function ($slug) {
        $page = \App\Models\Page::where('slug', $slug)
            ->where('status', 'published')
            ->first();

        if (!$page) {
            return response()->json(['message' => 'Page not found'], 404);
        }

        return response()->json(['page' => $page]);
    });
    Route::get('/settings', function () {
        return response()->json(['settings' => \App\Models\SiteSetting::publicSettings()]);
    });
});

// 7. Admin CMS Management APIs
Route::prefix('api/admin')->group(function () {
    Route::post('/login', [\App\Http\Controllers\AdminCmsController::class, 'login']);
    Route::get('/check', [\App\Http\Controllers\AdminCmsController::class, 'checkAuth']);
    Route::post('/logout', [\App\Http\Controllers\AdminCmsController::class, 'logout'])->middleware('auth');

    Route::middleware('auth')->group(function () {
        Route::get('/stats', [\App\Http\Controllers\AdminCmsController::class, 'stats']);

        Route::get('/pages', [\App\Http\Controllers\AdminCmsController::class, 'getPages']);
        Route::get('/pages/{id}', [\App\Http\Controllers\AdminCmsController::class, 'getPage']);
        Route::put('/pages/{id}', [\App\Http\Controllers\AdminCmsController::class, 'savePage']);
        Route::post('/pages', [\App\Http\Controllers\AdminCmsController::class, 'createPage']);
        Route::delete('/pages/{id}', [\App\Http\Controllers\AdminCmsController::class, 'deletePage']);
        Route::post('/pages/{id}/toggle-status', [\App\Http\Controllers\AdminCmsController::class, 'togglePageStatus']);

        Route::get('/galleries', [\App\Http\Controllers\AdminCmsController::class, 'getGalleries']);
        Route::post('/galleries', [\App\Http\Controllers\AdminCmsController::class, 'saveGallery']);
        Route::post('/galleries/sync-all', [\App\Http\Controllers\AdminCmsController::class, 'syncCatalogGalleries']);
        Route::delete('/galleries/{id}', [\App\Http\Controllers\AdminCmsController::class, 'deleteGallery']);

        Route::get('/inquiries', [\App\Http\Controllers\AdminCmsController::class, 'getInquiries']);
        Route::get('/inquiries/export', [\App\Http\Controllers\AdminCmsController::class, 'exportInquiriesCsv']);
        Route::post('/inquiries/{id}/status', [\App\Http\Controllers\AdminCmsController::class, 'updateInquiryStatus']);
        Route::post('/inquiries/{id}/stage', [\App\Http\Controllers\AdminCmsController::class, 'updateInquiryStage']);

        // SEO Target Keywords
        Route::get('/keywords', [\App\Http\Controllers\AdminCmsController::class, 'getKeywords']);
        Route::post('/keywords', [\App\Http\Controllers\AdminCmsController::class, 'saveKeyword']);
        Route::delete('/keywords/{id}', [\App\Http\Controllers\AdminCmsController::class, 'deleteKeyword']);

        // AI Blog Generator & Article Manager
        Route::post('/blogs/generate', [\App\Http\Controllers\AdminCmsController::class, 'generateAiBlog']);
        Route::get('/blogs', [\App\Http\Controllers\AdminCmsController::class, 'getArticles']);
        Route::get('/blogs/{id}', [\App\Http\Controllers\AdminCmsController::class, 'getArticle']);
        Route::post('/blogs', [\App\Http\Controllers\AdminCmsController::class, 'saveArticle']);
        Route::delete('/blogs/{id}', [\App\Http\Controllers\AdminCmsController::class, 'deleteArticle']);

        Route::get('/settings', [\App\Http\Controllers\AdminCmsController::class, 'getSettings']);
        Route::post('/settings', [\App\Http\Controllers\AdminCmsController::class, 'saveSettings']);
        Route::post('/settings/test-ai', [\App\Http\Controllers\AdminCmsController::class, 'testAiConnection']);
        Route::post('/settings/fix-storage', [\App\Http\Controllers\AdminCmsController::class, 'fixStorageLink']);
        Route::post('/upload', [\App\Http\Controllers\AdminCmsController::class, 'uploadMedia']);

        // WordPress-like Global Media Library Endpoints
        Route::get('/media', [\App\Http\Controllers\AdminCmsController::class, 'getMedia']);
        Route::post('/media', [\App\Http\Controllers\AdminCmsController::class, 'uploadMedia']);
        Route::post('/media/upload', [\App\Http\Controllers\AdminCmsController::class, 'uploadMedia']);
        Route::put('/media/{id}', [\App\Http\Controllers\AdminCmsController::class, 'updateMedia']);
        Route::delete('/media/{id}', [\App\Http\Controllers\AdminCmsController::class, 'deleteMedia']);
        Route::post('/media/scan', [\App\Http\Controllers\AdminCmsController::class, 'scanExistingMedia']);

        // Security & Database Speed Optimization Endpoints
        Route::get('/security', [\App\Http\Controllers\AdminCmsController::class, 'getSecurityOverview']);
        Route::post('/security/toggle', [\App\Http\Controllers\AdminCmsController::class, 'toggleBruteForceShield']);
        Route::post('/security/settings', [\App\Http\Controllers\AdminCmsController::class, 'saveSecuritySettings']);
        Route::post('/security/block-ip', [\App\Http\Controllers\AdminCmsController::class, 'blockIpManually']);
        Route::post('/security/unblock-ip', [\App\Http\Controllers\AdminCmsController::class, 'unblockIp']);
        Route::post('/security/clear-logs', [\App\Http\Controllers\AdminCmsController::class, 'clearSecurityLogs']);
        Route::post('/security/optimize-tables', [\App\Http\Controllers\AdminCmsController::class, 'optimizeTables']);
        Route::post('/security/run-indexing', [\App\Http\Controllers\AdminCmsController::class, 'runIntelligentIndexing']);
        Route::get('/security/backup-sql', [\App\Http\Controllers\AdminCmsController::class, 'downloadSqlBackup']);
        Route::post('/security/purge-cache', [\App\Http\Controllers\AdminCmsController::class, 'purgeSystemCache']);
    });
});

// Direct cPanel Production Archive Download Route
Route::get('/download-cpanel-archive', function () {
    $path = public_path('softtex-laravel-cpanel.tar.gz');
    if (!file_exists($path)) {
        $path = base_path('softtex-laravel-cpanel.tar.gz');
    }
    if (file_exists($path)) {
        return response()->download($path, 'softtex-laravel-cpanel.tar.gz', [
            'Content-Type' => 'application/gzip',
        ]);
    }
    abort(404, 'cPanel Archive not found.');
})->name('download.cpanel');

// Direct Vendor Dependency Download Routes
Route::get('/download-vendor-zip', function () {
    $path = public_path('vendor.zip');
    if (file_exists($path)) {
        return response()->download($path, 'vendor.zip', [
            'Content-Type' => 'application/zip',
        ]);
    }
    abort(404, 'vendor.zip not found.');
})->name('download.vendor.zip');

Route::get('/download-vendor-tar', function () {
    $path = public_path('vendor.tar.gz');
    if (file_exists($path)) {
        return response()->download($path, 'vendor.tar.gz', [
            'Content-Type' => 'application/gzip',
        ]);
    }
    abort(404, 'vendor.tar.gz not found.');
})->name('download.vendor.tar');


// 8. Public Blog Entry Points
Route::get('/blog', [PageController::class, 'home'])->name('blog');
Route::get('/blog/{slug}', [PageController::class, 'home'])->name('blog.detail');

// 9. Admin Panel SPA Entry Point
Route::get('/admin/{any?}', [PageController::class, 'home'])->where('any', '.*')->name('admin');

// 10. SPA Fallback for public client routes & branded 404
Route::fallback([PageController::class, 'home']);

// 11. Automated Continuous Deployment Webhook (GitHub Auto-Deploy)
Route::post('/api/deploy-webhook', [\App\Http\Controllers\DeploymentWebhookController::class, 'handle'])->name('deploy.webhook');
Route::get('/api/deploy-webhook/status', [\App\Http\Controllers\DeploymentWebhookController::class, 'status'])->name('deploy.webhook.status');

