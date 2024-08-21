import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/home/HomeView.vue";
// import VideoView from "../views/VideoView.vue";
import { useUserStore } from "@/stores";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { leftmenu } from "./menu";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
    { path: "/:pathMatch(.*)*", redirect: "docmanage" },
  ],
});

const modules1 = import.meta.glob("../*/*/*.vue");
const modules2 = import.meta.glob("../*/*/*/*.vue");
const modules = {
  ...modules1,
  ...modules2,
};

export const setRoutes = () => {
  // const currentRouteNames = router.getRoutes().map((v) => v.name);
  // if (currentRouteNames.includes("home")) {
  //   return false;
  // }
  // const storeMenus = localStorage.getItem("menus");
  // if (storeMenus) {
  if (true) {
    let manageRoute: RouteRecordRaw = {
      path: "/",
      name: "home",
      component: () => import("@/views/home/HomeView.vue"),
      redirect: "/comprehensivemap",
      children: [],
    };
    // const menus = JSON.parse(storeMenus) as Array<menuData<menuData<null>>>
    const menus: any = [...leftmenu];
    // menus.forEach((item: any) => {
    //   if (!("children" in item)) {
    //     // console.log(item.component);
    //     // console.log(modules[`../${item.component}View.vue`]);
    //     const itemMenu = {
    //       path: item.path.replace("/", ""),
    //       name: item.label,
    //       component: modules[`../${item.component}.vue`],
    //       meta: { label: item.label, keepAlive: item.meta.keepAlive },
    //     };
    //     manageRoute.children.push(itemMenu);
    //   } else if ("children" in item) {
    //     item as any;
    //     item.children!.forEach((item: any) => {
    //       const itemMenu = {
    //         path: item.path === null ? "" : item.path.replace("/", ""),
    //         name: item.label,
    //         component: modules[`../${item.component}.vue`],
    //         meta: { label: item.label, keepAlive: item.meta.keepAlive },
    //       };
    //       manageRoute.children.push(itemMenu);
    //     });
    //   }
    // });
    manageRoute = rollRouter(menus, manageRoute);
    router.addRoute(manageRoute);
  }
};

const rollRouter = (menus: any, manageRoute: any) => {
  menus.forEach((item: any) => {
    if (!("children" in item)) {
      const itemMenu = {
        path: item.path.replace("/", ""),
        name: item.label,
        component: modules[`../${item.component}.vue`],
        meta: { label: item.label, keepAlive: item.meta.keepAlive },
      };
      manageRoute.children.push(itemMenu);
    } else if ("children" in item) {
      item as any;
      item.children!.forEach((item: any) => {
        if (!("children" in item)) {
          const itemMenu = {
            path: item.path === null ? "" : item.path.replace("/", ""),
            name: item.label,
            component: modules[`../${item.component}.vue`],
            meta: { label: item.label, keepAlive: item.meta.keepAlive },
          };
          manageRoute.children.push(itemMenu);
        } else {
          rollRouter(item.children!, manageRoute);
        }
      });
    }
  });
  return manageRoute;
};

const currentRouteNames = router.getRoutes().map((v) => v.name);

if (!currentRouteNames.includes("home")) {
  setRoutes();
}
setRoutes();

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (useUserStore().token.trim() == "") {
    useUserStore().toLogin();
    if (to.path == "/" && to.query.ticket) {
      useUserStore().userInfo.token = to.query.ticket as string;
      NProgress.inc();
      if (useUserStore()?.userInfo) {
        // await useUserStore().login();
        // await useUserStore().settoken();
      }
      next();
    } else {
      // if (import.meta.env.NODE_ENV === "development") {
      //   window.location.replace(import.meta.env.VUE_APP_LOGO);
      // } else {
      //   window.location.replace(
      //     `${window.location.protocol}//${window.location.hostname}:9700`
      //   );
      // }
      next();
    }
  } else {
    next();
  }
  NProgress.done();
});

export default router;
