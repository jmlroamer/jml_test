// import L from "leaflet";
// import axios from "axios";
// import { countyList } from "@/stores";
// import { getImgUrl } from "@/utils";
// import { MAP_OMS_URL } from "@/constants";
// import { SitLegendType } from "@/views/comprehensiveSituation/options";
// import { get_realYlz, get_realHdz, get_realSkz, get_realSqz } from "@/api";
// import sitePopup from "@/components/SitePopup/index.vue";
// import sitePopupRR from "@/components/SitePopupRR/index.vue";
// import sitePopupPP from "@/components/SitePopupPP/index.vue";
// import type { EventBusKey } from "@vueuse/core";
// import dayjs from "dayjs";

// import { swz } from "@/constants/moke";
// import { swzZZ } from "@/constants/mock";
// export const siteclick_reportBusKey: EventBusKey<any> = Symbol(
//   "siteclick_report_key"
// );
// export const rainParmes = reactive({
//   addvcd: "",
//   beginTime: dayjs().subtract(1, "hours").format(`YYYY-MM-DD 08:00`),
//   endTime: dayjs().format(`YYYY-MM-DD HH:mm`),
//   drpLevel: "",
// });

// export const mapPopupBusKey: EventBusKey<any> = Symbol("map-popup-key");
// const bus = useEventBus<any>(mapPopupBusKey);

// let width = 34;
// let height = 34;

// export function useMap(legendData: Ref, mapRef: any) {
//   let popup = L.popup();

//   const map = mapRef;
//   map.value.createPane("basePane");
//   map.value.getPane("basePane").style.zIndex = 999;
//   let quxianMarkerLayerGroup: L.LayerGroup<any> | null | undefined = undefined;
//   const quxiannamelayers = shallowRef<L.LayerGroup>(new L.LayerGroup());

//   const canvasLayer = L.canvasIconLayer({ enableText: true, zIndex: 400 });
//   const xianjieLayer = L.geoJSON();
//   const divMarker = L.layerGroup();
//   const divSWMarker = L.layerGroup([], {
//     pane: "basePane",
//   });
//   function initMap() {
//     canvasLayer.addTo(map.value);
//     divMarker.addTo(map.value);
//     divSWMarker.addTo(map.value);
//     xianjieLayer.addTo(map.value);
//     quxiannamelayers.value.addTo(map.value);
//     canvasLayer.addOnClickListener(onMarkerClick);
//     // displayCountryConfigLayer();
//     // import("@/components/MapCoverage/geojson/xianjie.json").then((res: any) => {
//     //   xianjieLayer.addData(res.default);
//     //   xianjieLayer.setStyle({
//     //     color: "rgba(7, 239, 238, 0.9)",
//     //     opacity: 1,
//     //     weight: 1,
//     //     fillOpacity: 0,
//     //     fillColor: "rgba(0,0,0,0)",
//     //   });
//     // });
//     watch(
//       legendData,
//       (val) => {
//         clearLayers();
//         getStationJson(val);
//       },
//       { deep: true }
//     );
//   }

//   function isShowStationType(type: string) {
//     return legendData.value && legendData.value[type]
//       ? legendData.value[type].status
//       : false;
//   }

//   function getStationJson(legend: any) {
//     const keys = Object.keys(legend!);
//     const checkLayers: SitLegendType[] = [];
//     keys.forEach((o) => {
//       legend![o].status && checkLayers.push(legend![o]);
//     });
//     divMarker.clearLayers();
//     divSWMarker.clearLayers();
//     for (let index = 0; index < checkLayers.length; index++) {
//       const item = checkLayers[index];
//       item.coverage.map((name) => {
//         if (name == "yongzhouyuliangzhan") {
//           get_realYlz(rainParmes).then((res: any) => {
//             const data = res.map((o: any) => {
//               return {
//                 ...o,
//                 sttp: "PP",
//                 name: o.stnm,
//                 lng: o.lgtd,
//                 lat: o.lttd,
//                 sttptext: "雨量站",
//               };
//             });
//             loadStation(data, item.type);
//           });
//         } else if (name == "shangqing") {
//           get_realSqz("").then((res: any) => {
//             const data = res.rows.map((o: any) => {
//               return {
//                 ...o,
//                 name: o.stnm,
//                 lng: o.lgtd,
//                 lat: o.lttd,
//                 sttptext: "墒情站",
//               };
//             });
//             loadStation(data, item.type);
//           });
//         } else if (name == "shuiwei") {
//           get_realHdz({ addvcd: "", sttp: "ZZ" }).then((res: any) => {
//             const data = res.map((o: any) => {
//               const arr = swzZZ.filter((item: any) => item.stcd == o.stcd);
//               return {
//                 ...o,
//                 name: o.stnm,
//                 // lng: o.lgtd,
//                 // lat: o.lttd,
//                 sttptext: "水位站",
//                 rotate: arr[0]?.rotate || "",
//                 lng: arr[0]?.lng,
//                 lat: arr[0]?.lat,
//               };
//             });
//             loadStation(data, item.type);
//           });
//         } else if (name == "shuiwen") {
//           get_realHdz({ addvcd: "", sttp: "ZQ" }).then((res: any) => {
//             const data = res.map((o: any) => {
//               const arr = swz.filter((item: any) => item.stcd == o.stcd);
//               return {
//                 ...o,
//                 name: o.stnm,
//                 // lng: o.lgtd,
//                 // lat: o.lttd,
//                 sttptext: "水文站",
//                 rotate: arr[0]?.rotate || "",
//                 lng: arr[0]?.lng,
//                 lat: arr[0]?.lat,
//               };
//             });
//             loadStation(data, item.type);
//           });
//         } else if (name == "shuiku") {
//           get_realSkz({
//             addvcd: "",
//             type: "",
//           }).then((res: any) => {
//             const data = res.rsvrList.map((o: any) => {
//               return {
//                 ...o,
//                 name: o.stnm,
//                 lng: o.lgtd,
//                 lat: o.lttd,
//                 sttptext: "水库站",
//               };
//             });
//             loadStation(data, item.type);
//           });
//         } else if (item.type != "QX") {
//           item.coverage.map((name) => {
//             axios.get(MAP_OMS_URL(name)).then((res) => {
//               const data = res.data.features;
//               loadStation(data, item.type);
//             });
//           });
//         }
//       });
//     }
//   }

