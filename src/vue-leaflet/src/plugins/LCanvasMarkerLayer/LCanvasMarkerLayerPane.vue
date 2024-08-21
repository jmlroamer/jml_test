<script lang="tsx">
import { defineComponent, toRef, inject, Text, PropType, watch, onBeforeUnmount } from "vue";
import L from "leaflet";
import { isFunction, hasOwn } from "@vue/shared";
import { renderToElement } from "../../utils";
import { canvasMarkerLayerKey, mapContextKey } from "../../token";

export default defineComponent({
	inheritAttrs: false,
	props: {
		// 需要展示的数据
		data: { type: Array, required: true, default: () => [] },
		// 图层是否可见
		visible: { type: Boolean, default: true },
		// 是否显示文本
		showLabel: { type: Boolean, default: false },
		options: { type: Object as PropType<L.CanvasIconOptions> },
		marker: {
			type: [Object, Function] as PropType<L.Marker | ((row: any) => L.Marker)>,
			required: true
		}
	},
	setup(props, { attrs, slots }) {
		const context = inject(canvasMarkerLayerKey);

		if (!context) {
			console.warn("请保证LCanvasMarkerLayerPane组件在LCanvasMarkerLayer中渲染");
			return () => null;
		}

		const visible = toRef(props, "visible");

		const { canvasIconLayer, redraw } = context;

		const mapContext = inject(mapContextKey)!;

		const getMarker = isFunction(props.marker)
			? props.marker
			: ((() => props.marker) as (row: any) => L.Marker);

		const hasToolTip = hasOwn(slots, "tooltip");
		const hasPupop = hasOwn(slots, "popup");

		const hoverListener: L.CanvasMarkerListenerCallback = (_, datas) => {
			for (const { data } of datas) {
				if (hasToolTip && !hasOwn(data, "_tooltip")) {
					const vNode = slots.tooltip!({ row: (data as any)._params, mapContext })[0];
					const el = renderToElement(vNode);
					data.bindTooltip(el, vNode.props as L.TooltipOptions);
				}
				if (hasPupop && !hasOwn(data, "_popup")) {
					const vNode = slots.popup!({ row: (data as any)._params, mapContext })[0];
					const el = renderToElement(vNode);
					data.bindPopup(el, vNode.props as L.PopupOptions);
				}
			}
		};

		const clickListener: L.CanvasMarkerListenerCallback = (e, data) => {
			data = data.map(({ data }) => (data as any)._params);
			(attrs as any).onClick(data, e);
		};

		// 有tooltip或popup监听hover事件
		(hasToolTip || hasPupop) && canvasIconLayer.addOnHoverListener(hoverListener);

		// 注册点击事件
		hasOwn(attrs, "onClick") && canvasIconLayer.addOnClickListener(clickListener);

		/** 获取label */
		const getLabel = (item: any) => {
			if (!hasOwn(slots, "label")) return;
			const labelVNode = slots.label!(item)[0];
			if (labelVNode.type === Text) {
				const label = labelVNode.children;
				return label;
			}
		};

		/** 设置属性 */
		const setMarkerProperty = (marker: L.Marker, key: string, value: any) => {
			(marker as any)[key] = value;
		};

		let markers: L.Marker[] = [];
		/** 添加marker */
		const addMarker = (data: any[]) => {
			if (!data.length) return [];
			const markers: L.Marker[] = [];
			let marker: L.Marker;
			for (const item of data) {
				marker = getMarker(item);
				const label = getLabel(item);
				// 设置属性
				label != null && setMarkerProperty(marker, "_label", label);
				setMarkerProperty(marker, "_showLabel", props.showLabel);
				setMarkerProperty(marker, "_params", item);
				markers.push(marker);
			}
			markers.length > 0 && canvasIconLayer.addMarkers(markers);
			return markers;
		};

		/** 删除marker */
		const removeMarkers = (markers: L.Marker[]) => {
			for (const marker of markers) {
				canvasIconLayer.removeMarker(marker, false);
			}
			redraw();
		};

		watch(
			() => props.showLabel,
			(val) => {
				for (const marker of markers) {
					setMarkerProperty(marker, "_showLabel", val);
					redraw();
				}
			}
		);

		watch(
			[() => props.data, visible],
			([data, visible]) => {
				if (visible) {
					removeMarkers(markers);
					markers = addMarker(data);
				} else if (canvasIconLayer._markers) {
					removeMarkers(markers);
				}
			},
			{ immediate: true }
		);

		onBeforeUnmount(() => {
			canvasIconLayer.removeOnClickListener(clickListener);
			canvasIconLayer.removeOnHoverListener(hoverListener);
			removeMarkers(markers);
			markers.length = 0;
		});

		return () => null;
	}
});
</script>
