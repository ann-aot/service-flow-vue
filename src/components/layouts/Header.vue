<template>
  <b-container fluid class="header">
    <b-row class="mb-3">
      <b-col md="4">
        <b-img
          src="https://user-images.githubusercontent.com/70306694/124284590-c3078b80-db6a-11eb-81c7-921cfbe46495.png"
        >
        </b-img>
      </b-col>
      <b-col md="4" class="text-center">
        <p class="username">User: {{ firstName }} {{ lastName }}</p>
      </b-col>
      <b-col md="4" class="d-flex justify-content-end">
        <b-button
          class="button-css btn btn-primary"
          variant="primary"
          @click="logout"
          >Logout</b-button
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  private firstName = "";
  private lastName = "";

  logout() {
    Vue.$keycloak.logout({ redirectUri: window.location.origin });
  }

  mounted() {
    this.firstName = Vue.$keycloak.tokenParsed.given_name;
    this.lastName = Vue.$keycloak.tokenParsed.family_name;
  }
}
</script>

<style scoped>
.header {
  background-color: #fdb44e;
}

.button-css {
  margin: 10px;
}

.username {
  font-size: 1.5em;
  color: #fff;
}
</style>
