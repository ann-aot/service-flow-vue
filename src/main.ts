import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Keycloak from "keycloak-js";
import { BootstrapVue } from "bootstrap-vue";
import Vue from "vue";
import App from "./App.vue";
// import authentication from "@/plugins/authentication";
// import plugin from "@/plugins/plugin";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

const initOptions = {
  url: `${process.env.VUE_APP_KEYCLOAK_URL}/auth`,
  realm: process.env.VUE_APP_KEYCLOAK_URL_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
  onLoad: "login-required",
};

const keycloak = Keycloak(initOptions);

keycloak
  .init({ onLoad: "login-required" })
  .then(() => {
    console.log("authentication status", keycloak.authenticated);
    if (!keycloak.authenticated) {
      console.warn("Not authenticated");
    } else {
      console.log("Authenticated!");
      new Vue({
        router,
        store,
        render: (h) => h(App),
      }).$mount("#app");
    }

    setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            console.info("Token refreshed" + refreshed);
          } else {
            // console.warn('Token not refreshed, valid for '
            //   + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
          }
        })
        .catch(() => {
          console.error("Failed to refresh token");
        });
    }, 30000);
  })
  .catch(() => {
    console.error("Authenticated Failed");
  });
