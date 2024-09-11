<template>
  <div style="background-color: darkgray">
    <div style="">
      <div style="font-size: 40px">测试文字阴影</div>
      <div class="text-3d-shadow">测试文字阴影</div>
    </div>
    <h1 class="asdf">DARKNESS</h1>
  </div>
</template>
<script lang="ts" setup>
let obj = {
  a: 1,
  b: 2,
};
Object.defineProperty(Object.prototype, "c", {
  value: () => {
    console.log("c");
  },
  writable: true,
  enumerable: true,
  configurable: true,
});

// for (let key in obj) {
//   console.log(key);
// }
// console.log(obj.c);
let obj2: any = { d: 1 };
for (let key in obj2) {
  console.log(key);
}

// const s = Promise.resolve("1");
// s.then((res) => {
//   console.log(res);
//   setTimeout(() => {
//     console.log("2");
//   }, 0);
//   return Promise.resolve("3");
// })
//   .then((res) => {
//     setTimeout(() => {
//       console.log(res);
//       return Promise.resolve("4");
//     }, 0);
//     console.log("5");
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .finally(() => {
//     console.log("6");
//   });

// const a = ++[[]][+[]] + [+[]] + [[]][+[]];

// console.log(a);
// // console.log(1 + [1]);

// // console.log(typeof a);
// const b = 1 - [2];
// console.log(b);
// console.log([2, 2] * 1);

// console.log(typeof b);
</script>
<style lang="scss" scoped>
// .text-3d {
//   font-size: 40px;
//   color: #fff; /* 文字颜色 */
//   text-shadow: 1px 1px 0px #000, 2px 2px 0px #000, 3px 3px 0px #000,
//     4px 4px 0px #000; /* 多个阴影层叠 */
// }
.text-3d-shadow {
  font-size: 40px;
  color: #888; /* 影子颜色 */
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5); /* 文字阴影 */
  transform: rotateX(45deg); /* 沿X轴旋转45度 */
}
.asdf {
  color: aliceblue;
  font-size: 40px;
  font-weight: 700;
  position: relative;
  font-family: "Monserrat";
}
.asdf::after {
  content: "DARKNESS";
  position: absolute;
  left: 0;
  color: #000;
  transform: translate(-47px, 22px) sealeY(0.5) skew(50deg);
  z-index: -1;
  filter: blur(5px);
  background-image: linear-gradient(transparent, #000);
  // -webkit-mask: linear-gradient(transparent, #000);
}
</style>
