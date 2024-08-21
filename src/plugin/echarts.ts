import * as echarts from "echarts/core";
import {
  BarChart,
  type BarSeriesOption,
  LineChart,
  type LineSeriesOption,
  PieChart,
  type PieSeriesOption,
} from "echarts/charts";
import {
  TitleComponent,
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  LegendComponent,
  DatasetComponent,
  MarkLineComponent,
  VisualMapComponent,
  // 组件类型的定义后缀都为 ComponentOption
  // 组件类型的定义后缀都为 ComponentOption
  type TitleComponentOption,
  type DataZoomComponentOption,
  type MarkLineComponentOption,
  type GridComponentOption,
  type TooltipComponentOption,
  type LegendComponentOption,
  type DatasetComponentOption,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | TooltipComponentOption
  | DataZoomComponentOption
  | LegendComponentOption
  | PieSeriesOption
  | DatasetComponentOption
  | MarkLineComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  DataZoomComponent,
  LegendComponent,
  TooltipComponent,
  DatasetComponent,
  GridComponent,
  LineChart,
  BarChart,
  PieChart,
  CanvasRenderer,
  MarkLineComponent,
  VisualMapComponent,
]);
