<template>
  <div class="state" @click="chageState">
    <el-icon v-if="!isCollapse"><ArrowLeftBold /></el-icon>
    <el-icon v-else><ArrowRightBold /></el-icon>
  </div>
  <el-scrollbar height="calc(100vh - 60px)">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <Aside :menu="leftmenu" />
    </el-menu>
  </el-scrollbar>
  <!-- <div class="aside-box">
    <div class="state" @click="chageState">
      <el-icon v-if="!isCollapse"><ArrowLeftBold /></el-icon>
      <el-icon v-else><ArrowRightBold /></el-icon>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <MenuComp :menu="leftmenu" />
    </el-menu>
  </div> -->
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { leftmenu } from "@/router/menu";
import { useRoute } from "vue-router";

const route = useRoute();
const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const chageState = () => {
  isCollapse.value = !isCollapse.value;
};

const defaultActive = ref();
onMounted(() => {
  //当浏览器刷新的时候，为了使的 菜单和路由一致，对 activeIndex进行赋值
  let path = route.path;
  if (path.indexOf("/") == 0) {
    path = path.substring(1);
  }
  defaultActive.value = path;
  // const _index = menuList.findIndex((it) => path == it.name);
  // if (_index != -1 && _index != activeIndex.value) {
  //   activeIndex.value = _index;
  // }
});
</script>

<style scoped>
.state {
  position: absolute;
  cursor: pointer;
  top: 50%;
  right: -19px;
  transform: translate(0, -50%);
  width: 19px;
  height: 92px;
  border-radius: 0 20px 20px 0;
  background-color: #246fe3;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.el-menu-vertical-demo {
  height: calc(100vh - 60px);
}
/* .el-menu--popup {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
} */
</style>
