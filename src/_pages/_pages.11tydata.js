import { toAbsoluteImageUrl } from "../../config/filters/index.js";

export default {
  layout: "default",
  openGraph: {
    image: toAbsoluteImageUrl("src/assets/images/theo_enorme.png", 800),
  },
};
