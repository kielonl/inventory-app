<template>
  <form class="login-form-wrapper">
    <div class="login-form-container">
      <img :src="logo" alt="logo" />
      <div class="login-inputs-container">
        <FormInput :name="'Username'" v-model="login.username" />
        <FormInput :name="'Password'" v-model="login.password" />
        <input
          type="submit"
          class="login-button"
          @click="validateLogin()"
          value="Login"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import FormInput from "@/components/ReusableComponents/InputTextField.vue";
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
