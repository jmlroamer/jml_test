<template>
  <div style="background-color: aqua">
    <ElInput v-model="s" @mouseenter="onHover" />
    {{ fullName }}
    <div>
      <ElInput v-model="firstName" />
    </div>
    <div>
      <ElInput v-model="lastName" />
    </div>
    <div>
      <ElInput v-model="state" />
      <ElButton type="primary" @click="change">change</ElButton>
    </div>
    <div>
      <el-button @click="changeMsg">change</el-button>
      <div>{{ message }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const firstName = ref("John");
const lastName = ref("Doe");

const fullName = computed({
  // getter
  get() {
    // return firstName.value + " " + lastName.value;
    return lastName.value + "" + firstName.value;
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(" ");
  },
});

const s = ref(0);
const onHover = (e: MouseEvent) => {
  // console.log(e);
  s.value++;
};
watchEffect(() => {
  console.log(s.value);
});

const obj = {
  foo: 1,
  bar: 1,
};

const state = toRef(obj, "bar");
// bar 转化为响应式对象

const change = () => {
  state.value++;
  console.log(obj, state);
};

type Obj = {
  name: string;
};
const message: Ref<Obj> = shallowRef({
  name: "小满",
});

const changeMsg = () => {
  message.value.name = "大满";
  console.log(message);
  message.value = { name: "大满" };
};
</script>
