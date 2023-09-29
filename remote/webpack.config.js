const HtmlWebPackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const {
  NativeFederationTypeScriptRemote,
} = require("@module-federation/native-federation-typescript/webpack");

const deps = require("./package.json").dependencies;

/** @type { ConstructorParameters<typeof ModuleFederationPlugin>[0]} */
const moduleFederationConfig = {
  name: "remote",
  filename: "remote.js",
  exposes: {
    "./Title": "./src/components/Title",
    "./AppRouter": "./src/components/AppRouter",
    "./mount": "./src/utils/mount",
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

/**
 * @returns { import('webpack').Configuration }
 */
const config = (_, argv) => ({
  output: {
    publicPath:
      argv.mode === "production"
        ? "https://poc-microfrontend.vercel.app/"
        : "http://localhost:4000/",
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
    new ModuleFederationPlugin(moduleFederationConfig),
    NativeFederationTypeScriptRemote({ moduleFederationConfig }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});

module.exports = config;
