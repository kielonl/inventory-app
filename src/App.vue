<template>
  <div>
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'Login' }">Login</router-link>
  </div>
  <router-view />
</template>
<script lang="ts" setup>
import TaskBoard from "./components/Board/components/TaskBoard.vue";
</script>

<style scoped lang="scss"></style>
