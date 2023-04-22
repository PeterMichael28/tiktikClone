/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["tse2.mm.bing.net", "lh3.googleusercontent.com"]
  }
}

module.exports = nextConfig
