import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.56"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "herfeel.vn",
      },
    ],
  },
};

export default nextConfig;
