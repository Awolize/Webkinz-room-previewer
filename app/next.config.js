/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["vercel.app"],
    },

    experimental: {
        outputStandalone: true,
    },

    resolve: {
        fallback: {
            "react/jsx-runtime": "react/jsx-runtime.js",
            "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
        },
    },
};

module.exports = nextConfig;
