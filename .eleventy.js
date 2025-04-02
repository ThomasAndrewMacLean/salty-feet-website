const imageShortcode = require("./utils/image");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("public"); // Makes "public/" available in _site/
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  return {
    dir: {
      input: ".", // Root directory
      output: "_site", // Default output folder
    },
  };
};
