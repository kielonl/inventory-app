import { login, register } from "@/services/userService";
import { defineStore } from "pinia";
import axios from "axios";

export const useLoginStore = defineStore("loginStore", {
  state: () => ({ login: { username: "", password: "" } }),
  getters: {},
  actions: {
    setLogin(value: { username: string; password: string }) {
      this.login = { ...value };
    },
    validateLogin() {
      return this.login.username === "" || this.login.password === "";
    },
    async loginUser(username: string, password: string) {
      const result = await login(username, password);
      if (result.status >= 400) return;

      this.setLogin({
        username: username,
        password: password,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;
    },
    async registerUser(username: string, name: string, password: string) {
      const result = await register(username, name, password);
      if (result?.status >= 400) return;
    },
  },
});
