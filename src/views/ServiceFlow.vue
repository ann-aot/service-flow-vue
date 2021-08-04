<template>
  <div v-if="jwttoken">
    <Header />
    <CamundaTasklist
      :bpmApiUrl="configs.BPM_URL"
      :token="jwttoken"
      :formIOApiUrl="configs.FORM_IO_API_URL"
      :formIOResourceId="configs.FORM_IO_RESOURCE_ID"
      :formIOReviewerId="configs.FORM_IO_REVIEWER_ID"
      :formIOReviewer="configs.FORM_IO_REVIEWER"
      :formsflowaiUrl="configs.FORM_FLOW_URL"
      :formsflowaiApiUrl="configs.FORM_FLOW_API_URL"
      :formIOUserRoles="configs.FORMIO_ROLES"
      :getTaskId="getTaskId"
      v-if="isServiceFLowEnabled"
    />
  </div>
  <div class="no-content" v-else>
    You shouldnot be here !!!
    <h1>Hello</h1>
  </div>
</template>

<script lang="ts">
import CamundaTasklist from "camunda-formio-tasklist-vue/src/components/TaskList.vue";
import Header from "@/components/layouts/Header.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    CamundaTasklist,
    Header,
  },
})
export default class TaskList extends Vue {
  @Prop() private getTaskId!: string;
  public configs = {
    BPM_URL: process.env.VUE_APP_BPM_URL,
    FORM_IO_API_URL: process.env.VUE_APP_FORM_IO_API_URL,
    FORM_IO_RESOURCE_ID: process.env.VUE_APP_FORM_IO_RESOURCE_ID,
    FORM_IO_REVIEWER_ID: process.env.VUE_APP_FORM_IO_REVIEWER_ID,
    FORM_IO_REVIEWER: process.env.VUE_APP_FORM_IO_REVIEWER,
    FORM_FLOW_API_URL: process.env.VUE_APP_FORM_FLOW_API_URL,
    FORM_FLOW_URL: process.env.VUE_APP_FORM_FLOW_URL,
    SERVICEFLOW_ENABLED: true,
    FORMIO_ROLES: process.env.VUE_APP_FORMIO_ROLES,
  };

  public isServiceFLowEnabled = true;
  public jwttoken: any = false;

  created() {
    this.jwttoken = Vue.$keycloak.token;
    this.isServiceFLowEnabled = true;
  }
}
</script>
