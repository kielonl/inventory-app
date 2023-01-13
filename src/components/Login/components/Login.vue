<template>
  <div class="login-form-wrapper flex--center">
    <div class="login-form-container flex--center">
      <img :src="logo" alt="logo" />
      <div class="login-inputs-container flex--center">
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
import InputTextField from "@/components/ReusableComponents/InputTextField.vue";
import { useRouter } from "vue-router";
import { ref, inject } from "vue";

import { useLoginStore } from "@/stores/Login";
import type { Login } from "../../../types";
import logo from "../../../assets/halinowpetla.png";

const router = useRouter();
const login = ref<Login>({
  username: "",
  password: "",
});

const loginStore = useLoginStore();

function validateLogin(): void {
  if (login.value.username === "" || login.value.password === "") {
    return;
  }

  loginStore.setLogin({
    username: login.value.username,
    password: login.value.password,
  });

  router.push("/home");
}
</script>

<style scoped lang="scss">
@import url("../styles/Login.scss");
</style>
