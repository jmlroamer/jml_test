<template>
	<div class="l-map-control">
		<slot name="layer" v-if="current">
			<LTileLayer :url="current.url" :options="current.options" :key="current.url" />
		</slot>
		<TransitionGroup
			name="list"
			tag="ul"
			@mouseenter="isSpread = true"
			@mouseleave="isSpread = false"
		>
			<li
				v-for="item of isSpread ? list : list.slice(-1)"
				:key="item.url"
				class="control-item cp"
				@click="handleClick(item)"
			>
				<slot :row="item">
					<img v-if="item.icon" class="img" :src="item.icon" alt="" />
					<span class="lable">{{ item.label }}</span>
				</slot>
			</li>
		</TransitionGroup>
	</div>
</template>

<script lang="ts" setup>
import { ref, shallowReactive, watch } from "vue";
import { useVModel } from "@vueuse/core";
import LTileLayer from "./LTileLayer.vue";

type MapControlRaw = {
	url: string;
	icon?: string;
	type?: "tile" | "wmts";
	options?: Record<string, any>;
	label?: string;
};

const props = defineProps<{ data: MapControlRaw[]; modelValue?: MapControlRaw }>();
const emits = defineEmits<{
	(e: "change", val: MapControlRaw): void;
	(e: "update:modelValue", val: MapControlRaw): void;
}>();

const current = useVModel(props, "modelValue", emits, { defaultValue: props.data.slice(-1)[0] });

const isSpread = ref(false);

const list = shallowReactive<MapControlRaw[]>([]);

const sortData = (row: MapControlRaw) => {
	const len = list.length;
	const index = list.indexOf(row);
	list[index] = list[len - 1];
	list[len - 1] = row;
};

watch(
	() => props.data,
	() => {
		Object.assign(list, props.data);
		current.value && sortData(current.value);
	},
	{ immediate: true }
);

const handleClick = (row: MapControlRaw) => {
	if (!current.value || current.value.url !== row.url) {
		current.value = row;
		emits("change", row);
		sortData(row);
	}
};
</script>

<style lang="scss" scoped>
.l-map-control {
	position: absolute;
	top: 10px;
	right: 10px;
	z-index: 999;
	overflow: hidden;
	.control-item {
		position: relative;
		display: inline-block;
		width: 70px;
		height: 64px;
		border: 1px solid blue;
		&:hover {
			border: 1px solid #c12c1f;
		}
		&:nth-child(n + 2) {
			margin-left: 4px;
		}
	}
	.img {
		width: 100%;
		height: 100%;
	}
	.lable {
		position: absolute;
		bottom: 0;
		left: 0;
		padding: 4px;
		font-size: 12px;
		text-align: center;
		color: #fff;
		background: #3385ff;
		border-radius: 5px 5px 0 0;
	}
}
/* 对移动中的元素应用的过渡 */
.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
.list-leave-active {
	position: absolute;
}
</style>
