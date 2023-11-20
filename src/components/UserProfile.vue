<template>
    <div>
        <h2>User Profile</h2>
        <div v-if="user">
            <p>Name: {{ user.name }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Is Admin: {{ user.isAdmin }}</p>
            <button class="btn btn-primary" @click="editUser(user._id)">Sửa</button>

            <a href="/" class=" ml-3 btn btn-dark" @click="logout">

                <i class="fa-solid fa-right-from-bracket"></i> Logout</a>
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
        async editUser(userId) {
            // Chuyển hướng đến trang chỉnh sửa người dùng
            this.$router.push({ name: "user.edit", params: { id: userId } });
        },
        logout() {
            // Xóa thông tin người dùng khi đăng xuất
            localStorage.removeItem("token");
            localStorage.removeItem('user');
            localStorage.removeItem('userId');
            window.location.reload();
            window.location.href = "/";

            // Thực hiện các thao tác cần thiết khi đăng xuất
        },
    },
};
</script>