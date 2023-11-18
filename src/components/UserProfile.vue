<template>
    <div>
        <h2>User Profile</h2>
        <div v-if="user">
            <p>Name: {{ user.name }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Is Admin: {{ user.isAdmin }}</p>
            <router-link :to="{ name: 'cart' }">View Cart</router-link>
            <a href="/" class="btn btn-dark" @click="logout">Logout</a>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            user: null,
        };
    },
    created() {
        // Lấy thông tin người dùng từ localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.user = user;
        }
    },
    methods: {
        logout() {
            // Xóa thông tin người dùng khi đăng xuất
            localStorage.removeItem("token");
            localStorage.removeItem('user');
            window.location.reload();
            window.location.href = "/";

            // Thực hiện các thao tác cần thiết khi đăng xuất
        },
    },
};
</script>