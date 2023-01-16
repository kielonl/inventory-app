import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("../components/Login/components/LoginPage.vue"),
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../components/Board/components/ItemBoard.vue"),
    },
  ],
});

export default router;
