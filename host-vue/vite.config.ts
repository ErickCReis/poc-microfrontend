import { NativeFederationTypeScriptHost } from "@module-federation/native-federation-typescript/vite";
import federation, {
  type VitePluginFederationOptions,
} from "@originjs/vite-plugin-federation";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const moduleFederationConfig: VitePluginFederationOptions = {
  name: "host",
  remotes: {
    remote: {
      external: `${process.env.REMOTE_URL}/remote.js`,
      externalType: "url",
      format: "var",
      from: "webpack",
    },
  },
};

export default defineConfig({
  plugins: [
    vue(),
    federation(moduleFederationConfig),
    NativeFederationTypeScriptHost({
      moduleFederationConfig: {
        remotes: {
          remote: `${process.env.REMOTE_URL}/remote.js`,
        },
      },
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: true,
  },
});
