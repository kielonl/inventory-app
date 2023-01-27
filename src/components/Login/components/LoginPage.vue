<template>
  <div class="login-form-wrapper flex--center">
    <div class="login-form-container flex--center">
      <img :src="logo" alt="logo" />
      <div class="login-inputs-container flex--center">
        <LoginForm
          v-if="form == 'Login'"
          :changeForm="() => changeForm('Register')"
        />
        <RegisterForm
          v-if="form == 'Register'"
          :changeForm="() => changeForm('Login')"
        />
      </div>
      <ErrorBox v-if="errorMessage !== ''" :message="errorMessage" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import logo from "../../../assets/halinowpetla.png";
import ErrorBox from "@/components/ReusableComponents/ErrorBox.vue";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
import type { Form } from "@/types";

const errorMessage = ref<string>("");

const form = ref<Form>("Register");

const changeForm = (formComponent: Form) => {
  return (form.value = formComponent);
};
</script>

<style lang="scss">
@import url("../styles/Login.scss");
</style>
