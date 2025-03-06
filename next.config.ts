

// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   /* config options here */
// }

// export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "placeholder.com", "via.placeholder.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  // Ignorar advertencias específicas
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig