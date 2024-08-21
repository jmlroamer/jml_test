import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { login } from "@/apis/modules/user";

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref("");
    const userInfo = ref({
      token: "",
      user: "213",
    });
    //   const doubleCount = computed(() => count.value * 2)
    const toLogin = async () => {
      // const res = await login({ username: "admin", password: "admin123" });
      // console.log(res.data.token);
      // token.value = res.data.token;
      // console.log(res.token);
      // token.value = res.token;
      token.value =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAxLCJuYW1lIjoi566h55CG5ZGYIiwibG9naW50eXBlIjoiemIiLCJleHBpcmUiOiIyMDI0LTAzLTEzIDA5OjQyOjU1IiwiZXhwIjoiMTcxMDI5NDE3NSJ9.PfpxrWOrFvgKkf_Cj1OTwbKWtrzaCQl63-OcD-oV8CM";
    };
    const settoken = () => {};

    return { token, userInfo, toLogin, settoken };
  },
  {
    persist: {
      key: "token",
      storage: sessionStorage,
      paths: ["token"],
    },
  }
);
