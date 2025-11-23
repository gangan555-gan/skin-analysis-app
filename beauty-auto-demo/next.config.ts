import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // サイトのルート "/" へのアクセスを "/analyze" に恒久的にリダイレクトする
  async redirects() {
    return [
      {
        source: '/',
        destination: '/analyze',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
