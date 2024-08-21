<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <TopHeader />
      </el-header>
      <el-container>
        <el-aside><AsideMenu /> </el-aside>
        <el-main>
          <!-- <el-scrollbar height="calc(100vh - 60px)">
            <TopTaps></TopTaps>
            <router-view v-slot="{ Component }">
              <transition name="fade">
                <keep-alive :include="keepAlives">
                  <component
                    :is="Component"
                    :key="$route.path"
                    v-if="isRefresh"
                  />
                </keep-alive>
              </transition>
            </router-view>
          </el-scrollbar> -->
          <el-scrollbar
            wrap-style="z-index: 10000;"
            height="calc(100vh - 60px)"
          >
            <RouterView></RouterView
          ></el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import TopHeader from "./HeaderView.vue";
import AsideMenu from "./AsideView.vue";
</script>
<style lang="scss" scoped>
.common-layout {
  width: 100vw;
  height: 100vh;
}
.el-header {
  box-sizing: border-box;
  background-color: #3377ff;
  z-index: 99;
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
}
.el-aside {
  position: relative;
  overflow: initial !important;
  width: auto;
  height: calc(100vh - 60px);
  border-right: 1px solid #979797;
  box-shadow: 1px 0 6px 2px #888888;
}
.el-main {
  position: relative;
  width: 1580px;
  height: calc(100vh - 60px);
  padding: 0;
  background-color: #fff;
  :deep(.el-scrollbar__view) {
    height: 100%;
  }
}
</style>
