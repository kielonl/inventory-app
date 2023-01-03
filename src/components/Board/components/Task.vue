<template>
  <div class="task-container" :style="{ background: '#FFBA08' }">
    <h3 class="task-title">{{ title }}</h3>
    <h3 class="task-description">{{ description }}</h3>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: String;
  description: String;
  id: Number;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
@import "../styles/Task.scss";
</style>
