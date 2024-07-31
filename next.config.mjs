/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        ZIQX_APPKEY: process.env.ZIQX_APPKEY
    },
    eslint:{
        ignoreDuringBuilds: true
    }
};

export default nextConfig;
