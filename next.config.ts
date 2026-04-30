import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  async rewrites() {
    return [
      {
        // Для запросов из вложенных папок (например, /en/admin/api/...)
        source: "/:path*/api/:slug*", 
        destination: "http://127.0.0.1:8000/api/:slug*", // Добавили /api
      },
      {
        // Для обычных запросов /api/...
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*", // Добавили /api
      },
    ];
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);