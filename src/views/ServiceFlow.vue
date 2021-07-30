<template>
  <div v-if="token">
    <CamundaTasklist
      :bpmApiUrl="configs.BPM_URL"
      :token="token"
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
  <div class="no-content" v-else>You shouldnot be here !!!</div>
</template>

<script lang="ts">
import CamundaTasklist from "camunda-formio-tasklist-vue/src/components/TaskList.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {
    CamundaTasklist,
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

  get token() {
    return this.jwttoken;
  }

  async getToken() {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("username", "nancy-smith");
    params.append("password", "aot123");
    params.append("client_id", "forms-flow-web");

    const url = `${process.env.VUE_APP_KEYCLOAK_URL}/auth/realms/${process.env.VUE_APP_KEYCLOAK_URL_REALM}/protocol/openid-connect/token`;
    console.log(url);
    // "https://iam.aot-technologies.com/auth/realms/formsflow-ai-willow/protocol/openid-connect/token";
    await axios.post(url, params, config).then((result: any) => {
      this.jwttoken = result.data.access_token;
    });
  }

  created() {
    this.getToken();
  }

  mounted() {
    // this.token = sessionStorage.getItem('token')
    this.isServiceFLowEnabled = true;
    this.getToken();
    //this.token()
  }
}
</script>

<style scoped></style>
