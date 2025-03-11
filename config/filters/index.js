import Image from "@11ty/eleventy-img";
import dayjs from "dayjs";
import "dayjs/locale/fr.js";
import hljs from "highlight.js";
import markdownIt from "markdown-it";
import metadata from "../../src/_data/metadata.js";
import { imagePaths } from "../constants.js";
import { removeBaseDirectory } from "../utils.js";

export const md = new markdownIt({
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
export const toAbsoluteUrl = (url) => {
  return new URL(url, metadata.urlEleventy).href;
};

/** Format une url d'image en absolue */
export const toAbsoluteImageUrl = async (src, width = null) => {
  const imgOptions = {
    widths: [width],
    formats: [null],
    outputDir: imagePaths.output,
    urlPath: removeBaseDirectory(imagePaths.output),
  };

  const stats = await Image(src, imgOptions);
  return toAbsoluteUrl(Object.values(stats)[0][0].url);
};

export const toISOString = (date) => {
  return dayjs(date).toISOString();
};

/**
 * Créer des segments alétoires composés de chiffres et de lettres
 * @returns
 */
export const random = () => {
  const segment = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return `${segment()}-${segment()}-${segment()}`;
};

export const limit = (arr, limit) => {
  return arr.slice(0, limit);
};

export const sortByLikes = (arr) => {
  return arr.sort((a, b) => {
    return b.likes - a.likes;
  });
};

export const formatDateFr = (date) => {
  return dayjs(date).format("DD MMMM YYYY");
};

export const formatDateMonthAndYear = (date) => {
  return dayjs(date).format("MMMM YYYY");
};

export const randomIntFromInterval = (_, min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const previousPost = (arr, currentPost) => {
  let index;

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

export const nextPost = (arr, currentPost) => {
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

export const markdownContent = (content) => {
  return md.render(content);
};

export const readingTime = (content) => {
  const wordsPerMinute = 200;
  const textLength = content.split(" ").length;

  if (textLength > 0) {
    let value = Math.ceil(textLength / wordsPerMinute);
    return value;
  }
};

export const isInteresting = (arr) => {
  return arr.filter((post) => {
    return post.isInteresting === true;
  });
};

export const encodeURL = (url) => {
  return encodeURIComponent(url);
};

export const sortByUrl = (collection) => {
  return collection.slice().sort((a, b) => {
    if (a.url < b.url) return -1;
    if (a.url > b.url) return 1;
    return 0;
  });
};

export const filteredUrls = (urls) => {
  return urls.filter((url) => !/\.css|portfolio|blog|tags/.test(url));
};

export const excludeURLs = (path) => {
  const excludedTerms = ["css", "portfolio", "blog", "tags"];

  return excludedTerms.some((term) => path.includes(term)) ? null : path;
};
