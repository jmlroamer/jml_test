// import { ref, computed } from "vue";
// import { defineStore } from "pinia";
// import { loginByToken, getUserInfo, getUserCounty } from "@/api";
// import router from "@/router";
// import { ElMessage } from "element-plus";
// import { usebasesys } from "@/constants";

// type UserInfo = {
//   token: string;
//   user: string;
// };
// export const useUserStore = defineStore("user", () => {
//   const token = ref(localStorage.getItem("token") || "");
//   const userInfo = ref<any>(
//     localStorage.getItem("user")
//       ? JSON.parse(localStorage.getItem("user") || "")
//       : ""
//   );
//   const isyzuser = computed(() => {
//     //是否包含
//     return userInfo.value.countyInfo.addvnm.includes("永州");
//   });

//   const toLogin = async (oldtoken: string) => {
//     setToken(oldtoken);
//     // const res: any = await loginByToken({ token: oldtoken });
//     // if (res.code === 200) {
//     //   setToken(res.token);
//     // } else {
//     //   ElMessage.error("登录失败!");
//     //   setTimeout(() => {
//     //     window.location.href = `${
//     //       import.meta.env.VITE_APP_BASESIS_API
//     //     }?redirect=${location.href}`;
//     //   }, 500);
//     // }
//   };
//   const setToken = async (e: string) => {
//     token.value = e;
//     await localStorage.setItem("token", token.value);
//     const res: any = await getUserInfo();
//     const res2: any = await getUserCounty();
//     const countyInfo = res2.filter((item: any) => {
//       return item.izShow == "1";
//     });
//     res.user.countyInfo = countyInfo[0] || {};
//     setUser(res.user);
//   };
//   const setUser = (e: UserInfo) => {
//     userInfo.value = e;
//     localStorage.setItem("user", JSON.stringify(userInfo.value));
//     router.push("/");
//   };
//   const logout = () => {
//     localStorage.clear();
//     window.location.href = window.location.href = usebasesys;
//   };
//   return { token, userInfo, isyzuser, toLogin, setToken, setUser, logout };
// });
