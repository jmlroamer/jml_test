<template>
	<slot></slot>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from "vue";
import L from "leaflet";
import { layerProps, layerEmits, layerSetup } from "../functions/layer";
import type { WMSOptions, WMSParams } from "leaflet";
import { mergePen } from "../utils";

export default defineComponent({
	props: {
		layers: { type: String },
		styles: { type: String },
		crs: { type: Object as PropType<L.CRS>, default: L.CRS.EPSG4326 },
		url: {
			type: String,
			default: null
		},
		preferCanvas: {
			type: Boolean,
			default: true
		},
		options: {
			type: Object as PropType<WMSOptions>
		},
		...layerProps
	},
	emits: { ...layerEmits },
	setup(props, context) {
		const option = mergePen({
			format: "image/png",
			transparent: true,
			crs: props.crs,
			zIndex: props.zIndex,
			layers: props.layers,
			...props.options
		});
		const styles = props.styles || props.options?.styles;

		styles && (option.styles = styles);

		const wmsTileLayer = L.tileLayer.wms(props.url, option);

		layerSetup(props, context, { layer: wmsTileLayer });

		watch([() => props.layers, () => props.styles], () => {
			const { layers, styles, options } = props;
			const _style = styles || options?.styles;
			const params: Partial<WMSParams> = { layers: layers || options?.layers };
			_style && (params.styles = _style);
			wmsTileLayer.setParams(params as WMSParams);
		});
	}
});
</script>
