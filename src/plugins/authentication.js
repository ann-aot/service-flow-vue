import Keycloak from "keycloak-js";

const options = {
  url: `${process.env.VUE_APP_KEYCLOAK_URL}/auth`,
  realm: process.env.VUE_APP_KEYCLOAK_URL_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
};

const _keycloak = Keycloak(options);

// const Plugin = {
//   install(Vue) {
//     Vue.$keycloak = _keycloak;
//   },
// };

// Plugin.install = (Vue) => {
//   Vue.$keycloak = _keycloak;
//   Object.defineProperties(Vue.prototype, {
//     $keycloak: {
//       get() {
//         return _keycloak;
//       },
//     },
//   });
// };

// Vue.use(Plugin);

export default _keycloak;
