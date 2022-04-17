const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    runtimeCaching
  },
  images: {
    domains: [
      "via.placeholder.com",
      "res.cloudinary.com",
      "s3.amazonaws.com",
      "18.141.64.26",
      "185.219.130.12",
      "127.0.0.1",
      "localhost",
      "shopdodia.pt",
      "picsum.photos",
      "pickbazar-sail.test",
      "pickbazarlaravel.s3.ap-southeast-1.amazonaws.com",
      "lojadodia.s3.eu-central-1.amazonaws.com",
      "cdn1.zonesoft.org"
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
