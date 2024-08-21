<template>
  <LMap ref="map" :options="MAP_OPTIONS" :zoom="zoom">
    <LGeojson
      :geojson="GeoChina"
      :options="{ style: { color: 'red' } }"
      :style="{
        color: '#78D33C',
        weight: 1,
        opacity: 1,
        fillColor: '#ccc',
        fillOpacity: 0,
      }"
    ></LGeojson>
    <LTileLayer
      :url="BASE_MAP_CONTROL[6].url"
      :options="{ ...BASE_MAP_CONTROL[6].options, opacity: 0.4 }"
      :key="BASE_MAP_CONTROL[6].url"
      :z-index="1"
    />
    <LTileLayer
      :url="BASE_MAP_CONTROL[8].url"
      :options="BASE_MAP_CONTROL[8].options"
      :key="BASE_MAP_CONTROL[8].url"
      :z-index="3"
    ></LTileLayer>
    <slot></slot>
  </LMap>
</template>
<script lang="ts" setup>
import { BASE_ZOOM, MAP_OPTIONS, BASE_MAP_CONTROL } from "@/constants";
import L from "leaflet";
const zoom = ref(4.3);
const map = ref<L.Map>();
const GeoChina = ref();
onMounted(async () => {
  GeoChina.value = await import("@/assets/geojson/china.json");
});
</script>
<style lang="scss" scoped></style>
