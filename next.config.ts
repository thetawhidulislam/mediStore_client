/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
  async rewrites() {
    // Fallback to your deployed backend URL if the environment variable is missing
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://medi-store-server-seven.vercel.app";
    
    return [
      {
        source: "/api/auth/:path*",
        destination: `${backendUrl}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;