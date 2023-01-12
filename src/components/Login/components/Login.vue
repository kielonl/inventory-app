<template>
  <div class="login-form-wrapper">
    <div class="login-form-container">
      <img :src="logo" alt="logo" />
      <div class="login-inputs-container">
        <FormInput :name="'Username'" />
        <FormInput :name="'Password'" />
        <button class="login-button">Login</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FormInput from "@/components/ReusableComponents/FormInput.vue";
import logo from "../../../assets/halinowpetla.png";
</script>

<style scoped lang="scss">
@import url("../styles/Login.scss");
</style>
