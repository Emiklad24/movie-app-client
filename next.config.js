const withImages = require("next-images");
module.exports = withImages({
  assetPrefix: "https://image.tmdb.org",
  dynamicAssetPrefix: true,
  webpack(config, options) {
    return config;
  },
});
