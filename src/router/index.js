import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import ProductList from "@/views/ProductList.vue";
import ProductShirt from "@/views/ProductShirt.vue";
import ProductPant from "@/views/ProductPant.vue";
import ProductDetail from "@/views/ProductDetail.vue"

import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import UserProfile from "@/views/UserProfile.vue";
import UserManager from "@/views/UserManager.vue";

import Cart from "@/views/Cart.vue";



const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/product",
        name: "productList",
        component: ProductList,
    },
    {
        path: "/shirt",
        name: "productShirt",
        component: ProductShirt,
    },
    {
        path: "/pant",
        name: "productPant",
        component: ProductPant,
    },
    {
        path: "/product/:id",
        name: "productDetail",
        component: ProductDetail,
    },


    // Auth
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/user/:id",
        name: "userProfile",
        component: UserProfile,
        meta: { requiresAuth: true },
    },
    {
        path: "/userManage",
        name: "userManage",
        component: UserManager,
        meta: { requiresAuth: true },
    },
    {
        path: "/cart",
        name: "cart",
        component: Cart,
        meta: { requiresAuth: true },
    },


];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// Kiểm tra xem người dùng đã đăng nhập khi chuyển đến trang cần đăng nhập
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem("token") !== null;
    if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
        next("/login");
    } else {
        next();
    }
});

export default router;
