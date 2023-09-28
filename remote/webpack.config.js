const HtmlWebPackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const deps = require("./package.json").dependencies;

/** @type { ConstructorParameters<typeof ModuleFederationPlugin>[0]} */
const federationConfig = {
  name: "remote",
  filename: "remote.js",
  exposes: {
    "./Title": "./src/Title",
    "./AppRouter": "./src/AppRouter",
    "./mount": "./src/mount",
  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: false,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: false,
    },
  },
};

/** @type { import('webpack').Configuration } */
const config = {
  output: {
    // publicPath: "https://module-federation-oew.pages.dev/",
    publicPath: "http://localhost:4000/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 4000,
    historyApiFallback: true,
  },

  optimization: {
    minimize: false,
  },

  cache: false,

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin(federationConfig),
    new FederatedTypesPlugin({ federationConfig }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};

module.exports = config;
