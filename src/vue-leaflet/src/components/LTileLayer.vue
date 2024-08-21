<script lang="tsx">
import { defineComponent, PropType } from "vue";
import L from "leaflet";
import { layerProps, layerEmits, layerSetup } from "../functions/layer";
import type { TileLayerOptions } from "leaflet";

interface Options extends TileLayerOptions {
	key?: string;
}

export default defineComponent({
	props: {
		url: {
			type: String,
			default: null
		},
		options: {
			type: Object as PropType<Options>
		},
		...layerProps
	},
	emits: {
		...layerEmits
	},
	inheritAttrs: false,
	setup(props, context) {
		const layer = L.tileLayer(props.url, { zIndex: props.zIndex, ...(props.options || {}) });
		layerSetup(props, context, { layer });
	}
});
</script>

<template>
	<slot></slot>
</template>
