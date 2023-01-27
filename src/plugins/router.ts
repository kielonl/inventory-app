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
    {
      path: "/qr",
      name: "QRCode",
      component: () => import("../components/QRCode/components/QRCode.vue"),
    },
    {
      path: "/item/:id",
      name: "item",
      component: () =>
        import("../components/SingleItem/components/SingleItem.vue"),
      props: true,
    },
  ],
});

export default router;
