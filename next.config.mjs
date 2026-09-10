/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fonts.googleapis.com', 'fonts.gstatic.com'],
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
