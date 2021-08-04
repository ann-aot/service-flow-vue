import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ServiceFlow from "../views/ServiceFlow.vue";
import Unauthorized from "../views/Unauthorized.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "ServiceFlow",
    component: ServiceFlow,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta?.requiresAuth) {
    const baseUrl = window.location.toString();
    if (!Vue.$keycloak.authenticated) {
      Vue.$keycloak.login({
        redirectUri: baseUrl.slice(0, -1) + to.path,
      });
    } else if (Vue.$keycloak.hasResourceRole("formsflow-reviewer")) {
      Vue.$keycloak
        .updateToken(70)
        .then(() => {
          next();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      next({ name: "Unauthorized" });
    }
  } else {
    next();
  }
});

export default router;
