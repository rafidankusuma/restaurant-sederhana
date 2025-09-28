import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/api/payment/notifikasi/:patch*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST",
          },
          {
            key: "Access-Control-Allow-Methods",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Lenght, Content-MD5, Content-Type, Date, X-Api-Version",
          }
        ]
      }
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "vlynngn2e3rqkstu.public.blob.vercel-storage.com",
      }
    ]
  }
};

export default nextConfig;
