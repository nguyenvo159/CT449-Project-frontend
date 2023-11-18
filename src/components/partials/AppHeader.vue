<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="p-2 ml-3 navbar-brand" href="/">Fashion</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="mx-auto collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="mx-auto navbar-nav">
                <li class="p-2 mr-3 ml-3 nav-item">
                    <a class="nav-link" href="/">Home</a>
                </li>

                <li class="p-2 mr-3 ml-3 nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                        Products
                    </a>
                    <div class="dropdown-menu">
                        <router-link :to="{ name: 'productList' }" class="dropdown-item">
                            All Products
                        </router-link>
                        <router-link :to="{ name: 'productShirt' }" class="dropdown-item">
                            Shirts
                        </router-link>
                        <router-link :to="{ name: 'productPant' }" class="dropdown-item">
                            Pants
                        </router-link>

                    </div>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item">
                    <a class="nav-link" href="test.html">Contact</a>
                </li>

                <li class="p-2 mr-3 ml-3 nav-item" v-if="!isLoggedIn">
                    <router-link to="/login" class="nav-link">Login</router-link>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item" v-if="!isLoggedIn">
                    <router-link to="/register" class="nav-link">Register</router-link>
                </li>

                <li class="p-2 mr-3 ml-3 nav-item" v-if="isLoggedIn">
                    <a @click="logout" href="/" class="nav-link">Logout</a>
                </li>

            </ul>
        </div>

        <div class="icon-nav d-flex justify-content-center align-items-center position-absolute mr-5"
            style="right: 30px; top: 20px;">

            <div class=" d-flex align-items-center">
                <a id="search-btn" class="ml-3 text-dark" href="#"><i class="fa-solid fa-magnifying-glass fa-lg"></i></a>
                <a class="ml-3 text-dark" href="/cart.php">
                    <i class="fa-solid fa-cart-shopping fa-lg"></i></a>

                <router-link :to="{ name: 'userProfile', params: { id: 'currentUserId' } }" class="ml-3 text-dark"
                    v-if="isLoggedIn">
                    <i class="fa-solid fa-user fa-lg"></i>
                </router-link>
            </div>

        </div>
    </nav>
</template>

<script>
import UserService from "@/services/user.service";

export default {
    computed: {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        isLoggedIn() {
            return localStorage.getItem("token") !== null;
        },
    },
    methods: {
        // Hàm logout
        async logout() {
            try {
                // Xóa token khỏi localStorage
                localStorage.removeItem("token");


            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>