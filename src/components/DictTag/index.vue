<template>
  <div>
    <template v-for="(item, index) in options">
      <template v-if="values.includes(item.value)">
        <span
          v-if="
            (item.elTagType == 'default' || item.elTagType == '') &&
            (item.elTagClass == '' || item.elTagClass == null)
          "
          :key="item.value"
          :index="index"
          :class="item.elTagClass"
          >{{ item.label + " " }}</span
        >
        <el-tag
          v-else
          :disable-transitions="true"
          :key="item.value + ''"
          :index="index"
          :type="item.elTagType === 'primary' ? '' : item.elTagType"
          :class="item.elTagClass"
          >{{ item.label + " " }}</el-tag
        >
      </template>
      <template v-else-if="values.includes(item.label)">
        <span
          v-if="
            (item.elTagType == 'default' || item.elTagType == '') &&
            (item.elTagClass == '' || item.elTagClass == null)
          "
          :key="item.value"
          :index="index"
          :class="item.elTagClass"
          >{{ item.value + " " }}</span
        >
        <el-tag
          v-else
          :disable-transitions="true"
          :key="item.value + ''"
          :index="index"
          :type="item.elTagType === 'primary' ? '' : item.elTagType"
          :class="item.elTagClass"
          >{{ item.value + " " }}</el-tag
        >
      </template>
    </template>
    <template v-if="unmatch && showValue">
      {{ unmatchArray | (handleArray as any) }}
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
// 记录未匹配的项
const unmatchArray: any = ref([]);

type Props = {
  options?: any;
  value?: any;
  showValue?: any;
  separator?: any;
};
const props = withDefaults(defineProps<Props>(), {
  options: [
    {
      value: "",
      label: "",
      elTagType: "",
      elTagClass: "",
    },
  ],
  value: "",
  showValue: true,
  separator: ",",
});

const values = computed(() => {
  if (
    props.value === null ||
    typeof props.value === "undefined" ||
    props.value === ""
  )
    return [];
  return Array.isArray(props.value)
    ? props.value.map((item) => "" + item)
    : String(props.value).split(props.separator);
});

console.log(values);

const unmatch = computed(() => {
  unmatchArray.value = [];
  // 没有value不显示
  if (
    props.value === null ||
    typeof props.value === "undefined" ||
    props.value === "" ||
    props.options.length === 0
  )
    return false;
  // 传入值为数组
  let unmatch = false; // 添加一个标志来判断是否有未匹配项
  values.value.forEach((item) => {
    if (
      !props.options.some((v: any) => v.value === item) &&
      !props.options.some((v: any) => v.label === item)
    ) {
      unmatchArray.value.push(item);
      unmatch = true; // 如果有未匹配项，将标志设置为true
    }
  });
  return unmatch; // 返回标志的值
});

function handleArray(array: any): any {
  if (array.length === 0) return "";
  return array.reduce((pre: any, cur: any) => {
    return pre + " " + cur;
  });
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
