<template>
  <div class="box-container">
    <div class="read-box">
      <div class="toread">
        <p>{{ toinput }}</p>
      </div>
      <div class="toinput">
        <el-input
          v-model="toinput"
          style="width: 100%; height: calc(100vh - 104px)"
          :autosize="{ minRows: 37, maxRows: 50 }"
          type="textarea"
          placeholder="Please input"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const toinput = ref("");
const vFocus = {
  mounted: (el: any, binding: any, vnode: any) => {
    el.focus();
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
  .read-box {
    display: flex;
    padding: 7px;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: calc(100vh - 90px);
    /* background-color: red; */
    border-radius: 5px;
    box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1),
      -2px -2px 10px 2px rgba(0, 0, 0, 0.1);
    > div {
      height: 100%;
      width: 50%;
    }
    .toinput {
      width: 50%;
    }
  }
}
</style>
