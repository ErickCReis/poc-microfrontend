const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { NativeFederationTypeScriptHost } = require('@module-federation/native-federation-typescript/webpack');


/** @type { ConstructorParameters<typeof ModuleFederationPlugin>[0]} */
const moduleFederationConfig = {
  name: "host",
  remotes: {
    remote: "remote@http://localhost:4000/remote.js",
  },
  filename: "static/chunks/remoteEntry.js",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(new NextFederationPlugin(moduleFederationConfig));
      config.plugins.push(NativeFederationTypeScriptHost({ moduleFederationConfig }));
    }

    return config;
  },
};

module.exports = nextConfig;
