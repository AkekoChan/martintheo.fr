const { imagePaths } = require("../constants");
const path = require("path");
const { removeBaseDirectory, stringifyAttributes } = require("../utils");

const iconShortcode = (props) => {
  const {
    icon,
    className,
    width = 24,
    height = 24,
    fill = "none",
    viewBox = `0 0 ${width} ${height}`,
    strokeWidth = "1.5",
    strokeLinecap = "round",
    strokeLinejoin = "round",
    stroke = "currentColor",
    isDecorative = true,
    role,
    ariaLabel,
  } = props ?? {};

  const attributes = stringifyAttributes({
    class: className,
    width: width,
    height: height,
    viewBox: viewBox,
    fill: fill,
    "stroke-width": strokeWidth,
    "stroke-linecap": strokeLinecap,
    "stroke-linejoin": strokeLinejoin,
    stroke: stroke,
    "aria-hidden": isDecorative ? true : false,
    focusable: isDecorative ? false : true,
    role: role,
    "aria-label": ariaLabel,
  });
  const iconHTML = `<svg ${attributes}>
    <use xlink:href="${path.join(
      removeBaseDirectory(imagePaths.output),
      "icons",
      `mynaui.symbol.svg#mynaui-${icon}`
    )}"></use></svg>`;

  return iconHTML;
};

module.exports = iconShortcode;
