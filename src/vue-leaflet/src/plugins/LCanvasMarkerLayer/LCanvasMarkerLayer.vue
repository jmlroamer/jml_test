<template>
	<slot></slot>
</template>

<script lang="ts">
import { defineComponent, inject, onBeforeUnmount, PropType, provide } from "vue";
import L from "leaflet";
import { hasOwn } from "@vue/shared";
import { mapContextKey, type MapContext, canvasMarkerLayerKey } from "../../token";
import { createSchedule } from "../../utils";

export default defineComponent({
	inheritAttrs: false,
	props: {
		options: { type: Object as PropType<L.CanvasIconOptions> }
	},
	setup(props, { attrs }) {
		const { map } = inject(mapContextKey, {} as MapContext);
		if (!map) {
			console.warn("请保证LCanvasMarkerLayer组件在LMap中渲染");
			return () => null;
		}

		const canvasIconLayer = L.canvasIconLayer(props.options).addTo(map);

		// 重绘函数，在同步操作期间内只会执行一次
		const redraw = createSchedule(() => canvasIconLayer.redraw());

		provide(canvasMarkerLayerKey, { canvasIconLayer, redraw });

		// 判断注册点击事件
		hasOwn(attrs, "onClick") &&
			canvasIconLayer.addOnClickListener(function (e: L.LeafletMouseEvent, data: unknown[]) {
				data = data.map(({ data }: any) => data._params);
				(attrs as any).onClick(data, e);
			});

		onBeforeUnmount(() => {
			canvasIconLayer.clearLayers();
			redraw.stop();
		});
	}
});
</script>
