const Image = require("@11ty/eleventy-img");
const metadata = require("../../src/_data/metadata");
const { imagePaths } = require("../constants");
const { removeBaseDirectory } = require("../utils");
const dayjs = require("dayjs");
require("dayjs/locale/fr");
const markdownIt = require("markdown-it");
const hljs = require("highlight.js");

const md = new markdownIt({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs" tabindex="0"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs" tabindex="0"><code>' +
      md.utils.escapeHtml(str) +
      "</code></pre>"
    );
  },
});

dayjs.locale("fr");

/** Formate une url relative en absolute */
const toAbsoluteUrl = (url) => {
  return new URL(url, metadata.urlEleventy).href;
};

/** Format une url d'image en absolue */
const toAbsoluteImageUrl = async (src, width = null) => {
  const imgOptions = {
    widths: [width],
    formats: [null],
    outputDir: imagePaths.output,
    urlPath: removeBaseDirectory(imagePaths.output),
  };

  const stats = await Image(src, imgOptions);
  return toAbsoluteUrl(Object.values(stats)[0][0].url);
};

const toISOString = (date) => {
  return dayjs(date).toISOString();
};

/**
 * Créer des segments alétoires composés de chiffres et de lettres
 * @returns
 */
const random = () => {
  const segment = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return `${segment()}-${segment()}-${segment()}`;
};

const limit = (arr, limit) => {
  return arr.slice(0, limit);
};

const sortByLikes = (arr) => {
  return arr.sort((a, b) => {
    return b.likes - a.likes;
  });
};

const formatDateFr = (date) => {
  return dayjs(date).format("DD MMMM YYYY");
};

const formatDateMonthAndYear = (date) => {
  return dayjs(date).format("MMMM YYYY");
};

const randomIntFromInterval = (_, min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const previousPost = (arr, currentPost) => {
  arr.some((post, i) => {
    if (post.title == currentPost.title) {
      index = i;
      return true;
    }
  });

  if (index === -1) {
    return undefined;
  }

  const prev = arr[index - 1];
  if (!prev) {
    return undefined;
  }
  return prev;
};

const nextPost = (arr, currentPost) => {
  let index;

  arr.some((post, i) => {
    if (post.title == currentPost.title) {
      index = i;
      return true;
    }
  });

  const next = arr[index + 1];

  if (!next) {
    return undefined;
  }

  return next;
};

const markdownContent = (content) => {
  return md.render(content);
};

const readingTime = (content) => {
  const wordsPerMinute = 200;
  const textLength = content.split(" ").length;

  if (textLength > 0) {
    let value = Math.ceil(textLength / wordsPerMinute);
    return value;
  }
};

// const isInteresting = (arr) => {
//   return arr.filter((post) => {
//     return post.isInteresting === true;
//   });
// };

const encodeURL = (url) => {
  return encodeURIComponent(url);
};

const sortByUrl = (collection) => {
  return collection.slice().sort((a, b) => {
    if (a.url < b.url) return -1;
    if (a.url > b.url) return 1;
    return 0;
  });
};

const filteredUrls = (urls) => {
  return urls.filter((url) => !/\.css|portfolio|blog|tags/.test(url));
};

const excludeURLs = (path) => {
  const excludedTerms = ["css", "portfolio", "blog", "tags"];

  return excludedTerms.some((term) => path.includes(term)) ? null : path;
};

module.exports = {
  toAbsoluteUrl,
  toAbsoluteImageUrl,
  toISOString,
  excludeURLs,
  limit,
  random,
  randomIntFromInterval,
  sortByLikes,
  sortByUrl,
  formatDateFr,
  previousPost,
  nextPost,
  markdownContent,
  readingTime,
  isInteresting,
  encodeURL,
  formatDateMonthAndYear,
  filteredUrls,
};
