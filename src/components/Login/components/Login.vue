<template>
  <div class="login-form-wrapper">
    <div class="login-form-container">
      <img :src="logo" alt="logo" />
      <div class="login-inputs-container">
        <FormInput :name="'Username'" v-model="login1.username" />
        <FormInput :name="'Password'" v-model="login1.password" />
        <button class="login-button" @click="validateLogin()">Login</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import FormInput from "@/components/ReusableComponents/FormInput.vue";
import logo from "../../../assets/halinowpetla.png";

import type { Login } from "../../../types";
import { ref, inject } from "vue";

const router = useRouter();

const login1 = ref<Login>({
  username: "",
  password: "",
});

const { updateLogin } = inject("login") as any;

function validateLogin(): void {
  if (login1.value.username === "" || login1.value.password === "") {
    return;
  }
  updateLogin(login1.value.username, login1.value.password);

  router.push("/home");
}
</script>

<style scoped lang="scss">
@import url("../styles/Login.scss");
</style>
