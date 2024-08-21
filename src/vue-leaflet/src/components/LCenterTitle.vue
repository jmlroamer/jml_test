<template>
	<LMarker :lat-lng="latlng" v-if="latlng">
		<LIcon :options="{ className: 'center-title-icon' }">
			<div class="title" :style="titleStyle">
				<slot></slot>
			</div>
		</LIcon>
	</LMarker>
</template>

<script lang="ts" setup>
import { inject, ref, type StyleValue } from "vue";
import L from "leaflet";
import { layerKey } from "../token";
import LMarker from "./LMarker.vue";
import LIcon from "./LIcon.vue";

defineProps<{ titleStyle?: StyleValue }>();

const layer = inject(layerKey);

const latlng = ref<L.LatLng>();

if (layer && typeof (layer as any).getCenter === "function") {
	latlng.value = (layer as L.Polygon).getCenter();
} else if (layer instanceof L.GeoJSON) {
	latlng.value = layer.getBounds().getCenter();
}
</script>

<style scoped>
.center-title-icon {
	position: relative;
}
.title {
	white-space: nowrap;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	line-height: initial;
}
</style>