//   async function loadStation(data: any, type: string) {
//     for (let index = 0; index < data.length; index++) {
//       const item = data[index];
//       let marker;
//       if (type == "PP") {
//         marker = await createMarkerPP(item, type);
//         marker!.bindTooltip(`${item.name}: ${item.sumDrp || "--"}mm`, {
//           direction: "top",
//           className: "ltip",
//         });
//         // @ts-ignore
//         marker.on("click", onMarkerClick);
//         (marker as any).customRow = item;
//         divMarker.addLayer(marker!);
//       } else if (type == "ZZ" || type == "ZQ") {
//         marker = await createMarkerHD(item, type);
//         marker!.bindTooltip(`${item.name}: ${item.z || "--"}m`, {
//           direction: "top",
//           className: "ltip",
//         });
//         // @ts-ignore
//         marker.on("click", onMarkerClick);
//         (marker as any).customRow = item;
//         divSWMarker.addLayer(marker!);
//       } else if (type == "RR") {
//         marker = await createMarkerRR(item, type);
//         marker!.bindTooltip(`${item.name}: ${item.z || "--"}m`, {
//           direction: "top",
//           className: "ltip",
//         });
//         // @ts-ignore
//         marker.on("click", onMarkerClick);
//         (marker as any).customRow = item;
//         divSWMarker.addLayer(marker!);
//         // canvasLayer.addMarker(marker!);
//       } else {
//         marker = await createMarker(item, type);
//         // @ts-ignore
//         marker.on("click", onMarkerClick);
//         if (type == "PP" || type == "SQ") {
//           marker!.bindTooltip(item.name, {
//             direction: "top",
//             className: "ltip",
//           });
//         } else if (type == "SZ") {
//           marker!.bindTooltip(item.站名, {
//             direction: "top",
//             className: "ltip",
//           });
//         } else {
//           marker!.bindTooltip(item.properties.测站名, {
//             direction: "top",
//             className: "ltip",
//           });
//         }
//         (marker as any).customRow = item.properties;
//         canvasLayer.addMarker(marker!);
//         type == "SZ" || type == "SQ"
//           ? ((marker as any).customRow = item)
//           : null;
//       }
//     }
//   }

//   async function onMarkerClick(e: any, ret: any) {
//     let data;
//     if (!ret) {
//       data = (e.target as any).customRow;
//     } else {
//       data = ret[0].data.customRow;
//     }
//     let lat, lng;
//     let html;

//     if (data.sttp) {
//       lat = data.lat;
//       lng = data.lng;
//       html = await generatePopup(data);
//     } else {
//       return;
//     }
//     popup = L.popup({
//       closeButton: false,
//       autoClose: true,
//       closeOnClick: true,
//       className: "custom-popup",
//     })
//       .setLatLng([lat, lng])
//       .setContent(html)
//       .openOn(map.value!);
//     html.addEventListener("click", onPopupClick);
//   }

//   function onPopupClick(e: any) {
//     if (e.target.dataset.action == "close") {
//       popup?.remove();
//     }
//     if (e.target.dataset.action == "open") {
//       window.open("https://www.example.com");
//     }
//   }

//   onUnmounted(() => {
//     popup?.remove();
//   });
//   function displayCountryConfigLayer() {
//     let markerArr: any = [];
//     countyList.forEach((o) => {
//       const marker = createMarkerOfName(o, false);
//       markerArr.push(marker);
//     });
//     quxianMarkerLayerGroup = L.layerGroup(markerArr);
//     quxiannamelayers.value.addLayer(quxianMarkerLayerGroup);
//   }
//   function createMarkerOfName(row: Record<string, any>, isText: boolean) {
//     const html = `
//     <div class="marker-box">
//       <div class="text" style="color:#fff">${row.name}</div>
//     </div>
//     `;
//     const width = row.name.length * 30;
//     const height = isText ? 40 : 80;
//     const divIcon = L.divIcon({
//       className: "my-div-icon",
//       html,
//       iconAnchor: [width / 2, height],
//       iconSize: [row.name.length * 30, height],
//     });
//     const marker = L.marker([row.lat, row.lng], {
//       icon: divIcon,
//     });
//     (marker as any).customRow = row;
//     return marker;
//   }

