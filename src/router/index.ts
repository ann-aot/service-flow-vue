import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ServiceFlow from "../views/ServiceFlow.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "ServiceFlow",
    component: ServiceFlow,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
