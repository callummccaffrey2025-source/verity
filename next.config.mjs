import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const config = {
  compress: true,
  poweredByHeader: false,
};

export default withBundleAnalyzer(config);
