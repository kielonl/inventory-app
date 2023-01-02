<script lang="ts">
import { defineComponent } from "vue";
import Board from "./components/Board/components/Board.vue";

export default defineComponent({
  name: "App",
  components: { Board },
  setup() {},
});
</script>

<template>
  <div class="App">
    <Board />
  </div>
</template>

<style scoped lang="scss"></style>
