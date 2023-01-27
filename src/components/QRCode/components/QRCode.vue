<template>
  <div>
    <p class="error">{{ error }}</p>

    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>

    <QrcodeStream @decode="onDecode" @init="onInit" />
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import { QrcodeStream } from "vue3-qrcode-reader";
import { checkIfValidUUID } from "@/utils";
import { readById } from "@/services/itemService";

import { ref } from "vue";
import { useRouter } from "vue-router";

const result = ref("");
const error = ref("");
const router = useRouter();

const onDecode = async (result: any) => {
  if (!checkIfValidUUID(result)) {
    return;
  }

  const item = await readById(result);
  if (item) {
    router.push(`/item/${item.uuid}`);
  }
};

const onInit = async (promise: Promise<any>) => {
  try {
    await promise;
  } catch (error: any) {
    switch (error.name) {
      case "NotAllowedError":
        error.value = "ERROR: you need to grant camera access permission";
        break;
      case "NotFoundError":
        error.value = "ERROR: no camera on this device";
        break;
      case "NotSupportedError":
        error.value = "ERROR: secure context required (HTTPS, localhost)";
        break;
      case "NotReadableError":
        error.value = "ERROR: is the camera already in use?";
        break;
      case "OverconstrainedError":
        error.value = "ERROR: installed cameras are not suitable";
        break;
      case "StreamApiNotSupportedError":
        error.value = "ERROR: Stream API is not supported in this browser";
        break;
      case "InsecureContextError":
        error.value =
          "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        break;
      default:
        error.value = `ERROR: Camera error (${error.name})`;
    }
  }
};
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
