const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ESBuildPlugin } = require("esbuild-loader");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  resolve: {
    extensions: [".js", ".ts", ".json"],

    fallback: {
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "crypto": false,
        "inspector": false,
        "child_process": false,
        "worker_threads": false,
        //"crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
      }
  },
  devtool: "source-map",
  mode: "production",
  entry: "./src/index.ts",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "tslint-loader",
            options: {
              configFile: path.resolve(__dirname, "./tslint.json"),
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: "esbuild-loader",
        options: {
          target: "es2015",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: "esbuild-loader",
        options: {
          target: "es2015",
          tsconfigRaw: path.resolve(__dirname, "./tsconfig.json"),
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new ESBuildPlugin(), new NodePolyfillPlugin()],
};