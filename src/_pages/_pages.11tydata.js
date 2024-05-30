const { toAbsoluteImageUrl } = require("../../config/filters/index");

module.exports = {
  layout: "default",
  openGraph: {
    image: toAbsoluteImageUrl("src/assets/images/theo_enorme.png", 800),
  },
};