//   // 生成marker
//   function createMarker(row: Record<string, any>, type: string) {
//     let icon = "";
//     const isPP = type == "PP";
//     const isSQorSZ = type == "SQ";
//     let lng, lat;
//     if (isPP || isSQorSZ) {
//       lng = row.lng;
//       lat = row.lat;
//     } else if (type == "SZ") {
//       lng = row.经度;
//       lat = row.纬度;
//     } else {
//       [lng, lat] = row.geometry.coordinates;
//     }
//     let width = 34;
//     let height = 34;
//     type == "RR"
//       ? (icon = getImgUrl(`${type}_com`))
//       : (icon = getImgUrl(`${type}_com`));
//     type == "SZ" ? (icon = getImgUrl(`szz`)) : null;
//     const marker = L.marker([lat, lng], {
//       icon: L.icon({
//         iconUrl: icon,
//         iconSize: [width, height],
//         iconAnchor: [width / 2, height / 2],
//       }),
//     });
//     return marker;
//   }
//   // 生成marker雨量站
//   async function createMarkerPP(row: Record<string, any>, type: string) {
//     let color = "#ccc";
//     let lng, lat;
//     lng = row.lng;
//     lat = row.lat;
//     row.drpLevel == "-1"
//       ? (color = "#CCCCCC")
//       : row.drpLevel == "1"
//       ? (color = "#96FB97")
//       : row.drpLevel == "2"
//       ? (color = "#30D332")
//       : row.drpLevel == "3"
//       ? (color = "#5CB9FF")
//       : row.drpLevel == "4"
//       ? (color = "#0000FD")
//       : row.drpLevel == "5"
//       ? (color = "#FF02F3")
//       : (color = "#840242");
//     const html = `<div style="width:13px;height:13px;border-radius: 50%; background-color: ${color};
//                       border: 1px solid rgba(0, 0, 0, 1);"><div>`;
//     var myIcon = await L.divIcon({
//       className: "my-div-icon",
//       html,
//     });
//     const marker = L.marker([lat, lng], {
//       icon: myIcon,
//     });
//     return marker;
//   }
//   // 生成marker水库站
//   async function createMarkerRR(row: Record<string, any>, type: string) {
//     const lng = row.lng;
//     const lat = row.lat;
//     let icon = getImgUrl(`${type}_com`);
//     if (row.bxx > 0) {
//       icon = getImgUrl(`${type}_com_cjj`);
//     }
//     if (type == "RR") {
//       if (row.rsvrtp == "1" || row.rsvrtp == "2") {
//         width = 24;
//         height = 24;
//       } else if (row.rsvrtp == "4" || row.rsvrtp == "5") {
//         width = 28;
//         height = 28;
//       }
//     } else {
//       width = 26;
//       height = 26;
//     }
//     const marker = L.marker([lat, lng], {
//       icon: L.icon({
//         iconUrl: icon,
//         iconSize: [width, height],
//         iconAnchor: [width / 2, height / 2],
//       }),
//     });
//     return marker;
//   }
//   // 生成marker河道站
//   async function createMarkerHD(row: Record<string, any>, type: string) {
//     const lng = row.lng;
//     const lat = row.lat;
//     let icon = getImgUrl(`${type}_com`);
//     if (row.bjj > 0) {
//       icon = getImgUrl(`${type}_com_cjj`);
//     }
//     const html = `<div style="width:26px;height:26px;transform: rotate(${row.rotate}deg);">
//                     <img src="${icon}" style="width: 26px;height: 26px;">
//                 <div>`;
//     var myIcon = await L.divIcon({
//       className: "my-div-icon",
//       html,
//     });
//     const marker = L.marker([lat, lng], {
//       icon: myIcon,
//     });
//     return marker;
//   }

//   async function generatePopup(row: any) {
//     const content = await document.createElement("div");
//     let comp = sitePopup;
//     row.sttp == "RR"
//       ? (comp = sitePopupRR)
//       : row.sttp == "PP"
//       ? (comp = sitePopupPP)
//       : null;
//     content.className = "popup-container";
//     const vueApp = createApp(comp, {
//       data: row,
//       busKey: siteclick_reportBusKey,
//     });
//     vueApp.mount(content);
//     return content;
//   }

//   function clearLayers() {
//     canvasLayer.clearLayers();
//     divMarker.clearLayers();
//     divSWMarker.clearLayers();
//     // layers.clearLayers()
//   }

//   return {
//     initMap,
//     clearLayers,
//     isShowStationType,
//   };
// }
