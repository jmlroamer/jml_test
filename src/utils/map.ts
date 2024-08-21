// import RiverPopup from "@/views/comprehensiveSituation/composables/riverPopup.vue";
// import L from "leaflet";

// export const riverList = [
//   {
//     color: "#fff",
//     label: "全部",
//     value: "99",
//     num: 0,
//   },
//   // {
//   //   icon: "",
//   //   color: "#CCCCCC",
//   //   label: "0mm",
//   //   value: "2",
//   // },

//   {
//     color: "#30D332",
//     label: "二级河流",
//     value: "2",
//     num: 0,
//   },
//   {
//     color: "#5CB9FF",
//     label: "三级河流",
//     value: "3",
//     num: 0,
//   },
//   {
//     color: "#5CB9FF",
//     label: "四级河流",
//     value: "4",
//     num: 0,
//   },
//   {
//     color: "#5CB9FF",
//     label: "五级河流",
//     value: "5",
//     num: 0,
//   },
//   // {
//   //   color: "#96FB97",
//   //   label: "六级河流",
//   //   value: "6",
//   //   num: 324,
//   // },
// ];
// const riverWidth: any = {
//   r2: 7,
//   r3: 5,
//   r4: 3,
//   r5: 2,
//   r6: 1,
// };
// export const initRiverMap = (mapParms: any) => {
//   const map = mapParms;
//   const layersclickline = ref<any>([]);
//   let riverLayers: any = null; //河流图层点击
//   let riverLayersShow: any = null; //河流图层
//   const riverNameLayer = shallowRef<L.LayerGroup>(new L.LayerGroup()); //河流名字
//   const rivers: any = ref([]); //河流geojson数据
//   let popup = L.popup();
//   const getRivers = async (levels: any = [2, 3]) => {
//     map.value.createPane("riverPane");
//     map.value.getPane("riverPane").style.zIndex = 499;
//     riverLayers && map.value.removeLayer(riverLayers);
//     riverLayersShow && map.value.removeLayer(riverLayersShow);
//     const res = await import("@/components/MapCoverage/geojson/river500.json");
//     rivers.value = JSON.parse(JSON.stringify(res));
//     rivers.value.features = rivers.value.features.filter((item: any) => {
//       let status = false;
//       levels.forEach((j: any) => {
//         if (item.properties.JB == j) status = true;
//       });
//       return status;
//     });
//     riverLayersShow = L.geoJSON(rivers.value, {
//       style: (feature) => {
//         const s = {
//           weight: 3,
//           color: "rgba(30, 144, 255,1)",
//         };
//         Object.keys(riverWidth).forEach((k, i) => {
//           if (feature!.properties.JB == i + 2) {
//             s.weight = riverWidth[k];
//             // s.color = colorlist[k]
//           }
//         });
//         return s;
//       },
//       pane: "riverPane",
//     }).addTo(map.value);
//     riverLayers = L.geoJSON(rivers.value, {
//       style: (feature) => {
//         const s = {
//           weight: 5,
//           color: "rgba(30, 144, 255,1)",
//           opacity: 0,
//         };
//         Object.keys(riverWidth).forEach((k, i) => {
//           if (feature!.properties.JB == i + 2) {
//             s.weight = riverWidth[k];
//             // s.color = colorlist[k]
//           }
//         });
//         return s;
//       },
//       pane: "riverPane",
//     })
//       .on("click", (e) => {
//         riverClick({
//           type: "line",
//           data: rivers.value.features.filter(
//             (o: any) =>
//               o.properties.河名 === e.propagatedFrom.feature.properties.河名
//           ),
//           info: e.propagatedFrom.feature.properties,
//           status: true,
//         });
//       })
//       .addTo(map.value);
//     const nameList = rivers.value.features
//       .filter(
//         (i: any) =>
//           i.properties.水系 == "西江水系" ||
//           (i.properties.水系 == "洞庭湖水系" && i.properties.JB == "2")
//       )
//       .map((e: any) => {
//         return {
//           name: e.properties.河名,
//           lat: e.properties.HPLat,
//           lng: e.properties.HPLon,
//         };
//       });
//     addRNLayers(nameList);
//   };
//   //河流名字
//   function addRNLayers(list: any) {
//     riverNameLayer.value && map.value.removeLayer(riverNameLayer.value);
//     riverNameLayer.value.clearLayers();
//     list.forEach((o: any) => {
//       const marker = createMarker(o);
//       riverNameLayer.value.addLayer(marker);
//     });
//     riverNameLayer.value.addTo(map.value);
//   }
//   function createMarker(row: Record<string, any>) {
//     const html = `
//           <div class="marker-box">
//             <div class="text" style="color:#fff;font-size:22px;">${row.name}</div>
//           </div>
//           `;
//     const width = row.name.length * 30;
//     const height = 80;
//     const divIcon = L.divIcon({
//       className: "my-div-icon",
//       html,
//       iconAnchor: [width / 2, 0],
//       iconSize: [row.name.length * 30, height],
//     });
//     const marker = L.marker([row.lat, row.lng], {
//       icon: divIcon,
//     });
//     (marker as any).customRow = row;
//     return marker;
//   }
//   const riverClick = async (e: any) => {
//     removeAllInteractive();
//     if (e.type === "line") {
//       const LineLayer = await createLine(e.data);
//       // tooltip.value = await createTooltip(e.data);
//       e.status && onMarkerClick({}, e);
//       // tooltip.value.openOn(map.value);
//       layersclickline.value.push(LineLayer);
//       map.value.addLayer(LineLayer);
//     }
//   };
//   function createLine(data: any, style: any = "") {
//     return L.geoJSON(data, {
//       style: {
//         color: "#ff7800",
//         weight: 20,
//         opacity: 0.65,
//         ...style,
//       },
//     });
//   }
//   async function onMarkerClick(e: any, ret: any) {
//     const html = await generatePopupRiver(ret.data[0].properties);
//     popup = L.popup({
//       closeButton: false,
//       autoClose: true,
//       closeOnClick: true,
//       className: "custom-popup",
//     })
//       .setLatLng([ret.data[0].properties.HPLat, ret.data[0].properties.HPLon])
//       .setContent(html)
//       .openOn(map.value!);
//     html.addEventListener("click", onPopupClick);
//   }
//   async function generatePopupRiver(row: any) {
//     const content = await document.createElement("div");
//     content.style.zIndex = "9999";
//     content.className = "popup-container";
//     const vueApp = createApp(RiverPopup, {
//       data: row,
//     });
//     vueApp.mount(content);
//     return content;
//   }
//   function onPopupClick(e: any) {
//     if (e.target.dataset.action == "close") {
//       popup?.remove();
//     }
//   }
//   onUnmounted(() => {
//     popup?.remove();
//   });
//   const removeAllInteractive = () => {
//     layersclickline.value.forEach((o: any) => {
//       map.value.removeLayer(o);
//     });
//   };
//   const clearRiverLayers = () => {
//     riverLayers && map.value.removeLayer(riverLayers);
//     riverLayersShow && map.value.removeLayer(riverLayersShow);
//     // riverNameLayer.value && map.value.removeLayer(riverNameLayer.value);
//     layersclickline.value.forEach((o: any) => {
//       map.value.removeLayer(o);
//     });
//   };
//   return { getRivers, clearRiverLayers, removeAllInteractive };
// };

