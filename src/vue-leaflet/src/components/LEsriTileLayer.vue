<script lang="ts">
import { defineComponent, PropType } from "vue";
import { tiledMapLayer, dynamicMapLayer, type TiledMapLayerOptions } from "esri-leaflet";
import { layerProps, layerEmits, layerSetup } from "../functions/layer";
import { mergePen } from "../utils";

export default defineComponent({
	props: {
		url: {
			type: String,
			default: null
		},
		type: { type: String, default: "tiled" },
		options: {
			type: Object as PropType<Partial<TiledMapLayerOptions>>
		},
		...layerProps
	},
	emits: {
		...layerEmits
	},
	inheritAttrs: false,
	setup(props, context) {
		const options = mergePen({
			url: props.url,
			noWrap: true,
			zIndex: props.zIndex,
			...(props.options || {})
		});

		const layer =
			props.type === "tiled"
				? tiledMapLayer(options)
				: props.type === "dynamic"
				? dynamicMapLayer(options)
				: null;
		layer && layerSetup(props, context, { layer });
	}
});
</script>

<template>
	<slot></slot>
</template>
