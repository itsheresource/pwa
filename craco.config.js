module.exports = {
  webpack: {
    configure: (config) => {
      if (process.env.NODE_ENV === 'development') return config;
      if (process.env.ANALYZE) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true,
          })
        );
      }

      return config;
    },
  },
};
