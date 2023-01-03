<template>
  <div class="task-container" :style="{ background: '#FFBA08' }">
    <h3 class="task-title">{{ description }}</h3>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: String;
  description: String;
  id: Number;
}

const Props = defineProps<Props>();
</script>

<style lang="scss" scoped>
@import "../styles/Task.scss";
</style>
