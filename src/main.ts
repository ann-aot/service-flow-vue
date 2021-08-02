import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Keycloak, { KeycloakInitOptions, KeycloakInstance, KeycloakLoginOptions, KeycloakTokenParsed } from 'keycloak-js'
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
  url: 'https://iam.aot-technologies.com/auth', realm: 'formsflow-ai-willow', clientId: 'forms-flow-web', onLoad: 'login-required'
}

const keycloak = Keycloak(initOptions);

// Vue.$keycloak.init({
//   checkLoginIframe: false})
//   .then(() => {
keycloak.init({onLoad: 'login-required' }).then((auth) => {
  console.log("authentication status", auth)
  if (!auth) {
    window.location.reload();
  } else {
    console.log('Authenticated!');
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  // })
  }

  console.log("token", keycloak.token)

   setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.info('Token refreshed' + refreshed);
      } else {
        // console.warn('Token not refreshed, valid for '
        //   + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      console.error('Failed to refresh token');
    });
  }, 30000)

}).catch(() => {
  console.error("Authenticated Failed");


});


