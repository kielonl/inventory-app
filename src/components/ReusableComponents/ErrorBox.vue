<template>
  <div class="error-box-container">
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
interface Props {
  message: string;
}
defineProps<Props>();
</script>

<style lang="scss">
@import url("@//components/ReusableComponents/styles/ErrorBox.scss");
</style>
