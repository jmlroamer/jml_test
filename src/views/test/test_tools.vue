<template>
  <div class="box-container">
    <el-input v-model="input" style="width: 240px" placeholder="Please input" />
    <div v-hover class="box-test">
      <div>测试</div>
      <div><a class="header-anchor" href="#">#</a></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const input = ref("测试");
const vFocus = {
  mounted: (el: any, binding: any, vnode: any) => {
    console.log(el);
    console.log(binding);
    console.log(vnode);
    // el.value = input;
    el.focus();
  },
};
const tests = ref(false);
const vHover = {
  mounted: (el: any, binding: any, vnode: any) => {
    const div = el.getElementsByClassName("header-anchor")[0];
    console.log(div);
    console.log(div.style.margin);

    el.addEventListener("mouseover", () => {
      // tests.value = true;
      div.style.display = "";
    });
    el.addEventListener("mouseleave", () => {
      // tests.value = false;
      div.style.display = "none";
    });
  },
};
</script>

<style scoped>
a {
  margin: 0;
  padding: 0;
}
.box-container {
  padding: 15px 20px;
  .box-test {
    /* width: 100px;
    height: 100px; */
    /* background-color: pink; */
    font-size: 20px;
    height: 32px;
    line-height: 32px;
    position: relative;
    display: flex;
    .header-anchor {
      position: absolute;
      top: 0;
      left: -15px;
    }
  }
}
</style>
