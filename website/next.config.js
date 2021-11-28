const { withGuildDocs } = require('@guild-docs/server');
const { i18n } = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { register } = require('esbuild-register/dist/node');
register({ extensions: ['.ts', '.tsx'] });
const { getRoutes } = require('./routes.ts');

module.exports = withBundleAnalyzer(
  withGuildDocs({
    i18n,
    getRoutes,
    webpack(config) {
      config.resolve.fallback = { ...config.resolve.fallback, module: false };
      return config;
    },
  }),
);
