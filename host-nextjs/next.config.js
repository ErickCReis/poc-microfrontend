const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { ModuleFederationPlugin } = require("webpack").container;
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const federationConfig = {
  name: "host",
  remotes: {
    cronograma: "cronograma@http://localhost:4000/remote.js",
  },
  filename: "static/chunks/remoteEntry.js",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(new NextFederationPlugin(federationConfig));
      config.plugins.push(new ModuleFederationPlugin(federationConfig));
      config.plugins.push(new FederatedTypesPlugin({ federationConfig }));
    }

    return config;
  },
};

module.exports = nextConfig;
