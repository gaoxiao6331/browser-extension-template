module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    [
      "babel-plugin-import",
      {
        libraryName: "@arco-design/web-react",
        libraryDirectory: "es",
        camel2DashComponentName: false,
        style: true,
      },
      "babel-plugin-import-arco",
    ],
    [
      "babel-plugin-import",
      {
        libraryName: "@arco-design/web-react/icon",
        libraryDirectory: "react-icon",
        camel2DashComponentName: false,
      },
      "babel-plugin-import-arco-icon",
    ],
  ],
};
