import { watch, PropType, inject, provide } from "vue";
import L from "leaflet";
import { layerProps, layerEmits, layerSetup, type SetUp } from "./layer";
import { layerMethodsKey } from "../token";

export const layerGroupProps = {
	...layerProps,
	layers: Array as PropType<L.Layer[]>
};

export const layerGroupSetup: SetUp<typeof layerGroupProps, typeof layerEmits> = (
	props,
	context,
	params
) => {
	const layerGroup = params.layer as L.LayerGroup;

	const layerMethods = inject(layerMethodsKey)!;

	const groupMethods = {
		addLayer<T extends L.Layer>(layer: T) {
			layerGroup.addLayer(layer);
		},
		removeLayer<T extends L.Layer>(layer: T) {
			layerGroup.removeLayer(layer);
		}
	};

	watch(
		() => props.layers,
		(val) => {
			if (!val) return;
			layerGroup.clearLayers();
			Array.isArray(val)
				? val.forEach((layer) => layerGroup.addLayer(layer))
				: layerGroup.addLayer(val);
		}
	);

	provide(layerMethodsKey, { ...layerMethods, ...groupMethods });

	return layerSetup(props, context, params);
};

export { layerEmits as layerGroupEmits };
