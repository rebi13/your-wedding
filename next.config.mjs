import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const SUPABASE_DOMAIN = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname;

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    domains: [SUPABASE_DOMAIN],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: SUPABASE_DOMAIN,
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: SUPABASE_DOMAIN,
        pathname: '/storage/v1/object/public/image/**',
      },
    ],
  },
});
