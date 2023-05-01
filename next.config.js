const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    }
};

module.exports = withContentlayer(nextConfig);
