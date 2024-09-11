<template>
  <div ref="treeSelectRef" style="position: relative">
    <sw-button
      v-if="!isimg"
      :style="buttonStyle"
      @click="changeShowTree"
      type="primary"
      >{{ name }}</sw-button
    >
    <!-- <img
      v-else
      style="width: 38px; cursor: pointer"
      @click="changeShowTree"
      src="@/assets/icon/columns_select.png"
      alt=""
    /> -->
    <div
      v-if="isshow"
      ref="treeSelectRef"
      style="
        height: 30px;
        position: absolute;
        top: 80px;
        left: 0;
        z-index: 999;
        transform: scale(2);
      "
    >
      <div style="position: absolute; top: 0; left: 0" :style="treestyle">
        <el-tree
          ref="treeRef"
          style="max-width: 700px; min-width: 130px"
          :data="allColumns"
          show-checkbox
          default-expand-all
          node-key="title"
          :props="defaultProps"
          :default-checked-keys="defaultChecked"
          @check="checkChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  name: {
    type: String,
    default: "自定义列",
  },
  buttonStyle: {
    type: Object,
    default: () => {},
  },
  isimg: {
    type: Boolean,
    default: false,
  },
  treestyle: {
    type: Object,
    default: () => {},
  },
});
const emits = defineEmits<{
  (e: "update:columns"): void;
}>();
const columns = useVModel(props, "columns", emits);
const treeSelectRef = ref();
const treeRef = ref();
const isshow = ref<boolean>(false);
onClickOutside(treeSelectRef, (event) => {
  isshow.value = false;
});
const defaultProps = {
  children: "children",
  label: "title",
};
const defaultChecked = computed(() => {
  return columns.value
    .filter((item: any) => {
      return item.show;
    })
    .map((item: any) => {
      return item.title;
    });
});
const allColumns = ref([
  {
    id: 0,
    title: "所有列",
    type: "seq",
    children: columns.value,
  },
]);
const changeShowTree = () => {
  isshow.value = !isshow.value;
};
const checkChange = (n: any, a: any) => {
  columns.value.forEach((j: any) => {
    j.show = false;
  });
  a.checkedKeys.forEach((i: any) => {
    columns.value.forEach((j: any) => {
      if (i === j.title) {
        j.show = true;
      }
    });
  });
};
</script>
