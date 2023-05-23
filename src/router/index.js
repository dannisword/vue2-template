import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/A1000",
    children: [
      {
        path: "A1000",
        name: "A1000",
        component: () => import("@/views/A1000/A1000"),
        meta: { title: "測試功能" },
      },
    ],
  },
  { path: "*", redirect: "/404", hidden: true },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
