<template>
  <div class="modal-container" :class="{ 'modal-hidden': styles.display }">
    {{ task.title }} - {{ task.description }}
  </div>
  <button @click="styles.display = !styles.display"></button>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface Props {
  task: {
    title: String;
    description: String;
  };
}
const Props = defineProps<Props>();
const styles = ref({ display: true });
</script>

<style scoped lang="scss">
@import "../styles/Modal.scss";
</style>
