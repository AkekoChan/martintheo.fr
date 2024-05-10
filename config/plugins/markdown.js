const markdownIt = require("markdown-it");

const markdown = markdownIt({
  html: true,
  breaks: false,
  linkify: true,
}).disable("code");

module.exports = markdown;
