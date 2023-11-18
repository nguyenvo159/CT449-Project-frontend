import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import router from "./router";

import CartService from "@/services/cart.service";

const app = createApp(App);

app.config.globalProperties.$cart = CartService;

app.use(router);
app.mount("#app");

// createApp(App).use(router).mount('#app');