// import { countyList } from "@/stores";
// export const initCityMap = (mapParms: any) => {
//   const map = mapParms;
//   const GeoLayers = ref();
//   const cityLayer = ref();
//   const cityNameLayer = ref();
//   const addCityLayer = (namecolor: string = "#fff", cityStyle: Object = {}) => {
//     import("@/components/MapCoverage/geojson/yongzhou_sj.json").then(
//       (res: any) => {
//         map.value.createPane("cityPane");
//         map.value.getPane("cityPane").style.zIndex = 400;
//         GeoLayers.value = L.geoJSON(res.default, {
//           style: (feature: any) => {
//             return {
//               color: "rgba(7, 239, 238, 0.9)",
//               fillColor: "rgba(62, 157, 140,0)",
//               fillOpacity: 0,
//               ...cityStyle,
//             };
//           },
//           pane: "cityPane",
//         }).addTo(map.value);
//       }
//     );

//     import("@/components/MapCoverage/geojson/xianjie.json").then((res: any) => {
//       cityLayer.value = L.geoJSON(res.default.features, {
//         style: (feature: any) => {
//           return {
//             color: "rgba(7, 239, 238, 0.9)",
//             opacity: 1,
//             weight: 1,
//             fillOpacity: 0,
//             fillColor: "rgba(0,0,0,0)",
//             ...cityStyle,
//           };
//         },
//         pane: "cityPane",
//       });
//       cityLayer.value.addTo(map.value);
//     });
//     let markerArr: any = [];
//     countyList.forEach((o) => {
//       const marker = createMarkerOfName(o, false, namecolor);
//       markerArr.push(marker);
//     });
//     cityNameLayer.value = L.layerGroup(markerArr);
//     cityNameLayer.value.addTo(map.value);
//   };
//   function createMarkerOfName(
//     row: Record<string, any>,
//     isText: boolean,
//     namecolor: string
//   ) {
//     const html = `
//     <div class="marker-box">
//       <div class="text" style="color:${namecolor}">${row.name}</div>
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
//   const clearCityLayers = () => {
//     GeoLayers.value && map.value.removeLayer(GeoLayers.value);
//     cityLayer.value && map.value.removeLayer(cityLayer.value);
//     cityNameLayer.value && map.value.removeLayer(cityNameLayer.value);
//   };

//   return { addCityLayer, clearCityLayers };
// };
