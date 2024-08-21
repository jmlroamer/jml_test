<template>
  <template v-for="item in menu" :key="item.id">
    <el-menu-item v-if="!('children' in item)" :index="item.path">
      <el-icon>
        <component :is="item.icon"></component>
      </el-icon>
      <template #title>{{ item.label }}</template>
    </el-menu-item>
    <template v-else>
      <el-sub-menu :index="item.id">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <!-- <el-icon><location /></el-icon> -->
          <span>{{ item.label }}</span>
        </template>
        <div v-for="subItem in item.children" :key="subItem.id">
          <el-menu-item v-if="!('children' in subItem)" :index="subItem.path">
            <el-icon>
              <component
                :is="subItem.icon == '' ? null : subItem.icon"
              ></component>
            </el-icon>
            {{ subItem.label }}
          </el-menu-item>
          <Aside v-else :menu="[subItem]"></Aside>
        </div>
      </el-sub-menu>
    </template>
  </template>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
type Props = {
  menu?: any;
};
withDefaults(defineProps<Props>(), {
  menu: [],
});
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: "calc(100vh - 60px)";
}
.el-menu-scroll {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
