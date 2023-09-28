import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation, {
  type VitePluginFederationOptions,
} from "@originjs/vite-plugin-federation";
import { NativeFederationTypeScriptHost } from "@module-federation/native-federation-typescript/vite";

const moduleFederationConfig: VitePluginFederationOptions = {
  name: "layout",
  filename: "remoteEntry.js",
  remotes: {
    remote: {
      external: "http://localhost:4000/remote.js",
      externalType: "url",
      format: "var",
      from: "webpack",
    },
  },
  shared: ["vue"],
};

export default defineConfig({
  plugins: [
    vue(),
    federation(moduleFederationConfig),
    NativeFederationTypeScriptHost({
      moduleFederationConfig: {
        name: "host",
        remotes: {
          remote: "http://localhost:4000/remote.js",
        },
      },
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        format: "esm",
        entryFileNames: "assets/[name].js",
        minifyInternalExports: false,
      },
    },
  },
});
