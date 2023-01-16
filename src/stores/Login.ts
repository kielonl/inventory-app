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
  },
});
