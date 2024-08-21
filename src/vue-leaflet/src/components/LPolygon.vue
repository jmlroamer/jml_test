<template>
	<slot></slot>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, toRef, watch } from "vue";
import L from "leaflet";
import { layerProps, layerSetup, layerEmits } from "../functions/layer";
import { mapContextKey } from "../token";
import { mergePen } from "../utils";

export default defineComponent({
	props: {
		...layerProps,
		latlngs: {
			type: Array as PropType<
				L.LatLngExpression[] | L.LatLngExpression[][] | L.LatLngExpression[][][]
			>,
			required: true
		},
		options: Object as PropType<L.PolylineOptions>
	},
	emits: { ...layerEmits },
	setup(props, context) {
		const { map } = inject(mapContextKey)!;
		if (!map) return;

		const latlngs = toRef(props, "latlngs");

		const layer = L.polygon(latlngs.value, mergePen(props.options));

		watch(latlngs, (val) => {
			layer.setLatLngs(val);
		});

		watch(
			() => props.options,
			(val) => {
				layer.setStyle(val!);
			}
		);

		layerSetup(props, context, { layer });
	}
});
</script>
