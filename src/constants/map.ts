import L from "leaflet";

/** 天地图相关 */
export const TIAN_MAP = {
  // 矢量底图
  Normal: {
    Map: "//t{s}.tianditu.gov.cn/vec_w/wmts?layer=vec&style=default&tilematrixset=w&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&tileMatrix={z}&TileCol={x}&TileRow={y}&tk={key}",
    Annotion:
      "//t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={key}",
  },
  // 影像底图
  Satellite: {
    Map: "//t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk={key}",
    Annotion:
      "//t{s}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={key}",
  },
  // 地形晕渲
  Terrain: {
    Map: "//t{s}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk={key}",
    Annotion:
      "//t{s}.tianditu.gov.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={key}",
  },
};

export const MAP_WMS_URL =
  import.meta.env.VITE_APP_MAP_API + "/geoserver/yongzhou/wms";

const MAP_OWS_SIZE = 10000;

export const MAP_OMS_URL = (name?: string) => {
  return `${
    import.meta.env.VITE_APP_MAP_API
  }/geoserver/yongzhou/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=yongzhou%3A${name}&
	maxFeatures=${MAP_OWS_SIZE}&outputFormat=application%2Fjson`;
};

// 地图默认参数
export const BASE_ZOOM = 9.7;
export const MAP_CENTER: L.LatLngTuple = [
  // 25.66411139916078, 111.64989829756606,
  32.96411139916078, 107.04989829756606,
];
export const MAP_CENTER_MIN: L.LatLngTuple = [
  25.76411139916078, 111.74989829756606,
];
export const MAP_CENTER_PRE: L.LatLngTuple = [
  25.700411139916078, 111.64989829756606,
];
export const MAP_OPTIONS: L.MapOptions = {
  center: MAP_CENTER, //地图中心经纬度
  zoomSnap: 0,
  zoomDelta: 0.2,
  zoom: BASE_ZOOM,
  minZoom: 2,
  maxZoom: 17.63,
  // dragging: true, //是否允许拖拽
  worldCopyJump: false,
  wheelPxPerZoomLevel: 50,
  attributionControl: false, //去除右下角标志
  zoomControl: false, //是否显示地图缩放图例
  // crs: CRS_4546,
  zoomAnimation: true,
  maxBounds: [
    // [23.546591499522236, 109.96313261089293], // 西南
    // [28.179349772872012, 113.25558039432808], // 东北
    // [23.546591499522236, 107.66313261089293], // 西南
    // [28.179349772872012, 115.65558039432808], // 东北
  ],
};
export const MAP_OPTIONS_MIN: L.MapOptions = {
  center: MAP_CENTER_MIN, //地图中心经纬度
  zoomSnap: 0,
  zoomDelta: 0.2,
  zoom: BASE_ZOOM,
  minZoom: 8.1,
  maxZoom: 15,
  // dragging: true, //是否允许拖拽
  worldCopyJump: false,
  wheelPxPerZoomLevel: 50,
  attributionControl: false, //去除右下角标志
  zoomControl: false, //是否显示地图缩放图例
  // crs: CRS_4546,
  zoomAnimation: true,
  maxBounds: [
    [20.546591499522236, 100.96313261089293], // 西南
    [30.179349772872012, 115.25558039432808], // 东北
  ],
};
export const MAP_OPTIONS_PRE: L.MapOptions = {
  center: MAP_CENTER_PRE, //地图中心经纬度
  zoomSnap: 0,
  zoomDelta: 0.2,
  zoom: BASE_ZOOM,
  minZoom: 8,
  maxZoom: 14,
  // dragging: true, //是否允许拖拽
  worldCopyJump: false,
  wheelPxPerZoomLevel: 50,
  attributionControl: false, //去除右下角标志
  zoomControl: false, //是否显示地图缩放图例
  // crs: CRS_4546,
  zoomAnimation: true,
  maxBounds: [
    [23.546591499522236, 110.16313261089293], // 西南
    [28.179349772872012, 113.55558039432808], // 东北
  ],
};

const baseZindex = 1;

