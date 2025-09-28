/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		mdxRs: true,
	},
	pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
}

const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
})

module.exports = withMDX(nextConfig)
