import L from "leaflet";

declare module "leaflet" {
	interface CanvasLabelStyle {
		fontSize?: number;
		fontColor?: string;
		strokeStyle?: string;
	}

	interface CanvasIconOptions {
		zIndex?: number;
		labelStyle?: CanvasLabelStyle;
		enableText?: boolean;
	}

	type CanvasMarkerListenerCallback = (e: L.LeafletMouseEvent, datas: { data: L.Marker }[]) => void;

	function canvasIconLayer(option?: CanvasIconOptions): CanvasIconLayer;

	class CanvasIconLayer extends L.Layer {
		constructor(option?: CanvasIconOptions);
		/**
		 * 重绘图层
		 */
		redraw(): void;
		/**
		 * 批量将marker添加到图层中
		 * @param markers
		 */
		addMarkers(markers: L.Marker[]): void;
		/**
		 * 将单个marker添加到图层中
		 * @param markers
		 */
		addMarker(marker: L.Marker): void;
		/**
		 * addMarkers的别名
		 * @param marker
		 */
		addLayers(marker: L.Marker[]): void;
		/**
		 * removeMarker的别名，redraw参数为true
		 * @param marker
		 */
		removeLayer(marker: L.Marker): void;
		/**
		 * 移除单个marker
		 * @param marker
		 * @param redraw 是否重绘图层，为true则会调用redraw
		 */
		removeMarker(marker: L.Marker, redraw: boolean): void;
		/**
		 * 清空图层
		 */
		clearLayers(): void;
		/**
		 * 添加图层的自定义的画圈圈
		 * @param listener
		 */
		addDrawCircleListener(listener: CanvasMarkerListenerCallback): void;
		/**
		 * 添加图层的点击事件
		 * @param listener
		 */
		addOnClickListener(listener: CanvasMarkerListenerCallback): void;
		/**
		 * 添加图层的hover事件
		 * @param listener
		 */
		addOnHoverListener(listener: CanvasMarkerListenerCallback): void;
		/**
		 * 移除图层的点击事件
		 * @param listener
		 */
		removeOnClickListener(listener: CanvasMarkerListenerCallback): void;
		/**
		 * 移除图层的hover事件
		 * @param listener
		 */
		removeOnHoverListener(listener: CanvasMarkerListenerCallback): void;
		[key: string]: any;
	}
}
