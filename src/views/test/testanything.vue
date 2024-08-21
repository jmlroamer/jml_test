<template>
  <div
    v-element-hover="onHover"
    style="width: 60px; height: 60px; background-color: aqua"
  >
    {{ s }}
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const s = ref(0);
const onHover = (e: MouseEvent) => {
  console.log(e);
  s.value++;
};
</script>
