/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'res.cloudinary.com',  // Whitelist Cloudinary domain
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  