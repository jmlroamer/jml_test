<template>
	<slot></slot>
</template>
<script setup lang="ts">
import { inject, provide } from "vue";
import { mapContextKey, mapPaneKey } from "../token";

const props = defineProps({
	name: { type: String, required: true },
	zIndex: { type: Number, default: 400 }
});

const context = inject(mapContextKey);

provide(mapPaneKey, props.name);

const map = context!.map!;
const el = map.createPane(props.name);
el.style.zIndex = props.zIndex + "";
</script>

<style lang="scss" scoped></style>
