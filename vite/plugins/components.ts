import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// import IconsResolver from 'unplugin-icons/resolver';

export default (resolve: any) => {
  return Components({
    dirs: ["src/components"],
    extensions: ["vue", "tsx"],
    resolvers: [
      ElementPlusResolver(),
      // IconsResolver({ enabledCollections: ['ep'] }),
      (componentName) => {
        if (componentName.startsWith("L")) {
          return { name: componentName, from: "@/vue-leaflet" };
        }
      },
    ],
    dts: resolve(resolve(__dirname, "../../src"), "types", "components.d.ts"), //  自动导入组件类型声明文件位置，默认根目录; false 关闭自动生成
  });
};
