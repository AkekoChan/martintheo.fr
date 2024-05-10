const Image = require("@11ty/eleventy-img");
const { stringifyAttributes } = require("../utils");
const { imagePaths } = require("../constants");
const { removeBaseDirectory } = require("../utils");

const pictureShortcode = async (props) => {
  const {
    src,
    alt,
    className,
    imgClassName,
    widths = [400, 800],
    formats = ["webp", "jpeg"],
    sizes = "100vw",
    isLazy = true,
  } = props ?? {};

  const imageOptions = {
    widths: [null, ...widths],
    formats: [null, ...formats],
    outputDir: imagePaths.output,
    urlPath: removeBaseDirectory(imagePaths.output),
  };

  const imageMetadata = await Image(src, imageOptions);

  const getLargestImage = (format) => {
    const images = imageMetadata[format];
    return images[images.length - 1];
  };

  const sourceHtmlString = Object.values(imageMetadata)
    .map((images) => {
      const { sourceType } = images[0];

      const sourceAttributes = stringifyAttributes({
        type: sourceType,
        srcset: images.map((image) => image.srcset).join(", "),
        sizes,
      });

      return `<source ${sourceAttributes}>`;
    })
    .join("\n");

  const largestUnoptimizedImg = getLargestImage(formats[0]);
  const imgAttributes = stringifyAttributes({
    src: largestUnoptimizedImg.url,
    width: largestUnoptimizedImg.width,
    height: largestUnoptimizedImg.height,
    alt,
    class: imgClassName,
    loading: isLazy ? "lazy" : undefined,
    decoding: "async",
  });
  const imgHtmlString = `<img ${imgAttributes}>`;

  const pictureAttributes = stringifyAttributes({
    class: className,
  });

  const picture = `<picture ${pictureAttributes}>
    ${sourceHtmlString}
    ${imgHtmlString}
  </picture>`;

  return `${picture}`;
};

module.exports = pictureShortcode;
