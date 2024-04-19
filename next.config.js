/** @type {import('next').NextConfig} */
const path = require("path");
const NODE_ENV = process.env.NODE_ENV;
const withImages = require('next-images')

module.exports = withImages({
    webpack5: false,
    reactStrictMode: true,
    generateEtags: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")]
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    compiler: {
        removeConsole: NODE_ENV === 'production' ? true : false,
    },
    compress: true,
    poweredByHeader: false,
    devIndicators: {
        buildActivity: false,
    },
    env: {
        APP_ENV: NODE_ENV
    },
    // Adding policies:
    async headers() {
        return [
            {
              source: '/(.*)',
              headers: [
                {
                  key: 'X-Frame-Options',
                  value: 'DENY',
                },
                {
                  key: 'Content-Security-Policy',
                  value:
                    "default-src 'self' 'https://bombaysoftwares.com'; image-src 'https://unsplash.com'; script-src 'self' https://www.google-analytics.com; font-src 'self' 'https://fonts.googleapis.com'",
                },
                {
                  key: 'X-Content-Type-Options',
                  value: 'nosniff',
                },
                // enable if required {
                //   key: 'Permissions-Policy',
                //   value: "camera=(); battery=(self); geolocation=(); microphone=('https://bombaysoftwares.com')",
                // },
                {
                  key: 'Referrer-Policy',
                  value: 'origin-when-cross-origin',
                },
              ],
            },
          ];
    }
});
