<template>
  <div class="add-item-container">
    <button class="add-item-button">{{ icon }}</button>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  icon: string;
}

defineProps<Props>();
</script>
<style scoped lang="scss">
@import "../styles/IconButton.scss";
</style>
