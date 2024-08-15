/** @type {import('next').NextConfig} */
// troubleshoot avatar image not loading
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'referrer-policy', value: 'no-referrer' }
                ]
            }
        ]
    }
}

module.exports = nextConfig
