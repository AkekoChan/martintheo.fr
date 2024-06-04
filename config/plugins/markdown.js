const markdownIt = require("markdown-it");

const markdown = markdownIt({
  html: true,
  breaks: false,
  linkify: true,
});

module.exports = markdown;
