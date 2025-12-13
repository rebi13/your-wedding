import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseDomain =
  supabaseUrl && supabaseUrl.trim().length > 0 ? new URL(supabaseUrl).hostname : null;

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: supabaseDomain
    ? {
        domains: [supabaseDomain],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: supabaseDomain,
            pathname: '/storage/v1/object/public/**',
          },
        ],
      }
    : undefined,
});