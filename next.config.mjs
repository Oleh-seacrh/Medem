/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "new.xraymedem.com"
      }
    ]
  }
};

export default nextConfig;

