<template>
  <b-container>
    <b-row justify="center">
      <h1>Unauthorized</h1>
      <h2>Try logging in again</h2>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Unauthorized extends Vue {}
</script>
