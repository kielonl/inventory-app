<template>
  <div class="login-form-wrapper flex--center">
    <div class="login-form-container flex--center">
      <img :src="logo" alt="logo" />
      <div class="login-inputs-container flex--center">
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
      </div>
      <ErrorBox v-if="errorMessage !== ''" :message="errorMessage" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import InputTextField from "@/components/ReusableComponents/InputTextField.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

import { useLoginStore } from "@/stores/Login";
import type { User } from "../../../types";
import logo from "../../../assets/halinowpetla.png";
import ErrorBox from "@/components/ReusableComponents/ErrorBox.vue";

const router = useRouter();
const login = ref<User>({
  username: "",
  password: "",
});

const isError = ref<{ username: boolean; password: boolean }>({
  username: false,
  password: false,
});

const errorMessage = ref<string>("");

const loginStore = useLoginStore() as any;

const validateLogin = (): void => {
  isError.value = {
    username: login.value.username === "",
    password: login.value.password === "",
  };
  if (login.value.username === "" || login.value.password == "") return;
};

const loginUser = async () => {
  validateLogin();
  await loginStore.loginUser(login.value.username, login.value.password);
  // router.push("/home");
};
</script>

<style scoped lang="scss">
@import url("../styles/Login.scss");
</style>
