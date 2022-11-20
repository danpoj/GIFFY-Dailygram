/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'media0.giphy.com',
      'media1.giphy.com',
      'media2.giphy.com',
      'media3.giphy.com',
      'media4.giphy.com',
      'media5.giphy.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'ssl.pstatic.net',
      'k.kakaocdn.net',
    ],
  },
}

module.exports = nextConfig
