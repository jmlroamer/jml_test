<script lang="ts">
import { defineComponent } from "vue";
import L from "leaflet";
import { layerGroupEmits, layerGroupSetup, layerGroupProps } from "../functions/layerGroup";

export default defineComponent({
	props: layerGroupProps,
	emits: layerGroupEmits,
	inheritAttrs: false,
	setup(props, context) {
		const layerGroup = L.layerGroup(props.layers, {
			pane: props.pane,
			attribution: props.attribution
		});

		layerGroupSetup(props, context, { layer: layerGroup });
	}
});
</script>

<template>
	<slot></slot>
</template>
