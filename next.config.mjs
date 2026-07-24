/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.playtech.lk",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      }
    ],
  },
};

export default nextConfig;