import { InjectionKey } from "vue";
import L from "leaflet";

export type MapContext = {
	map?: L.Map;
};

export type LayerMethods = {
	addLayer: <T extends L.Layer>(layer: T) => void;
	removeLayer: <T extends L.Layer>(layer: T) => void;
	setVisible: <T extends L.Layer>(layer: T, visible: boolean) => void;
};

export type CanvasMarkerLayerContext = {
	canvasIconLayer: L.CanvasIconLayer;
	redraw: () => void;
};

export const mapContextKey: InjectionKey<MapContext> = Symbol();

export const layerMethodsKey: InjectionKey<LayerMethods> = Symbol();

export const layerKey: InjectionKey<L.Layer> = Symbol();

export const canvasMarkerLayerKey: InjectionKey<CanvasMarkerLayerContext> = Symbol();
