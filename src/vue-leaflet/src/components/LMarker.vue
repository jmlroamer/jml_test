<script lang="ts">
import { defineComponent, PropType } from "vue";
import L from "leaflet";
import { layerProps, layerEmits, layerSetup } from "../functions/layer";

export default defineComponent({
	props: {
		latLng: {
			type: Object as PropType<L.LatLng | number[]>,
			required: true
		},
		options: {
			type: Object as PropType<L.MarkerOptions>
		},
		icon: {
			type: [String, Object] as PropType<string | L.Icon | L.DivIcon>,
			default: null
		},
		// 自动开启监听，数据量多的情况下可设为false
		autoWatch: { type: Boolean },
		// autoHighlight: { type: Boolean },
		...layerProps
	},
	inheritAttrs: false,
	emits: { ...layerEmits },
	setup(props, context) {
		const markerOptions = {
			zIndexOffset: props.zIndex || 0,
			...props.options
		} as L.MarkerOptions;

		if (props.icon && typeof props.icon === "string") {
			markerOptions.icon = L.icon({ iconUrl: props.icon, iconSize: [14, 14], iconAnchor: [7, 7] });
		}

		const marker = L.marker(props.latLng as L.LatLng, markerOptions);

		// props.autoHighlight &&
		// 	marker.on("click", () => {
		// 		marker.highlight();
		// 	});

		layerSetup(props, context, { layer: marker, autoWatch: props.autoWatch });

		context.expose({ marker });
	}
});
</script>

<template>
	<slot></slot>
</template>
