const imageShortcode = require("./utils/image");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("public"); // Makes "public/" available in _site/

  eleventyConfig.addFilter("split", (value, separator) => {
    if (typeof value !== "string") {
      return value; // Return the original value if it's not a string
    }
    return value.split(separator);
  });
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  return {
    dir: {
      input: "src", // Root directory
      output: "_site", // Default output folder
    },
  };
};
