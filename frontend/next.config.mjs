import withNextIntl from 'next-intl/plugin';

const withNextIntlConfig = withNextIntl('./src/i18n/config.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: 'standalone',
  poweredByHeader: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

const plugins = [withNextIntlConfig];

export default plugins.reduce((config, plugin) => plugin(config), nextConfig);
