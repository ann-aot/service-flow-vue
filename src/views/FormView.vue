<template>
  <div>
    <Header />
    <div>
      <FormViewSubmission
        v-if="formId && submissionId"
        :formid="formId"
        :submissionid="submissionId"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FormViewSubmission from "camunda-formio-tasklist-vue/src/components/FormViewSubmission.vue";
import Header from "@/components/layouts/Header.vue";

@Component({
  components: {
    FormViewSubmission,
  },
})
export default class FormView extends Vue {
  private formId: string = "";
  private submissionId: string = "";

  mounted() {
    this.formId = this.$route.params.formId;
    this.submissionId = this.$route.params.submissionId;
  }
}
</script>
