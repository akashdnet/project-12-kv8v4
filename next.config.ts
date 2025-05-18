import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profile pictures
        pathname: "/**", // allow all paths
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**', 
      },
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Adjust this based on your needs
    },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb", // Increase for server actions if needed
    },
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/events",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/dashboard/events",
        permanent: true,
      },
      {
        source: "/",
        destination: "/dashboard/events",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;