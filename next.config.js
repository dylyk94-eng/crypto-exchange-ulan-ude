/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // Убрано для работы API routes на Vercel
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
