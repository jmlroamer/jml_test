<script lang="ts">
import {
	defineComponent,
	PropType,
	inject,
	onMounted,
	onBeforeUnmount,
	render,
	watchEffect
} from "vue";
import { layerKey } from "../token";
import { point } from "leaflet";
import type { Content, PopupOptions, Point } from "leaflet";

export default defineComponent({
	inheritAttrs: false,
	props: {
		content: [String, Object] as PropType<Content>,
		offset: {
			type: [Object, Array] as PropType<Point | number[]>,
			default: () => point(0, 7)
		},
		closeButton: { type: Boolean, default: true },
		options: {
			type: Object as PropType<PopupOptions>
		}
	},
	setup(props, { slots }) {
		const layer = inject(layerKey);

		let container: HTMLElement;

		onMounted(() => {
			if (!layer) return;
			const { options = {}, content, offset, closeButton } = props;

			watchEffect(() => {
				container && render(null, container);
				container = document.createElement("div");
				const vNodes = slots?.default?.();
				vNodes && render(vNodes[0], container);
			});

			layer.bindPopup(content || (container.firstChild as HTMLElement), {
				offset,
				closeButton,
				...options
			} as PopupOptions);
		});

		onBeforeUnmount(() => {
			layer && layer.unbindPopup();
			render(null, container);
		});

		return () => null;
	}
});
</script>
