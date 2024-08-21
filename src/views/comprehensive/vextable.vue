<template>
  <div class="container">
    <div class="vxebox">
      <vxe-table :data="tableData">
        <vxe-column
          v-for="(column, index) in columns"
          :title="column.title"
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
// import { VxeTable, VxeColumn } from "vxe-table";
const res = ref(1);
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
    width: 120,
    align: "center",
  },
  {
    field: "age",
    title: "年龄",
    width: 120,
    align: "center",
  },
  {
    field: "sex",
    title: "性别",
    width: 120,
    align: "center",
  },
]);
const tableData = ref<any[]>([
  {
    id: 10001,
    name: "Test1",
    role: "Develop",
    sex: "Man",
    age: 28,
    address: "test abc",
  },
  {
    id: 10002,
    name: "Test2",
    role: "Test",
    sex: "Women",
    age: 22,
    address: "Guangzhou",
  },
  {
    id: 10003,
    name: "Test3",
    role: "PM",
    sex: "Man",
    age: 32,
    address: "Shanghai",
  },
  {
    id: 10004,
    name: "Test4",
    role: "Designer",
    sex: "Women",
    age: 24,
    address: "Shanghai",
  },
]);
const option = ref({
  title: {
    text: "ECharts 入门示例",
  },
  tooltip: {},
  legend: {
    data: ["销量"],
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
});
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
