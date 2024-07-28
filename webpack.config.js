const path = require("path");
const { FilesPlugin } = require("./script/files");
const { ReloadPlugin } = require("./script/reload");
const { ManifestPlugin } = require("./script/manifest");
const { WrapperCodePlugin } = require("./script/wrapper");
const HtmlPlugin = require("html-webpack-plugin");
const { getUniqueId, isDev, isGecko } = require("./script/utils/node");
const { DefinePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const folder = isGecko ? "build-gecko" : "build";
const EVENT_TYPE = isDev ? "EVENT_TYPE" : getUniqueId();
const INJECT_FILE = isDev ? "INJECT_FILE" : getUniqueId();

process.env.EVENT_TYPE = EVENT_TYPE;
process.env.INJECT_FILE = INJECT_FILE;
process.env.PLATFORM = process.env.PLATFORM || "chromium";

module.exports = {
  mode: isDev ? "development" : "production",
  context: __dirname,
  entry: {
    popup: "./src/popup/index.tsx",
    content: "./src/content/index.ts",
    worker: "./src/worker/index.ts",
    [INJECT_FILE]: "./src/inject/index.ts",
  },
  plugins: [
    new HtmlPlugin({
      filename: "popup.html",
      template: "./public/popup.html",
      inject: false,
    }),
    new MiniCssExtractPlugin(),
    new FilesPlugin(),
    new ReloadPlugin(),
    new ManifestPlugin(),
    new WrapperCodePlugin(),
    new DefinePlugin({
      "__DEV__": JSON.stringify(isDev),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.PLATFORM": JSON.stringify(process.env.PLATFORM),
      "process.env.EVENT_TYPE": JSON.stringify(process.env.EVENT_TYPE),
      "process.env.INJECT_FILE": JSON.stringify(process.env.INJECT_FILE),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      { test: /\.svg$/, type: "asset/resource" },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "./script/if-def",
            options: {
              debug: isDev,
            },
          },
          "babel-loader",
          "ts-loader",
        ],
      },
    ],
  },
  output: {
    publicPath: "/",
    filename: "[name].js",
    path: path.resolve(__dirname, folder),
  },
  devtool: false,
  stats: {
    errorDetails: true,
  },
};
