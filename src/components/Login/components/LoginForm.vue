<template>
  <form @submit.prevent="loginUser()">
    <InputTextField
      :name="'Username'"
      v-model="login.username"
      :isError="isError.username"
    />
    <InputTextField
      :name="'Password'"
      v-model="login.password"
      :isError="isError.password"
      :inputType="'password'"
    />

    <input type="submit" class="login-button" value="Login" />
  </form>
  <div class="switch" @click="changeForm('Login')">Register</div>
</template>

<script setup lang="ts">
import InputTextField from "@/components/ReusableComponents/InputTextField.vue";
import { useLoginStore } from "@/stores/Login";
import type { Login } from "@/types";

import { ref } from "vue";
import { useRouter } from "vue-router";

interface Props {
  changeForm(formComponent: string): void;
}

defineProps<Props>();
const router = useRouter();
const loginStore = useLoginStore();

const login = ref<Login>({
  username: "",
  password: "",
});

const isError = ref<{ username: boolean; password: boolean }>({
  username: false,
  password: false,
});

const validateLogin = (): void => {
  isError.value = {
    username: login.value.username === "",
    password: login.value.password === "",
  };
};

const loginUser = async () => {
  validateLogin();
  if (isError.value.username || isError.value.password) return;
  await loginStore.loginUser(login.value.username, login.value.password);
  router.push("/home");
};
</script>

<style lang="scss"></style>
