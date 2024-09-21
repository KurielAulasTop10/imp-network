/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
		formats: ["image/webp"],
	},
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
};

module.exports = nextConfig;
