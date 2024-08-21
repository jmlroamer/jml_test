<template>
  <div class="container">
    <div class="chartbox">
      <ZEcharts :option="option" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { dayjs } from "element-plus";
import { res } from "./data";
import { getOption } from "./options";
const option = shallowRef({});
const getData = () => {
  let data: any = {};
  if (res.ret === 0) {
    let dataTime: any[] = [];
    let shuiweiList: number[] = []; //水位
    let pjLiuSuList: number[] = []; //平均流速
    let ssLiuLiangList: number[] = []; //瞬时流量
    let phLiuLangList: number[] = []; //平滑流量

    let liuliangNotNullArr = []; //流量，那个时间点有流量记录，记录起来索引位置

    res.data.result.forEach((item: any, index) => {
      if (item.Q != null) {
        liuliangNotNullArr.push(item);
      }
      shuiweiList.push(item.z); //水位
      pjLiuSuList.push(item.vel_calc); //平均流速
      ssLiuLiangList.push(item.q); //瞬时流量
      phLiuLangList.push(item.q_smooth); //平滑流量
      dataTime.push(dayjs(item.tm).format("MM-DD hh:mm"));
    });
    data.xAxisData = dataTime;
    data.yAxisDataZ = shuiweiList;
    data.yAxisDataS = ssLiuLiangList;
    data.yAxisDataP = phLiuLangList;
    data.yAxisDataPJ = pjLiuSuList;
  }
  option.value = getOption(data);
};
onMounted(() => {
  getData();
});
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .chartbox {
    width: 100%;
    height: 100%;
  }
}
</style>
