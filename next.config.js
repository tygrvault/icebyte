const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async redirects() {
        return [
            {
                source: "/profile",
                destination: "/auth/profile",
                permanent: true,
            },
            {
                source: "/account",
                destination: "/auth/account",
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'icebyte.tygr.dev',
            },
            {
                protocol: 'https',
                hostname: 'auth.icebyte.tygr.dev',
            },
        ],
    },
};  

module.exports = withContentlayer(nextConfig);
