<template>
  <div class="task-container" @click="showEditModal(id)">
    <h3 class="task-title">{{ type }}</h3>
    <h3 class="task-description">{{ name }}</h3>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  type: string;
  name: string;
  id?: string;
  save(updating: boolean): void;
  showEditModal(taskId?: string): void;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
@import "../styles/Task.scss";
</style>
