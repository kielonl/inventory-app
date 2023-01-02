<template>
  <div class="task-container">
    <div>{{ title }}</div>
    <div>{{ description }}</div>
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
