<template>
  <div class="chart-box" style="width: 100%" ref="chartEl"></div>
</template>

<script lang="ts" setup>
import {
  onBeforeUnmount,
  onMounted,
  shallowRef,
  useAttrs,
  watch,
  watchEffect,
} from "vue";
import * as echarts from "echarts/core";
import { hasOwn, isFunction } from "@vue/shared";
// import "echarts-liquidfill";
// import "echarts-gl";
import { toRefs, useResizeObserver } from "@vueuse/core";

// type ECOptions = echarts.EChartsCoreOption;

interface Props {
  option: ECOptions;
  // 图表在组件根元素尺寸变化时是否需要自动进行重绘。
  autoresize?: boolean;
  // 主题
  theme?: string | Record<string, unknown>;
  // 图表更新的配置项
  updateOptions?: echarts.SetOptionOpts;
  // 是否手动执行setOption
  manual?: boolean;
  // loading
  loading?: boolean;
  // loading配置
  loadingOptions?: Record<string, any>;
  // style
  height?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  autoresize: true,
  loading: false,
  loadingOptions: () => ({ text: "图表正在加载，请稍等~" }),
  height: "100%",
});

const attrs = useAttrs();

const { autoresize, loading } = toRefs(props);

const chart = shallowRef<echarts.ECharts>();
const chartEl = shallowRef<HTMLElement | null>();

const setOption = (option: ECOptions = props.option) => {
  chart.value && chart.value.clear();
  chart.value && chart.value.setOption(option, props.updateOptions);
};

const mount = () => {
  chart.value = echarts.init(chartEl.value!, props.theme);
  props.manual || watchEffect(() => setOption());
};

// TODO:只做初次监听可能会有问题
function listener() {
  for (const key in attrs) {
    if (hasOwn(attrs, key)) {
      const fn = attrs[key];
      if ((key as string).startsWith("on") && isFunction(fn)) {
        let [event, query] = (key as string).split(":");
        event = event.slice(2).toLowerCase();
        query
          ? chart.value!.on(event, query, fn as any)
          : chart.value!.on(event, fn as any);
      }
    }
  }
}

// 自动监听元素变化改变图形
autoresize.value &&
  useResizeObserver(chartEl, (entries) => {
    const entry = entries[0];
    const { width, height } = entry.contentRect;
    width && height && chart.value && chart.value.resize();
  });

onMounted(() => {
  mount();
  listener();
  watch(
    loading,
    (val) => {
      const $chart = chart.value;
      if ($chart) {
        val ? $chart.showLoading(props.loadingOptions) : $chart.hideLoading();
      }
    },
    { immediate: true }
  );
});

onBeforeUnmount(() => {
  chart.value && chart.value.dispose();
});

// 清空echarts
const clear = () => {
  chart.value && chart.value.clear();
};

// 暴露出去;
defineExpose({ setOption, chart, clear });
</script>

<style scoped>
.chart-box {
  width: 100%;
  height: v-bind(height);
  text-align: left;
}
</style>
