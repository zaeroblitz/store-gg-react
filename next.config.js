/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "zaerolabs-store-gg.herokuapp.com",
      "zaerolabs-store-gg.herokuapp.com/uploads/",
    ],
  },
};

module.exports = nextConfig;
