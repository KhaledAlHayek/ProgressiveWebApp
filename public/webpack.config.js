const path = require("path");

module.exports = {
  mode: "development",
  entry: "/db.js",
  output: {
    path: path.resolve(__dirname, "js"),
    filename: "bundle.js"
  },
  watch: true
}