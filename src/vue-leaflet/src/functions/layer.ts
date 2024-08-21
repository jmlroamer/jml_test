import { inject, watch, toRef, provide, onBeforeUnmount, Ref } from "vue";
import L from "leaflet";
import { layerMethodsKey, layerKey } from "../token";
import { remapEvents, propsBinder } from "../utils";
import type { SetupContext, ExtractPropTypes } from "vue";

export type LayerEmites = {
	"update:visible": (value: boolean) => void;
};

export const layerProps = {
	visible: {
		type: Boolean,
		default: true
	},
	pane: {
		type: String,
		default: "overlayPane"
	},
	attribution: {
		type: String,
		default: null
	},
	zIndex: Number
} as const;

export const layerEmits = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	"update:visible"(visible: boolean) {
		return true;
	}
};

export type SetUp<P, E> = (
	props: Readonly<ExtractPropTypes<P>>,
	ctx: SetupContext<E>,
	params: { layer: L.Layer; autoWatch?: boolean }
) => { visible: Ref<boolean> };

export const layerSetup: SetUp<typeof layerProps, typeof layerEmits> = (props, context, params) => {
	const { layer, autoWatch = true } = params;

	const methods = inject(layerMethodsKey)!;

	const visible = toRef(props, "visible");

	provide(layerKey, layer);

	L.DomEvent.on(layer as any, remapEvents(context.attrs));

	if (autoWatch) {
		propsBinder({}, layer, props);
		watch(visible, (val) => {
			methods.setVisible(layer, val);
			context.emit("update:visible", val);
		});
	}

	visible.value && methods.setVisible(layer, true);

	onBeforeUnmount(() => {
		methods.removeLayer(layer);
	});

	return { visible };
};
