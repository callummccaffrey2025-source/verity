import withBundleAnalyzer from '@next/bundle-analyzer';
const withBA = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

export default withBA({typescript: { ignoreBuildErrors: true },
  // eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  experimental: { optimizePackageImports: ['lucide-react'] },

  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "font-src 'self' data:",
      "frame-ancestors 'none'"
    ].join('; ');
    return [{
      source: "/(.*)",
      headers: [
        { key: "Content-Security-Policy", value: csp },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Strict-Transport-Security", value: "max-age=15552000; includeSubDomains; preload" }
      ],
    }];
  },
});
