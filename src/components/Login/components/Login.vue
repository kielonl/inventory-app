<template>
  <div class="login-form-wrapper">
    <div class="login-form-container">
      <div class="login-inputs-container">
        <div class="username-input">
          <label for="username">Username</label>
          <input class="form-input" name="username" type="text" />
        </div>
        <div class="password-input">
          <label for="password">password</label>
          <input class="form-input password" name="password" type="password" />
        </div>
        <button class="login-button">Login</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
@import url("../styles/Login.scss");
</style>
