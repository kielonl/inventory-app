<template>
  <div>
    <router-link :to="{ name: 'Home' }"></router-link>
    <router-link :to="{ name: 'Login' }"></router-link>
  </div>
  <router-view />
</template>
<script lang="ts" setup>
import { provide, ref } from "vue";
import type { Login } from "./types";

const login = ref<Login>({
  username: "",
  password: "",
});

const updateLogin = (username: string, password: string) => {
  login.value = {
    username,
    password,
  };
};

provide("login", { login, updateLogin });
</script>

<style scoped lang="scss"></style>
