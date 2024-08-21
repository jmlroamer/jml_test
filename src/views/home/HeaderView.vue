<template>
  <div class="logoinfo">
    <div class="logoimg">
      <el-image style="width: 28px; height: 28px" :src="logo" />
    </div>
    <div>JML系统</div>
  </div>
</template>
<script setup lang="ts">
import logo from "@/assets/images/logo38.png";
</script>
<style lang="scss" scoped>
.logoinfo {
  display: flex;
  margin-left: 10px;
  height: 60px;
  line-height: 60px;
  font-size: 24px;
  color: #fff;
  .logoimg {
    margin: 6px 10px 0 0;
  }
}
</style>
