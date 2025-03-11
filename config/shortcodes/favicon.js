import Image from "@11ty/eleventy-img";
import path from "path";
import { imagePaths } from "../constants.js";
import { removeBaseDirectory, stringifyAttributes } from "../utils.js";

let cache = {};

const faviconShortcode = async (src) => {
  const props = {
    widths: [16, 32, 57, 76, 96, 128, 180, 192, 228, 512],
    formats: ["png"],
    outputDir: path.join(imagePaths.output, "favicons"),
    urlPath: path.join(removeBaseDirectory(imagePaths.output), "favicons"),
    filenameFormat: (_hash, _src, width, format) => {
      return `favicon-${width}.${format}`;
    },
  };

  const metadata = await Image(src, props);
  const faviconHTML = metadata["png"]
    .map((img) => {
      const isAppleTouchIcon = img.width === 180;
      const attributes = stringifyAttributes({
        href: img.url,
        rel: isAppleTouchIcon ? "apple-touch-icon" : "icon",
        ...(isAppleTouchIcon ? {} : { sizes: `${img.width}x${img.height}` }),
      });
      return `<link ${attributes}>`;
    })
    .join("\n");

  cache[src] = faviconHTML;

  return cache[src];
};
export default faviconShortcode;
