import type {
  ComponentInternalInstance as ComponentInstance,
  PropType as VuePropType,
} from "vue";

declare global {
  /** vue Instance */
  declare type ComponentInternalInstance = ComponentInstance;

  /**
   * 地图顶部统计
   */
  declare interface List {
    label: string;
    value: string;
    unit?: string;
    color?: string | string[];
  }

  declare type ECOptions = echarts.EChartsCoreOption;
  declare module "*.png";
  declare module "dom-to-image";
}
export {};
