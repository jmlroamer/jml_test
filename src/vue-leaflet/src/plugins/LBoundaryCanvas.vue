<script lang="tsx">
import { defineComponent, onMounted, inject } from "vue";
import L from "leaflet";
import { layerProps, layerEmits, layerSetup } from "../functions/layer";
import { layerKey } from "../token";

export default defineComponent({
	props: {
		boundary: Object,
		...layerProps
	},
	emits: { ...layerEmits },
	setup(props, context) {
		const layer = inject(layerKey);

		onMounted(() => {
			if (!(L.TileLayer as any).BoundaryCanvas) return;
			const { boundary } = props;
			const tileLayer = (L.TileLayer as any).BoundaryCanvas.createFromLayer(layer, {
				boundary
			});
			layerSetup(props, context, { layer: tileLayer });
		});

		return () => null;
	}
});
</script>
