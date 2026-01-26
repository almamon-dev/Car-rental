<!DOCTYPE html>
@php
    $settings = \App\Models\Setting::pluck('value', 'key')->toArray();
    $appName = $settings['site_name'] ?? config('app.name', 'Laravel');
    $favicon = \App\Helpers\Helper::generateURL($settings['favicon'] ?? 'favicon.ico') ?? asset('favicon.ico');
    $primaryColor = $settings['primary_color'] ?? '#0a66c2';
    $secondaryColor = $settings['secondary_color'] ?? '#ff6b35';
@endphp
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <title inertia>{{ $appName }}</title>
        <link rel="icon" href="{{ $favicon }}" type="image/x-icon">

        <!-- SEO Meta Tags -->
        <meta name="description" content="{{ $settings['site_description'] ?? '' }}">
        <meta name="keywords" content="{{ $settings['meta_keywords'] ?? '' }}">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="{{ $appName }}">
        <meta property="og:description" content="{{ $settings['site_description'] ?? '' }}">
        <meta property="og:image" content="{{ $settings['site_logo'] ?? '' }}">

        <!-- Google Tag Manager -->
        @if(!empty($settings['google_tag_manager_id']))
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','{{ $settings['google_tag_manager_id'] }}');</script>
        @endif

        <!-- Google Analytics -->
        @if(!empty($settings['google_analytics_id']))
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ $settings['google_analytics_id'] }}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '{{ $settings['google_analytics_id'] }}');
        </script>
        @endif

        <!-- Facebook Pixel -->
        @if(!empty($settings['facebook_pixel_id']))
        <script>
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '{{ $settings['facebook_pixel_id'] }}');
          fbq('track', 'PageView');
        </script>
        <noscript><img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id={{ $settings['facebook_pixel_id'] }}&ev=PageView&noscript=1"
        /></noscript>
        @endif

        <script>
            window.siteName = "{{ $appName }}";
        </script>

        <!-- Dynamic Branding Colors -->
        <style>
            :root {
                --primary-color: {{ $primaryColor }};
                --secondary-color: {{ $secondaryColor }};
            }
        </style>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Bengali:wght@400;500;600;700&family=Tiro+Bangla:ital@0;1&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
