import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import FormView from "../views/FormView.vue";
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
  {
    path: "/form/:formId/submission/:submissionId",
    name: "Formio view forms",
    component: FormView,
    meta: {
      requiresAuth: true,
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
    if (!Vue.prototype.$keycloak.authenticated) {
      Vue.prototype.$keycloak.login({
        redirectUri: baseUrl.slice(0, -1) + to.path,
      });
    } else if (Vue.prototype.$keycloak.hasResourceRole("formsflow-reviewer")) {
      Vue.prototype.$keycloak
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
