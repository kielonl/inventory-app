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
    {{ title }}<br />
    {{ description }}
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/Task.scss";
</style>
