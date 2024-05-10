const { toAbsoluteImageUrl } = require("../../config/filters/index");

module.exports = {
  layout: "default",
  openGraph: {
    image: toAbsoluteImageUrl("src/assets/images/ayanami.jpg", 400),
  },
};
