<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Task",
  components: {},
  props: {
    title: String,
    description: String,
    id: Number,
  },

  setup() {},
});
</script>

<template>
  <div class="task-container">
    <div>{{ title }}</div>
    <div>{{ description }}</div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/Task.scss";
</style>
