import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// import IconsResolver from 'unplugin-icons/resolver';

export default (resolve: any) => {
  return AutoImport({
    // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    imports: ["vue", "vue-router", "@vueuse/core", "pinia"],
    eslintrc: {
      enabled: false, //  Default `false`
      filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },
    resolvers: [
      ElementPlusResolver(),
      // IconsResolver({
      //   prefix: 'icon'
      // })
    ],
    vueTemplate: true, // 是否在 vue 模板中自动导入
    dts: resolve(resolve(__dirname, "../../src"), "types", "auto-imports.d.ts"), //  自动导入组件类型声明文件位置，默认根目录; false 关闭自动生成
  });
};
