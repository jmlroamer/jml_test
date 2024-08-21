<template>
	<LLayerGroup v-model:visible="visible" :layers="layers">
		<slot></slot>
	</LLayerGroup>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from "vue";
import { mapContextKey } from "../token";
import LLayerGroup from "../components/LLayerGroup.vue";
import type { Layer, Map } from "leaflet";

interface Props {
	max?: number;
	min?: number;
	layers?: Layer[];
}

const props = withDefaults(defineProps<Props>(), { max: Infinity, min: -Infinity });

const context = inject(mapContextKey)!;

const visible = ref(false);

function zoomend(this: Map) {
	const { min, max } = props;
	const zoom = this.getZoom();
	visible.value = zoom <= max && zoom >= min;
}

onMounted(() => {
	if (!context.map) return;
	context.map.on("zoomend", zoomend);
	zoomend.call(context.map);
});
</script>

<style lang="scss" scoped></style>
