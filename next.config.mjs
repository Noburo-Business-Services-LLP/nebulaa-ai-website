/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fonts.googleapis.com', 'fonts.gstatic.com'],
    // The media bucket's domain is only known at deploy time (SST generates
    // the bucket name), so it arrives via the same NEXT_PUBLIC_ var the
    // client uses to build URLs — read here so next/image is allowed to
    // optimize CMS-uploaded assets instead of serving them raw.
    remotePatterns: process.env.NEXT_PUBLIC_MEDIA_DOMAIN
      ? [{ protocol: 'https', hostname: process.env.NEXT_PUBLIC_MEDIA_DOMAIN }]
      : [],
  },

  async redirects() {
    return [
      // The Enterprise/MSME split was merged into one Services page — the
      // engagement model is the same, only the scope differs.
      { source: '/services/enterprise', destination: '/services', permanent: true },
      { source: '/services/msme', destination: '/services', permanent: true },
    ]
  },
}

export default nextConfig
