const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build"),
  },
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    // contentBase: path.resolve(__dirname, "build"),
    compress: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets/**/*"),
          to: path.resolve(__dirname, "build"),
        },
      ],
    }),
  ],
};
