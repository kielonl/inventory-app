<template>
  <form @submit.prevent="RegisterUser()">
    <InputTextField
      :name="'Username'"
      v-model="register.username"
      :isError="isError.username"
    />
    <InputTextField
      :name="'Name'"
      v-model="register.name"
      :isError="isError.name"
    />
    <InputTextField
      :name="'Password'"
      v-model="register.password"
      :isError="isError.password"
      :inputType="'password'"
    />
    <input type="submit" class="login-button" value="Register" />
  </form>
</template>

<script setup lang="ts">
import InputTextField from "@/components/ReusableComponents/InputTextField.vue";
import { useLoginStore } from "@/stores/Login";
import type { Register } from "@/types";

import { ref } from "vue";

interface Props {
  changeForm(): void;
}
const props = defineProps<Props>();
const loginStore = useLoginStore();

const register = ref<Register>({
  username: "",
  password: "",
  name: "",
});

const isError = ref<{ username: boolean; password: boolean; name: boolean }>({
  username: false,
  password: false,
  name: false,
});

const validateRegister = (): void => {
  isError.value = {
    username:
      register.value.username === "" ||
      register.value.username.trim().length > 16,
    name: register.value.name === "" || register.value.name.trim().length > 16,
    password:
      register.value.password === "" ||
      register.value.password.trim().length < 8,
  };
};

const RegisterUser = async () => {
  validateRegister();
  if (isError.value.username || isError.value.name || isError.value.password)
    return;
  await loginStore.registerUser(
    register.value.username,
    register.value.name,
    register.value.password
  );
  props.changeForm();
};
</script>
