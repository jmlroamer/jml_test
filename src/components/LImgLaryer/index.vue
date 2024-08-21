<template>
  <slot></slot>
</template>

<script lang="ts">
import L from "leaflet";
import { defineComponent, inject, PropType, watch, toRefs } from "vue";
import {
  layerProps,
  layerSetup,
  layerEmits,
  mapContextKey,
} from "@/vue-leaflet";
// import baseImg from "@/assets/images/baseMap.png";
export default defineComponent({
  inheritAttrs: false,
  props: {
    ...layerProps,
  },
  emits: { ...layerEmits },
  setup(props, context) {
    const { map } = inject(mapContextKey)!;
    if (!map) return;
    const layerGroup: any = L.layerGroup();
    const bounds: any = [
      [
        [24.548, 110.9055],
        [26.94406, 112.542],
      ],
    ];
    layerGroup && layerGroup.clearLayers();
    // layerGroup.addLayer(L.imageOverlay(baseImg, bounds[0], { opacity: 1 }));
    layerSetup(props, context, { layer: layerGroup });
    context.expose({ layerGroup });
  },
});
</script>

<style lang="scss" scoped></style>
