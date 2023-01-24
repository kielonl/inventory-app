<template>
  <div>
    <router-link :to="{ name: 'Home' }"></router-link>
    <router-link :to="{ name: 'Login' }"></router-link>
  </div>
  <router-view />
</template>
<script lang="ts" setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped lang="scss"></style>
