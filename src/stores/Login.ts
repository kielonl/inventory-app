import { login } from "@/services/userService";
import { defineStore } from "pinia";

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
      if (result.request.status >= 400) return;

      this.setLogin({
        username: username,
        password: password,
      });
    },
  },
});
