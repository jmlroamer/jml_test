import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
// import { createHtmlPlugin } from "vite-plugin-html";
import createAutoImport from "./auto-import";
import createComponents from "./components";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import createUnoCss from "./unocss";
// import createSvgIconsPlugin from "./svg-icon";
// import viteCompression from "./vite-compression";
import myPlugin from "./my-plugin";
// import { mars3dPlugin } from "vite-plugin-mars3d"
// import { ZipPlugin } from "./zip";
// import zipPack from "vite-plugin-zip-pack";
// import vxetable from "./vxetable";

export default (env: Record<string, string> = {}) => {
  const vitePlusgins: any = [];
  vitePlusgins.push(vue());
  vitePlusgins.push(myPlugin());
  // vitePlusgins.push(viteCompression());
  // vitePlusgins.push(createUnoCss());
  vitePlusgins.push(vueJsx());
  // vitePlusgins.push(createHtmlPlugin({ minify: true, inject: { data: { TITLE: env.VITE_APP_TITLE } } }),);
  vitePlusgins.push(createAutoImport(resolve));
  vitePlusgins.push(createComponents(resolve));
  // vitePlusgins.push(vxetable(resolve));
  // vitePlusgins.push(createSvgIconsPlugin(resolve));
  // vitePlusgins.push(zipPack({
  //   // 输入的文件夹，就是要打包的文件夹
  //   inDir: 'dist',
  //   // 打包好的 zip 文件放到哪个文件夹下
  //   outDir: 'build-zip',
  //   // 打包好的文件名，自行定义，这里我定义了一个 timeStringNow 变量，放置了此时此刻的时间 2024-01-06 这样的
  //   outFileName: `dist-${dayjs().format('YYYY-MM-DD')}.zip`,
  // }));
  // vitePlusgins.push(mars3dPlugin());
  return vitePlusgins;
};
