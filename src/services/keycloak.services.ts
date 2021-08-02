import Keycloak, { KeycloakInitOptions, KeycloakInstance } from "keycloak-js";

// export const tenantDetail = {
//   "realm": KEYCLOAK_REALM,
//   "url": KEYCLOAK_AUTH_URL,
//   "clientId": Keycloak_Client
// };

// export const _kc = new Keycloak(tenantDetail);
class KeycloakService {
  private kc: KeycloakInstance | undefined;
}
// async initializeKeyCloak (idpHint: string, store: Store<any>) {
//   this.store = store
//   this.clearSession()
//   const token = ConfigHelper.getFromSession(SessionStorageKeys.KeyCloakToken) || undefined
//   const keycloakConfig = ConfigHelper.getKeycloakConfigUrl()
//   this.kc = Keycloak(keycloakConfig)
//   const kcLogin = this.kc.login
//   this.kc.login = (options?: KeycloakLoginOptions) => {
//     if (options) {
//       options.idpHint = idpHint
//     }
//     return kcLogin(options)
//   }
//   let kcOptions :KeycloakInitOptions = {
//     onLoad: 'login-required',
//     checkLoginIframe: false,
//     timeSkew: 0,
//     token,
//     refreshToken: ConfigHelper.getFromSession(SessionStorageKeys.KeyCloakRefreshToken) || undefined,
//     idToken: ConfigHelper.getFromSession(SessionStorageKeys.KeyCloakIdToken) || undefined,
//     pkceMethod: 'S256'
//   }
//   return this.kc.init(kcOptions)
// }
