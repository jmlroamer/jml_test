import "./assets/main.css";
import "@/styles/index.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import plugin from "@/plugin";
import "@/vue-leaflet/src/style/index.css";

import "@/utils/L.TileLayer.NoGap";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(pinia);
app.use(router);
app.use(plugin);

app.mount("#app");
