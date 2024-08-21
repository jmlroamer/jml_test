<template>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, watch, toRefs } from "vue";
import L from "leaflet";
import { layerProps, layerSetup, layerEmits } from "../functions/layer";
import { mapContextKey } from "../token";
import type { GeoJsonObject } from "geojson";

export default defineComponent({
  inheritAttrs: false,
  props: {
    geojson: Object as PropType<GeoJsonObject>,
    options: Object as PropType<L.GeoJSONOptions>,
    style: Object as PropType<L.GeoJSONOptions["style"]>,
    isChange: {
      default: "",
      type: String,
    },
    ...layerProps,
  },
  emits: { ...layerEmits },
  setup(props, context) {
    const { map } = inject(mapContextKey)!;
    if (!map) return;

    const { geojson } = toRefs(props);
    const layer = L.geoJSON(
      geojson.value,
      Object.assign({}, props.style ? { style: props.style } : null)
    );

    watch(geojson, (data) => {
      layer.clearLayers();
      if (data) {
        layer.addData(data);
        const style = getStyle();
        style && layer.setStyle(style);
      }
    });

    function setStyle(style: L.GeoJSONOptions["style"]) {
      style && layer.setStyle(style);
    }

    function getStyle() {
      if (props.style) return props.style;
      if (props.options?.style) return props.options.style;
    }

    watch(() => props.style, setStyle, { immediate: true });
    watch(
      () => props.isChange,
      () => setStyle(props.style),
      { immediate: true }
    );
    watch(() => props.options?.style, setStyle, { immediate: true });

    layerSetup(props, context, { layer });

    context.expose({ layer });
  },
});
</script>
