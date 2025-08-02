import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            native: false,
          },
        },
      ],
    })

    return config
  },
}

export default nextConfig
