<template>
  <div class="error-box-container">
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
interface Props {
  message: string;
}
const props = defineProps<Props>();
</script>

<style lang="scss">
@import "../styles/ErrorBox.scss";
</style>
