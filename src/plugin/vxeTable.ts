import {
  VxeUI,
  VxeButton,
  VxeButtonGroup,
  VxeCheckbox,
  VxeCheckboxGroup,
  VxeForm,
  VxeFormGather,
  VxeFormItem,
  VxeIcon,
  VxeInput,
  VxeList,
  VxeLoading,
  VxeModal,
  VxeOptgroup,
  VxeOption,
  VxePager,
  VxePulldown,
  VxeRadio,
  VxeRadioButton,
  VxeRadioGroup,
  VxeSelect,
  VxeSwitch,
  VxeTextarea,
  VxeTooltip,
} from "vxe-pc-ui";

import {
  VxeTable,
  VxeColumn,
  VxeColgroup,
  VxeGrid,
  VxeToolbar,
} from "vxe-table";

// 导入默认的主题样式文件
import "vxe-pc-ui/lib/style.css";
import "vxe-table/lib/style.css";

// 导入主题变量，也可以重写主题变量
import "vxe-table/styles/cssvar.scss";
import "vxe-pc-ui/styles/cssvar.scss";

// 导入默认的语言
import zhCN from "vxe-pc-ui/lib/language/zh-CN";
import { App } from "vue";

VxeUI.setI18n("zh-CN", zhCN);
VxeUI.setLanguage("zh-CN");

// 可选组件
function lazyVxeUI(app: App) {
  app.use(VxeButton);
  app.use(VxeButtonGroup);
  app.use(VxeCheckbox);
  app.use(VxeCheckboxGroup);
  app.use(VxeForm);
  app.use(VxeFormGather);
  app.use(VxeFormItem);
  app.use(VxeIcon);
  app.use(VxeInput);
  app.use(VxeList);
  app.use(VxeLoading);
  app.use(VxeModal);
  app.use(VxeOptgroup);
  app.use(VxeOption);
  app.use(VxePager);
  app.use(VxePulldown);
  app.use(VxeRadio);
  app.use(VxeRadioButton);
  app.use(VxeRadioGroup);
  app.use(VxeSelect);
  app.use(VxeSwitch);
  app.use(VxeTextarea);
  app.use(VxeTooltip);
}

function lazyVxeTable(app: App) {
  app.use(VxeTable);
  app.use(VxeColumn);
  app.use(VxeColgroup);
  app.use(VxeGrid);
  app.use(VxeToolbar);
}

export default function (app: App): void {
  app.use(lazyVxeUI).use(lazyVxeTable);
  // lazyVxeUI(app);
  // lazyVxeTable(app);
}
