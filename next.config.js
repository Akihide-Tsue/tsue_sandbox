const path = require('path');

const { withSentryConfig } = require('@sentry/nextjs');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  sassOptions: {
    prependData: `
    @use '@variables' as *;
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
            drop_console: process.env.NEXT_PUBLIC_APP_ENV === 'production',
          },
        },
        extractComments: 'all',
      }),
    ];
    return config;
  },
};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  authToken: process.env.SENTRY_AUTH_TOKEN,
};
if (process.env.NEXT_PUBLIC_APP_ENV === 'production' || process.env.NEXT_PUBLIC_APP_ENV === 'development') {
  module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
} else {
  module.exports = moduleExports;
}
