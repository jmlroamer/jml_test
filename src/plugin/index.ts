import type { App } from "vue";
// echarts
export * from "./echarts";
// dayjs
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
// Vxe-Table
import VxeTable from "./vxeTable";

/**
 * 加载所有的plugin
 * @param app 整个应用的实例
 */

export default function (app: App): void {
  app.use(VxeTable);
}
