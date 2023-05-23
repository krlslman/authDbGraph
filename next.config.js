const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async headers() {
    return [
      {
        source: '/api/:path*', // Change the source to match your API routes
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
          {
            key: 'ETag',
            value: 'no-cache',
          },
        ],
      },
    ];
  },
};
