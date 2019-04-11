<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        @if ($meta['title'])

            <title>{{ $meta['title'] }}</title>
            <meta property="og:title" content="{{ $meta['title'] }}">
            <meta property="twitter:title" content="{{ $meta['title'] }}">

        @else

            <title>Studio Bianco</title>
            <meta property="og:title" content="Studio Bianco">
            <meta property="twitter:title" content="Studio Bianco">

        @endif

        <meta name="description" content="{{ $meta['description'] }}" />
        <meta property="og:description" content="{{ $meta['description'] }}">
        <meta property="twitter:description" content="{{ $meta['description'] }}">

        <meta property="og:image" content="{{ $meta['img'] }}">
        <meta property="og:url" content="{{ url()->current() }}">

        <meta property="twitter:image" content="">
        <meta property="twitter:card" content="summary_large_image">

        <link rel="stylesheet" href="{{ mix('css/app.css') }}">

        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-137741602-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-137741602-1');
        </script>
        <script>
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WVTFNGJ');
        </script>
        <!-- Google Tag Manager (noscript) -->
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WVTFNGJ"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->

    </head>
    <body class="bg-dark">
        <div id="app">
            <main-template
                odontoiatria="{{ $odontoiatria }}"
                estetica="{{ $estetica }}"
                comparisons="{{ $comparisons }}"
                seos="{{ $seos }}">
            </main-template>
        </div>
        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
