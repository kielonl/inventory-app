import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { LoginStore } from "@/src/types";

import { useRouter } from "vue-router";

export const useLoginStore = defineStore<LoginStore>("loginStore", {
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
