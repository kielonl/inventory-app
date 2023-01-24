import { createApp } from "vue";
import { createPinia } from "pinia";
import { worker } from "./mocks/browser";
import App from "./App.vue";
import router from "./plugins/router";

import "./assets/main.scss";

// if (import.meta.env.VITE_ENV == "development") {
//   worker.start();
// }

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
