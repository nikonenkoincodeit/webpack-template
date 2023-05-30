const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  //   watch: true,
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Hello world",
      filename: "index.html",
      template: path.resolve(__dirname, "./src/template/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css|s[ca]ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          //"style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.html$/i,
        use: "html-loader",
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.woff2/i,
        type: "asset",
      },
    ],
  },
  devServer: {
    port: 8080,
    static: "./src",
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
};
