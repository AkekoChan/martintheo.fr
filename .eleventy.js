import browserslist from "browserslist";
import esbuild from "esbuild";
import { minify } from "html-minifier-terser";
import { browserslistToTargets, bundle } from "lightningcss";
import path from "path";
import { dir, imagePaths, scriptDirs } from "./config/constants.js";
import {
  encodeURL,
  excludeURLs,
  filteredUrls,
  formatDateFr,
  formatDateMonthAndYear,
  isInteresting,
  limit,
  markdownContent,
  nextPost,
  previousPost,
  random,
  randomIntFromInterval,
  readingTime,
  sortByLikes,
  sortByUrl,
  toAbsoluteImageUrl,
  toAbsoluteUrl,
  toISOString,
} from "./config/filters/index.js";
import markdown from "./config/plugins/markdown.js";
import faviconShortcode from "./config/shortcodes/favicon.js";
import iconShortcode from "./config/shortcodes/icon.js";
import pictureShortcode from "./config/shortcodes/picture.js";
import { slugifyString } from "./config/utils.js";

export default (eleventyConfig) => {
  // Configuration des fichiers statiques
  eleventyConfig.addWatchTarget(imagePaths.input);
  eleventyConfig.addWatchTarget(scriptDirs.input);

  eleventyConfig.addPassthroughCopy(scriptDirs.input);
  eleventyConfig.addPassthroughCopy(path.join(dir.input, dir.assets, "fonts"));
  eleventyConfig.addPassthroughCopy(path.join(imagePaths.input, "icons"));
  eleventyConfig.addPassthroughCopy(path.join(imagePaths.input, "effects"));
  eleventyConfig.addPassthroughCopy(path.join(imagePaths.input, "cv"));

  // Tous les shortcodes
  eleventyConfig.addShortcode("favicon", faviconShortcode);
  eleventyConfig.addShortcode("icon", iconShortcode);
  eleventyConfig.addShortcode("picture", pictureShortcode);

  // Tous les filtres
  eleventyConfig.addFilter("toAbsoluteUrl", toAbsoluteUrl);
  eleventyConfig.addFilter("toAbsoluteImageUrl", toAbsoluteImageUrl);
  eleventyConfig.addFilter("toISOString", toISOString);
  eleventyConfig.addFilter("excludeURLs ", excludeURLs);
  eleventyConfig.addFilter("filteredUrls", filteredUrls);
  eleventyConfig.addFilter("limit", limit);
  eleventyConfig.addFilter("random", random);
  eleventyConfig.addFilter("sortByLikes", sortByLikes);
  eleventyConfig.addFilter("formatDateFr", formatDateFr);
  eleventyConfig.addFilter("randomIntFromInterval", randomIntFromInterval);
  eleventyConfig.addFilter("previousPost", previousPost);
  eleventyConfig.addFilter("nextPost", nextPost);
  eleventyConfig.addFilter("markdown", markdownContent);
  eleventyConfig.addFilter("slugifyString", slugifyString);
  eleventyConfig.addFilter("toJSON", JSON.stringify);
  eleventyConfig.addFilter("fromJSON", JSON.parse);
  eleventyConfig.addFilter("readingTime", readingTime);
  eleventyConfig.addFilter("isInteresting", isInteresting);
  eleventyConfig.addFilter("encodeURL", encodeURL);
  eleventyConfig.addFilter("formatDateMonthAndYear", formatDateMonthAndYear);
  eleventyConfig.addFilter("sortByUrl", sortByUrl);

  // Recognize CSS as a "template language"
  eleventyConfig.addTemplateFormats("css");

  eleventyConfig.setLibrary("md", markdown);

  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      return minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
      });
    }

    return content;
  });

  // Minify JS with esbuild
  eleventyConfig.on("afterBuild", () => {
    return esbuild.build({
      entryPoints: [path.join(scriptDirs.input, "index.js")],
      outdir: scriptDirs.output,
      minify: true,
      minify: process.env.ELEVENTY_ENV === "prod",
      sourcemap: process.env.ELEVENTY_ENV !== "prod",
    });
  });

  // Process CSS with LightningCSS
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (_inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }
      if (
        (parsed.name === "components") |
        (parsed.name === "utils") |
        (parsed.name === "pages")
      ) {
        return;
      }

      let targets = browserslistToTargets(browserslist("> 0.2% and not dead"));

      return async () => {
        let { code } = await bundle({
          filename: inputPath,
          minify: true,
          sourceMap: false,
          targets,
        });
        return code;
      };
    },
  });

  return {
    dir: dir,
    templateFormats: ["md", "html", "liquid"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dataTemplateEngine: "liquid",
  };
};
