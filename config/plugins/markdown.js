import markdownIt from "markdown-it";

const markdown = markdownIt({
  html: true,
  breaks: false,
  linkify: true,
});

export default markdown;
