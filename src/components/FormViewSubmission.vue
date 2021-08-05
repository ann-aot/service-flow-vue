<template>
  <b-container fluid>
    <div id="formio"></div>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Form, Formio } from "vue-formio";
import { getFormDetails } from "../services/get-formio";
@Component({
  components: {
    formio: Form,
  },
})
export default class FormViewSubmission extends Vue {
  @Prop() private formid!: string;
  @Prop() private submissionid!: string;
  private formUrl = "";
  private formIOProjectUrl = "";
  private formioUrlLink = "";
  private fId = "";
  private sId = "";
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  checkLocalStorageValue () {
    const formioApiUrl = localStorage.getItem("formioApiUrl");
    if (typeof formioApiUrl !== "undefined" && formioApiUrl !== null) {
      this.formIOProjectUrl = formioApiUrl;
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted () {
    this.formUrl = window.location.href;
    this.checkLocalStorageValue();
    const { formioUrl, formId, submissionId } = getFormDetails(
      this.formUrl,
      this.formIOProjectUrl
    );
    if (formId && submissionId) {
      const a = document.createElement("a");
      a.href = formioUrl;
      this.formioUrlLink = formioUrl.replace(a.protocol.toString(), "https:");
      this.fId = formId;
      this.sId = submissionId;
    } else {
      this.fId = this.formid;
      this.sId = this.submissionid;
      this.formioUrlLink =
        this.formIOProjectUrl + "/form/" + this.fId + "/submission/" + this.sId;
    }
    Formio.createForm(document.getElementById("formio"), this.formioUrlLink, {
      readOnly: true,
    });
  }
}
</script>
