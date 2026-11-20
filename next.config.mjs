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
  // The old /admin/* template pages used hard-coded data and are not linked
  // anywhere; send them to the live recruiter screens that use the API.
  async redirects() {
    return [
      { source: "/admin", destination: "/recruiter/dashboard", permanent: false },
      { source: "/admin/managejobs", destination: "/postedjob", permanent: false },
      { source: "/admin/companyprofile", destination: "/companyprofile", permanent: false },
      { source: "/admin/jobpostingForm", destination: "/job-post", permanent: false },
      { source: "/admin/adminchangepass", destination: "/Changepassword", permanent: false },
      { source: "/admin/notification", destination: "/recruiter/dashboard", permanent: false },
    ];
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
