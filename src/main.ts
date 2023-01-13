import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createRouter, useRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("./components/Login/components/Login.vue"),
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("./components/Board/components/ItemBoard.vue"),
    },
  ],
});

const app = createApp(App);

import "./assets/main.scss";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");
