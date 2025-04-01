module.exports = function(eleventyConfig) {
     eleventyConfig.addPassthroughCopy("public");  // Makes "public/" available in _site/

    return {
        dir: {
            input: ".",    // Root directory
            output: "_site" // Default output folder
        }
    };
};
