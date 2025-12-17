import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required to prevent build failures
  serverExternalPackages: ["pino", "pino-pretty", "thread-stream"],
};

export default nextConfig;
