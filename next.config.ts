import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["pino", "pino-pretty", "thread-stream"],
  reactCompiler: true,
};

export default nextConfig;
