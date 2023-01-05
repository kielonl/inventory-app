<template>
  <div class="task-container" @click="showEditModal(props.id)">
    <h3 class="task-title">{{ title }}</h3>
    <h3 class="task-description">{{ description }}</h3>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
  description: string;
  id?: number;
  save(updating: boolean): void;
  showEditModal(taskId?: number): void;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
@import "../styles/Task.scss";
</style>
