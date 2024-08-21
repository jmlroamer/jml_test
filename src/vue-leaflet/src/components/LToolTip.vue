<script lang="ts">
import {
	defineComponent,
	onBeforeUnmount,
	PropType,
	inject,
	onMounted,
	watchEffect,
	render
} from "vue";
import { layerKey } from "../token";
import { point } from "leaflet";
import type { Content, TooltipOptions, Point, Direction } from "leaflet";

export default defineComponent({
	props: {
		layer: Object,
		content: [String, Object] as PropType<Content>,
		pane: String,
		direction: {
			type: String as PropType<Direction>,
			default: "top"
		},
		permanent: Boolean,
		offset: {
			type: [Object, Array] as PropType<Point | number[]>,
			default: () => point(0, 0)
		},
		options: {
			type: Object as PropType<TooltipOptions>
		}
	},
	setup(props, { slots }) {
		const layer = inject(layerKey, props.layer);

		let container: HTMLElement;

		onMounted(() => {
			if (!layer) return;
			const { options = {}, content, direction, permanent, offset } = props;

			watchEffect(() => {
				container && render(null, container);
				container = document.createElement("div");
				const vNodes = slots?.default?.();
				vNodes && render(vNodes[0], container);
			});

			layer.bindTooltip(content || (container.firstChild as HTMLElement), {
				direction,
				permanent,
				offset,
				...options
			} as TooltipOptions);
		});

		onBeforeUnmount(() => {
			container && render(null, container);
		});

		return () => null;
	}
});
</script>
