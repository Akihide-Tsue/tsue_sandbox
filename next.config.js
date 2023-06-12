const path = require('path');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const { withSentryConfig } = require('@sentry/nextjs');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  sassOptions: {
    prependData: `
    @use '@styles/variables' as *;
    `,
  },
  compress: true,
  webpack(config, options) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    config.optimization.minimize = true;
    config.plugins.push(new CaseSensitivePathsPlugin());
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            //本番環境でconsole.logを非表示
            drop_console: process.env.NEXT_PUBLIC_APP_ENV === 'production',
          },
        },
        extractComments: 'all',
      }),
    ];
    config.externals.push({
      canvas: 'commonjs canvas',
    });
    return config;
  },
};

module.exports = withSentryConfig(moduleExports, {
  dryRun: process.env.VERCEL_ENV !== 'production',
});

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: '/public',
    register: true,
    skipWaiting: true,
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
  },
});
