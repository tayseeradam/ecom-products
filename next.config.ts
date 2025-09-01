import { Files } from "lucide-react";
import type { NextConfig } from "next";
import { Domain } from "node:domain";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["files.stripe.com"],
  },
};

export default nextConfig;
