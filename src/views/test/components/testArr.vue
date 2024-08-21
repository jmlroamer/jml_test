<template>
  <div class="box-container">
    <div class="btn" v-bind="$attrs">测试按钮</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
</script>

<style scoped>
.box-container {
  width: 500px;
  height: 500px;
  .btn {
    width: 100px;
    height: 100px;
    background-color: #10c1e0;
  }
}
</style>
