<script lang="ts">
import { defineComponent, PropType } from "vue";
import { tiledMapLayer, type TiledMapLayerOptions } from "esri-leaflet";
import { layerProps, layerEmits, layerSetup } from "../../functions/layer";

export default defineComponent({
	props: {
		url: {
			type: String,
			default: null
		},
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
		const layer = tiledMapLayer({ url: props.url, zIndex: props.zIndex, ...(props.options || {}) });
		layerSetup(props, context, { layer });
	}
});
</script>

<template>
	<slot></slot>
</template>
