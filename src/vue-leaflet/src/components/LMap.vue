<script lang="ts">
export default { inheritAttrs: false };
</script>
<script lang="ts" setup>
import {
	markRaw,
	nextTick,
	onBeforeUnmount,
	onMounted,
	provide,
	ref,
	shallowRef,
	useAttrs
} from "vue";
import L from "leaflet";
import { useResizeObserver } from "@vueuse/core";
import { remapEvents, propsBinder } from "../utils";
import { mapContextKey, layerMethodsKey, type MapContext } from "../token";

interface Props {
	crs?: L.CRS;
	center?: L.LatLngTuple;
	options?: L.MapOptions;
	zIndex?: number;
	zoom?: number;
	autoResize?: boolean;
}
interface Emits {
	(name: "ready", e: L.Map): void;
	(name: "resizeing", e: L.Map): void;
	(name: "update:zoom", e: number): void;
	(name: "zoomend", e: L.LeafletEvent): void;
	(name: "zoom", e: L.LeafletEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
	crs: () => L.CRS.EPSG3857,
	zIndex: 1,
	autoResize: true
});
const emits = defineEmits<Emits>();
const attrs = useAttrs();

const rootEl = shallowRef<HTMLElement>();
const ready = ref(false);

const context: MapContext = {};

// resetWebpackIcon(L.Icon, iconDefault);

const methods = {
	addLayer<T extends L.Layer>(layer: T) {
		const { map } = context || {};
		map && map.addLayer(layer);
	},
	removeLayer<T extends L.Layer>(layer: T) {
		const { map } = context || {};
		map && map.removeLayer(layer);
	},
	setVisible<T extends L.Layer>(layer: T, visible: boolean) {
		const { map } = context || {};
		if (map) {
			visible ? this.addLayer(layer) : this.removeLayer(layer);
		}
	}
};

provide(mapContextKey, context);
provide(layerMethodsKey, methods);

const zoomend = (e: L.LeafletEvent) => {
	emits("update:zoom", (e.sourceTarget as L.Map).getZoom());
	emits("zoomend", e);
};
// eslint-disable-next-line vue/no-dupe-keys
const zoom = (e: L.LeafletEvent) => {
	emits("zoom", e);
};

async function mounted() {
	const mapOptions: L.MapOptions = { crs: props.crs, center: props.center, ...props.options };
	if (props.zoom) {
		mapOptions.zoom = props.zoom;
	}
	const map: L.Map = (context.map = markRaw(L.map(rootEl.value as HTMLElement, mapOptions)));

	propsBinder(
		{
			setCenter() {
				props.center && map.setView(props.center, props.zoom, { animate: false });
			}
		},
		context.map as L.Map,
		props
	);
	L.DomEvent.on(context.map as any, remapEvents(attrs));

	await nextTick();

	ready.value = true;

	emits("ready", map);

	map.on("zoomend", zoomend);
	map.on("zoom", zoom);

	props.autoResize &&
		useResizeObserver(rootEl, (entries) => {
			const { map } = context;
			if (map) {
				const entry = entries[0];
				const { width, height } = entry.contentRect;
				if (width && height) {
					emits("resizeing", map.invalidateSize(true));
				}
			}
		});
}

onMounted(mounted);

onBeforeUnmount(() => {
	const { map } = context;
	map && map.remove();
});

defineExpose(context);
</script>

<template>
	<div ref="rootEl" style="width: 100%; height: 100%" :style="{ zIndex: zIndex }" v-bind="$attrs">
		<template v-if="ready">
			<slot></slot>
		</template>
	</div>
</template>
