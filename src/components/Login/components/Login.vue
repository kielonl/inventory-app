<template>
  <div class="login-form-wrapper">
    <div class="login-form-container">
      <img :src="logo" alt="logo" />
      <div class="login-inputs-container">
        <form @submit.prevent="validateLogin()">
          <InputTextField :name="'Username'" v-model="login.username" />
          <InputTextField :name="'Password'" v-model="login.password" />
          <input type="submit" class="login-button" value="Login" />
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import InputTextField from "@/components/ReusableComponents/InputTextField.vue";
import logo from "../../../assets/halinowpetla.png";

import type { Login } from "../../../types";
import { ref, inject } from "vue";

const router = useRouter();

const login = ref<Login>({
  username: "",
  password: "",
});

const { updateLogin } = inject("login") as any;

function validateLogin(): void {
  if (login.value.username === "" || login.value.password === "") {
    return;
  }

  updateLogin(login.value.username, login.value.password);

  router.push("/home");
}
</script>

<style scoped lang="scss">
@import url("../styles/Login.scss");
</style>
