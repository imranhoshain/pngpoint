import type { NextConfig } from "next";

const domains = [
  process.env.NEXT_PUBLIC_IMAGE_DOMAIN_1,
  process.env.NEXT_PUBLIC_IMAGE_DOMAIN_2,
  process.env.NEXT_PUBLIC_IMAGE_DOMAIN_3,
].filter(Boolean);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: domains.map((host) => ({
      protocol: "https",
      hostname: host!,
    })),
  },
};

export default nextConfig;
