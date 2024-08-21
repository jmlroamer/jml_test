import * as echarts from "echarts/core";
import { OMS, calMax, calMin } from "../untils/osm";

export const baseZQ: ECOptions = {
  grid: {
    left: 30,
    right: 40,
    // top: "10%",
    bottom: 50,
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    // formatter: function (params: any) {
    // 	console.log(params);
    // 	let str = params[0]?.data[0];
    // 	for (let i = 0; i < params.length; i++) {
    // 		const item = params[i];
    // 		if (!isNaN(item.value[1])) {
    // 			str += `<br />${item.seriesName} : ${item.value[1]} ${
    // 				item.seriesName.includes("水位") ? "m" : "m³/s"
    // 			}`;
    // 		}
    // 	}
    // 	return str;
    // }
    textStyle: {
      fontSize: 24,
      color: "#fff",
    },
    backgroundColor: "#030F26",
    borderColor: "#02A7DB",
    borderWidth: 3,
  },
  xAxis: {
    type: "category",
    axisLine: {
      show: true,
      lineStyle: { type: "solid", color: "#ddd", width: 2 },
    },
    splitLine: { show: false },
    axisTick: {
      //y轴刻度线
      show: false,
    },
    boundaryGap: false,
    axisLabel: {
      color: "#fff",
      fontSize: 24,
    },
  },
  yAxis: [
    //两个y轴
    {
      id: "z",
      type: "value",
      name: "水位(m)",
      nameTextStyle: { align: "center", color: "#fff", fontSize: 24 },
      axisLabel: {
        show: true,
        color: "#fff",
        fontSize: 24,
        formatter(value: any) {
          return value.toFixed(2);
        },
      },
      min: ({ min, max }) => {
        return OMS.NiceScale(calMin(min, "z"), calMax(max, "z")).niceMin;
      },
      max: ({ min, max }) => {
        return OMS.NiceScale(calMin(min, "z"), calMax(max, "z")).niceMax;
      },
      splitLine: {
        show: false,
        lineStyle: { color: "rgba(255,255,255,.5)", width: 3 },
      },
      splitArea: { show: false },
      axisTick: {
        //y轴刻度线
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: { type: "solid", color: "#ddd", width: 3 },
      },
    },
    {
      id: "q",
      type: "value",
      name: "流量(m³/s)",
      nameTextStyle: { align: "center", color: "#fff", fontSize: 24 },
      axisLabel: {
        color: "#fff",
        fontSize: 24,
      },
      splitLine: {
        show: false,
        lineStyle: { color: "rgba(255,255,255,.5)", width: 3 },
      },

      splitArea: { show: false },
      axisTick: { show: false },
      axisLine: {
        show: true,
        lineStyle: { color: "#ddd", width: 3 },
      },
      min: ({ min, max }) => {
        return Math.floor(
          OMS.NiceScale(calMin(min, "q"), calMax(max, "q")).niceMin
        );
      },
      max: ({ min, max }) => {
        return Math.ceil(
          OMS.NiceScale(calMin(min, "q"), calMax(max, "q")).niceMax
        );
      },
    },
  ],
};

// 水位-入出库流量过程
export const zqProcessOption: ECOptions = {
  ...baseZQ,
  legend: { top: 30, padding: [5, 35, 5, 35] },
  series: [
    {
      type: "line",
      yAxisIndex: 0,
      showSymbol: false,
      symbol: "circle",
      legendHoverLink: false,
      encode: {
        x: "tm",
        y: "rz",
        seriesName: 1,
      },
      connectNulls: true,
    },
    {
      type: "line",
      yAxisIndex: 1,
      showSymbol: false,
      symbol: "circle",
      legendHoverLink: false,
      encode: {
        x: "tm",
        y: "inq",
        seriesName: 2,
      },
      connectNulls: true,
    },
    {
      type: "line",
      yAxisIndex: 1,
      showSymbol: false,
      symbol: "circle",
      legendHoverLink: false,
      encode: {
        x: "tm",
        y: "otq",
        seriesName: 3,
      },
      connectNulls: true,
    },
  ],
  dataZoom: [
    { type: "inside", start: 0, end: 100 },
    { start: 0, end: 100 },
  ],
};

