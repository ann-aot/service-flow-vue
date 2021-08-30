<template>
  <b-container fluid>
    <b-row class="mb-3 header">
      <b-col md="8">
        <b-img
          src="https://user-images.githubusercontent.com/70306694/124284590-c3078b80-db6a-11eb-81c7-921cfbe46495.png"
        >
        </b-img>
      </b-col>
      <b-col md="4" class="d-flex justify-content-end">
        <b-button
          class="button-css btn btn-primary"
          variant="primary"
          @click="backClick"
          >Go Back</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col md="12" class="d-flex justify-content-around">
        <h1>You are unauthorised</h1>
        <b-img src="https://kurianbenoy.com/assets/img/404-southpark.jpg">
        </b-img>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Unauthorized extends Vue {
  backClick() {
    Vue.$keycloak.logout({ redirectUri: window.location.origin });
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
</style>
