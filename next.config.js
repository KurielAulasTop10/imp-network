/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.notion.so",
			},
			{
				protocol: "https",
				hostname: "s3-us-west-2.amazonaws.com",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
		formats: ["image/webp"],
	},
};

module.exports = nextConfig;
