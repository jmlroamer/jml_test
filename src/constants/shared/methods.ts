import dayjs from "dayjs";
import type { LineSeriesOption } from "echarts/charts";

export const transfromData = <T extends { tm: string }>(
  data: T[],
  value: number
) => data.map((item) => [item.tm, value]);

/** 创建矩形的信息展示marker */
export function createLineRectMarkPoint(
  num: number,
  backgroundColor: string,
  text: string,
  offset: number | string,
  textColor?: string,
  distance: number[] = [0, 0]
): LineSeriesOption["markPoint"] {
  return {
    label: {
      show: true,
      padding: 8,
      position: "inside",
      color: textColor ?? "#fff",
      formatter: `${text}：${num}m`,
      fontSize: 30,
      backgroundColor,
    },
    symbol: "rect",
    symbolSize: 1,
    data: [{ name: text, yAxis: num, x: offset }],
  };
}

type MarkLineOption = {
  value?: number;
  backgroundColor?: string;
  color: string;
  position?:
    | "start"
    | "middle"
    | "end"
    | "insideStart"
    | "insideStartTop"
    | "insideStartBottom"
    | "insideMiddle"
    | "insideMiddleTop"
    | "insideMiddleBottom"
    | "insideEnd"
    | "insideEndTop"
    | "insideEndBottom";
  offsetX?: number;
  formatter: string;
};

/**
 * 创建MarkLine
 * @param param0
 * @returns
 */
export function createMarkLine({
  value,
  backgroundColor,
  color,
  formatter,
  position = "middle",
  offsetX = 0,
}: MarkLineOption): LineSeriesOption["markLine"] | undefined {
  if (!value) return;
  return {
    symbol: ["none", "none"],
    data: [
      {
        yAxis: value,
        lineStyle: { color, type: [0, 0], width: 2 },
        label: {
          show: true,
          padding: 10,
          backgroundColor: backgroundColor || color,
          formatter,
          color: "#fff",
          position,
          distance: [offsetX, -16],
        },
      },
    ],
  };
}

/** 获取年份 */
export function getYear() {
  const year = Number(dayjs().format("YYYY"));
  const list: Array<{ label: string; disabled?: boolean }> = [];
  for (let i = 1; i < 137; i++) {
    list.push({ label: year - i + "" });
  }
  return list;
}
