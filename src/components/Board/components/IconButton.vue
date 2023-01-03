<template>
  <div class="addtask-container">
    <button class="addtask-button">{{ icon }}</button>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  icon: string;
}

const Props = defineProps<Props>();
</script>
<style scoped lang="scss">
@import "../styles/IconButton.scss";
</style>
