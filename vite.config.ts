import { fileURLToPath, URL } from "node:url";
import path, { resolve } from "path";

import { loadEnv, defineConfig } from "vite";
import type { ConfigEnv, UserConfig } from "vite";
import createPlugins from "./vite/plugins";

const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/element/index.scss" as *;@use "@/styles/bem.scss" as *;@use "@/styles/global.scss" as *;`,
        },
      },
    },
    server: {
      host: "0.0.0.0", //配置项目可以局域网访问
      cors: true, //默认启用并允许任何源
      open: false, // 运行是否自动打开浏览器
      // proxy: {
      //   [env.VITE_APP_BASE_API]: {
      //     target: "https://cir8.com:7460",
      //     changeOrigin: true,
      //   },
      //   [env.VITE_APP_MAP_API]: {
      //     target: "http://cir8.com:9090",
      //     rewrite: (path) => path.replace(env.VITE_APP_MAP_API, ""),
      //   },
      //   [env.VITE_APP_OUT_API]: {
      //     target: "http://10.43.223.61:7460",
      //     rewrite: (path) => path.replace(env.VITE_APP_OUT_API, ""),
      //   },
      // },
    },
    plugins: createPlugins(),
  };
});
