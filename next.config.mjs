import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  webpack(config, { dev }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-router-dom": path.resolve(__dirname, "src/router-dom.jsx"),
      "react-router-dom$": path.resolve(__dirname, "src/router-dom.jsx"),
    };

    if (dev) {
      config.devtool = false;
    }

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/Profile",
        destination: "/profile",
      },
      {
        source: "/bookmarkUsers",
        destination: "/bookMarkUsers",
      },
    ];
  },
};

export default nextConfig;