// 水情动态演示
export const waterDynamicOption: ECOptions = {
  legend: {
    top: 30,
    padding: [5, 35, 5, 35],
  },
  grid: {
    left: 50,
    right: 40,
    bottom: "3%",
    containLabel: false,
  },
  xAxis: [
    {
      type: "category",
      axisLabel: { show: false, color: "#000" },
      axisLine: { show: true, lineStyle: { color: "#ddd" } },
      splitLine: { show: false },
      axisTick: { show: false },
      boundaryGap: false,
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "水位(m)",
      nameTextStyle: { color: "#000" },
      splitNumber: 5,
      axisLabel: {
        show: true,
        color: "#000",
        formatter: function (val: any) {
          return val.toFixed(2);
        },
      },
      // boundaryGap: [0.1, 0.1],
      scale: true,
      splitLine: { show: true },
      splitArea: { show: false },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: { color: "#ddd", type: "solid" },
      },
    },
    {
      type: "value",
      name: "流量(m³/s)",
      nameTextStyle: { color: "#000" },
      max: 10,
      min: 0,
      splitNumber: 10,
      // boundaryGap: [0.1, 0.1],
      axisLabel: {
        show: true,
        color: "#000",
        formatter: "{value} ",
      },
      scale: true,
      splitLine: { show: false },
      splitArea: { show: false },
      axisTick: { show: false },
      axisLine: {
        show: true,
        lineStyle: { color: "#ddd", type: "solid" },
      },
    },
  ],
  series: [
    {
      name: "堤坝",
      id: "db",
      type: "line",
      symbol: "none",
      smooth: false,
      areaStyle: { color: "#b1b1bd", opacity: 1 },
      data: [],
      connectNulls: true,
    },
    {
      name: "水位",
      type: "line",
      symbol: "none",
      yAxisIndex: 0,
      smooth: false,
      areaStyle: { color: "#0b8fb066" },
      z: 0,
      data: [],
      connectNulls: true,
    },
    {
      name: "出库流量",
      type: "line",
      yAxisIndex: 1,
      symbol: "none",
      smooth: false,
      areaStyle: { color: "#0b8fb066", opacity: 1 },
      data: [],
      z: 0,
      connectNulls: true,
    },
  ],
};

// 水位-蓄水量过程
export const zStrongWaterProcessOption: ECOptions = {
  ...baseZQ,
  yAxis: [
    (baseZQ["yAxis"] as any[])[0],
    {
      ...(baseZQ["yAxis"] as any[])[1],
      name: "蓄水量(百万m³)",
      nameTextStyle: { align: "right", color: "#000" },
    },
  ],
  legend: {
    top: 30,
    padding: [5, 35, 5, 35],
  },
  series: [
    {
      name: "库水位",
      type: "line",
      yAxisIndex: 0,
      showSymbol: false,
      symbol: "circle",
      legendHoverLink: false,
      encode: {
        x: "tm",
        y: "rz",
        seriesName: 1,
      },
      connectNulls: true,
    },
    {
      name: "蓄水量",
      type: "line",
      yAxisIndex: 1,
      showSymbol: false,
      symbol: "circle",
      legendHoverLink: false,
      encode: {
        x: "tm",
        y: "w",
        seriesName: 2,
      },
      connectNulls: true,
    },
  ],
  dataZoom: [
    { type: "inside", start: 0, end: 100 },
    { start: 0, end: 100 },
  ],
};

// 水位-流量过程
export const waterQProcessOption: ECOptions = {
  ...baseZQ,
  legend: {
    top: 30,
    padding: [5, 35, 5, 35],
  },
  series: [
    {
      type: "line",
      yAxisIndex: 0,
      showSymbol: false,
      symbol: "circle",
      legendHoverLink: false,
      encode: {
        x: "tm",
        y: "rz",
        seriesName: 1,
      },
    },
    {
      type: "line",
      yAxisIndex: 1,
      showSymbol: false,
      symbol: "circle",
      legendHoverLink: false,
      encode: {
        x: "tm",
        y: "inq",
        seriesName: 2,
      },
    },
  ],
  dataZoom: [
    { type: "inside", start: 0, end: 100 },
    { start: 0, end: 100 },
  ],
};
