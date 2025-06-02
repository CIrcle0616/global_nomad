import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 목업 데이터 이미지를 받기 위해 작성함
  images: {
    domains: ['picsum.photos', 'fastly.picsum.photos'],
  },
};

export default nextConfig;
