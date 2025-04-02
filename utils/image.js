const Image = require("@11ty/eleventy-img");
const path = require("path");

async function imageShortcode(
  src,
  alt,
  widths = [300, 600, 1200],
  format = "jpeg"
) {
  let filePath = path.join("public", src);
  let options = {
    widths: widths,
    formats: [format],
    outputDir: "./_site/images/",
    urlPath: "/images/",
  };

  let metadata = await Image(filePath, options);
  let imageAttributes = {
    alt,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = imageShortcode;
