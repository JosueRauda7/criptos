const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const rulesForCSS = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
};

const rulesForJS = {
  test: /\.js$/,
  loader: "babel-loader",
  options: {
    presets: [
      [
        "@babel/preset-react",
        {
          runtime: "automatic", // 'classic'
        },
      ],
    ],
  },
};

const rules = [rulesForJS, rulesForCSS];

module.exports = (env, argv) => {
  const { mode } = argv;
  const isProduction = mode === "production";

  return {
    // entry: './src/index.js'
    watch: true,
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "main.js",
      path: path.resolve(__dirname, "build"),
    },
    plugins: [new HtmlWebpackPlugin({ template: "src/index.html" })],
    module: {
      rules,
    },
    devServer: {
      open: true, // abrir navegador
      port: 3000,
      // overlay: true, //abrir con los errores
      hot: true,
      compress: true,
      liveReload: true,
    },
    devtool: "source-map",
  };
};
