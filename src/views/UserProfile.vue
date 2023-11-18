<template>
    <div class="container-fluid d-flex justify-content-center">
        <div class="mt-4 col-md-10 d-flex justify-content-center align-items-center">

            <UserProfile />


        </div>

    </div>
</template>
  
<script>

import UserProfile from "@/components/UserProfile.vue";

export default {
    components: {
        UserProfile,
    },
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