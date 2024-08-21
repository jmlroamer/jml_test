<script lang="tsx">
import { defineComponent, inject, PropType } from "vue";
import L from "leaflet";
import { useVModel } from "@vueuse/core";
import { layerEmits } from "../functions/layer";
import { mapContextKey } from "../token";
import LGeojson from "../components/LGeojson.vue";
import type { Feature, MultiPolygon, MultiLineString, Polygon } from "geojson";

export default defineComponent({
	components: { LGeojson },
	props: {
		bounds: Object as PropType<Feature<MultiPolygon | MultiLineString | Polygon, any>>,
		fitBoundsOptions: Object as PropType<L.FitBoundsOptions>,
		// 高亮配置
		highlighOption: Object as PropType<L.PathOptions>,
		// 是否展示高亮
		visible: {
			type: Boolean,
			default: false
		},
		// 点击地图是否清除高亮
		outerClose: {
			type: Boolean,
			default: true
		}
	},
	emits: { ...layerEmits },
	setup(props, { emit }) {
		const { map } = inject(mapContextKey)!;
		if (!map) return;

		const visible = useVModel(props, "visible", emit);

		const style = Object.assign<L.PathOptions, L.PathOptions>(
			{
				stroke: true,
				color: "#dc1212",
				weight: 3,
				fillOpacity: 0.1,
				fillColor: "#1560d9"
			},
			props.highlighOption || {}
		);

		const geoJSONOptions: L.GeoJSONOptions = {
			onEachFeature: (_, layer) => {
				const bounds = (layer as L.Polyline).getBounds();
				map.flyToBounds(bounds, props.fitBoundsOptions);
				visible.value = true;
			},
			style
		};

		props.outerClose &&
			map.on("click", () => {
				visible.value = false;
			});

		return () => {
			const { bounds } = props;
			return <LGeojson geojson={bounds} visible={visible.value} options={geoJSONOptions} />;
		};
	}
});
</script>
