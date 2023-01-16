import { defineStore } from "pinia";
import { login } from "@/services/itemService";

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

      this.setLogin({
        username: result.username,
        password: result.password,
      });
    },
  },
});