type BaseMapRaw = {
  label: string;
  url: string;
  icon: string;
  options?: L.TileLayerOptions;
};

export const TIAN_MAP_OPTIONS = {
  zIndex: baseZindex,
  subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
  key: "4e663361fafe62c28e0c3dc115047428",
  minZoom: 0,
  maxZoom: 17, //天地图经纬度投影的最大缩放级别为17,继续放大则没有瓦片可以拉取
  // tileSize: 256, //使用L.CRS.EPSG4326时需要放开这两个参数
  // zoomOffset: 1 //使用L.CRS.EPSG4326时需要放开这两个参数
};
export const BASE_MAP_CONTROL: BaseMapRaw[] = [
  {
    label: "天地图街道",
    icon: new URL("@/assets/images/mapIcon/map4.png", import.meta.url).href,
    url: `https://api.mapbox.com/styles/v1/qhstill/ckryqjnwo0at718q2y536wfej/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicWhzdGlsbCIsImEiOiJja3J5cWUzZm8xMm56Mm5rM2IzYWw3aDI4In0.noaJXH7UflaJGWsxolcjFg`,
    options: { zIndex: baseZindex },
  },
  {
    label: "高德影像",
    icon: new URL("@/assets/images/mapIcon/gy.jpg", import.meta.url).href,
    url: "https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    options: { zIndex: baseZindex },
  },
  {
    label: "天地图影像",
    url: TIAN_MAP.Satellite.Map,
    icon: new URL("@/assets/images/mapIcon/ty.png", import.meta.url).href,
    options: TIAN_MAP_OPTIONS,
  },
  {
    label: "天地图地形",
    url: TIAN_MAP.Terrain.Map,
    icon: new URL("@/assets/images/mapIcon/td.png", import.meta.url).href,
    options: TIAN_MAP_OPTIONS,
  },
  {
    label: "天地图矢量",
    url: TIAN_MAP.Normal.Map,
    icon: new URL("@/assets/images/mapIcon/ts.png", import.meta.url).href,
    options: TIAN_MAP_OPTIONS,
  },
  {
    label: "地形图",
    url: "",
    icon: new URL("@/assets/images/mapIcon/dx.jpg", import.meta.url).href,
    options: TIAN_MAP_OPTIONS,
  },
  {
    label: "图",
    icon: new URL("@/assets/images/mapIcon/dx.jpg", import.meta.url).href,
    // url: TIAN_MAP.Satellite.Map,
    // options: TIAN_MAP_OPTIONS
    url: `https://api.mapbox.com/styles/v1/qhstill/ckryqjnwo0at718q2y536wfej/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicWhzdGlsbCIsImEiOiJja3J5cWUzZm8xMm56Mm5rM2IzYWw3aDI4In0.noaJXH7UflaJGWsxolcjFg`,
    options: { zIndex: baseZindex },
  },
  {
    label: "地形图",
    icon: new URL("@/assets/images/mapIcon/dx.jpg", import.meta.url).href,
    // url: TIAN_MAP.Satellite.Map,
    // options: TIAN_MAP_OPTIONS
    url: `https://t{s}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=8ebdf0e8b6d6e546dc9e1b255f946127`,
    options: { zIndex: baseZindex },
  },
  {
    label: "天地影像图",
    icon: new URL("@/assets/images/mapIcon/dx.jpg", import.meta.url).href,
    // url: TIAN_MAP.Satellite.Map,
    // options: TIAN_MAP_OPTIONS
    url: `https://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=8ebdf0e8b6d6e546dc9e1b255f946127`,
    options: {
      attribution: "&copy; OpenStreetMap contributors",
      subdomains: ["1", "2", "3", "4", "5"],
    },
  },
  {
    label: "天地影像图",
    icon: new URL("@/assets/images/mapIcon/dx.jpg", import.meta.url).href,
    // url: TIAN_MAP.Satellite.Map,
    // options: TIAN_MAP_OPTIONS
    url: `https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=8ebdf0e8b6d6e546dc9e1b255f946127`,
    options: { zIndex: baseZindex },
  },
];
