<template>
  <div class="container">
    <div class="vxebox">
      <vxe-table :data="tableData">
        <vxe-column
          v-for="(column, index) in columns"
          :title="column.title"
          :field="column.field"
          :width="column.width"
          :align="column.align"
          :key="index"
          :type="index === 0 ? 'seq' : ''"
        ></vxe-column>
      </vxe-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
const columns = ref([
  {
    field: "name",
    title: "序号",
    width: 120,
    align: "center",
  },
  {
    field: "name",
    title: "姓名",
    align: "center",
  },
  {
    field: "age",
    title: "年龄",
    align: "center",
  },
  {
    field: "sex",
    title: "性别",
    align: "center",
  },
]);
const tableData = ref<any[]>([
  {
    name: "张三",
    age: 18,
    sex: "男",
  },
  {
    name: "李四",
    age: 19,
    sex: "女",
  },
  {
    name: "王五",
    age: 20,
    sex: "男",
  },
  {
    name: "赵六",
    age: 21,
    sex: "女",
  },
]);
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .vxebox {
    width: 100%;
    height: 100%;
  }
}
</style>
