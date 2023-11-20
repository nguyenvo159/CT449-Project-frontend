import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import ProductList from "@/views/ProductList.vue";
import ProductShirt from "@/views/ProductShirt.vue";
import ProductPant from "@/views/ProductPant.vue";
import ProductDetail from "@/views/ProductDetail.vue"
import ProductManager from "@/views/manager/ProductManager.vue"
import ProductEdit from "@/views/manager/ProductEdit.vue"
import ProductCreate from "@/views/manager/ProductCreate.vue"


import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import UserProfile from "@/views/UserProfile.vue";
import UserManager from "@/views/UserManager.vue";
import UserEdit from "@/views/UserEdit.vue";

import Cart from "@/views/Cart.vue";



const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/about",
        name: "about",
        component: About,
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
    {
        path: "/product-manager",
        name: "product-manager",
        component: ProductManager,
        meta: { requiresAuth: true },
    },
    {
        path: "/product/edit/:id",
        name: "product.edit",
        component: ProductEdit,
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: "/product/create",
        name: "product.create",
        component: ProductCreate,
        props: true,
        meta: { requiresAuth: true },
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
        path: "/user-manager",
        name: "user-manager",
        component: UserManager,
        meta: { requiresAuth: true },
    },

    {
        path: "/user/edit/:id",
        name: "user.edit",
        component: UserEdit,
        props: true,
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
    const isAdmin = isAdminUser();
    if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
        next("/login");
    }
    else if (to.name == "product-manager" && !isAdmin) {
        next("/");
    }
    else if (to.name == "product.create" && !isAdmin) {
        next("/");
    }
    else if (to.name == "product.edit" && !isAdmin) {
        next("/");
    }
    else if (to.name == "user-manager" && !isAdmin) {
        next("/");
    }
    else {
        next();
    }
});

function isAdminUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.isAdmin === true;
}

export default router;
