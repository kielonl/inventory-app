<script lang="ts">
import { defineComponent } from "vue";
import Task from "../components/Task.vue";

export default defineComponent({
  name: "Board",
  components: { Task },

  setup() {},
});
</script>
<template>
  <div class="board-container">
    dobry dzien dobry dzien dobry dzien dobry dzien dobry czesc i czolem
    <Task />
  </div>
</template>

<style lang="scss">
@import "../styles/Board.scss";
</style>
