/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        OPEN_AI_KEY: process.env.OPEN_AI_KEY,
        OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY
    }
};

export default nextConfig;
