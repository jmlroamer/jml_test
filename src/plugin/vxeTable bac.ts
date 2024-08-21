import zhCN from "vxe-table/es/locale/lang/zh-CN";
// import { get, toFormatString } from "xe-utils";
import { App, Plugin, h } from "vue";
// import dayjs from "dayjs";

import {
  VXETable,
  VxePager,
  Colgroup,
  Grid,
  Icon,
  Menu,
  Edit,
  Export,
  Validator,
  Column,
  Input,
  Textarea,
  Modal,
  Tooltip,
  Select,
  Optgroup,
  Option,
  Table,
} from "vxe-table";

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
// VXETable.config({
//   i18n: (key: any, args: any) => toFormatString(get(zhCN, key), args),
//   table: {
//     highlightCurrentRow: true,
//     border: "none",
//     // stripe: true,
//     // align: "center",
//     size: "medium",
//     autoResize: true,
//     emptyRender: { name: "NotData" },
//     // showOverflow: "title",
//     rowConfig: {
//       isCurrent: false,
//       isHover: true,
//     },
//   },
//   input: { controls: false },
// });

// 创建一个空内容渲染
VXETable.renderer.add("NotData", {
  // 空内容模板
  renderEmpty() {
    return h(
      "span",
      {
        style: {
          fontSize: "28px",
          color: "#3eacd9",
        },
      },
      "暂无数据"
    );
  },
});

// 创建一个空内容渲染
// VXETable.renderer.add("tm", {
//   // 空内容模板
//   renderDefault(
//     _: { props: { format: any } },
//     params: { row: any; column: any }
//   ) {
//     const strs = _.props && _.props.format ? _.props!.format : "HH:mm";
//     const { row, column } = params;
//     return dayjs(row[column.field]).format(strs);
//   },
// });

const components: Plugin[] = [
  Grid,
  VxePager,
  Icon,
  Menu,
  Colgroup,
  Edit,
  Export,
  Validator,
  Column,
  Input,
  Textarea,
  Modal,
  Tooltip,
  Select,
  Optgroup,
  Option,
  Table,
];

export default function (app: App): void {
  components.forEach(app.use);
}
