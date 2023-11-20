<template>
    <div class="container d-flex justify-content-center">
        <div class="mt-4 col-md-10 justify-content-start align-items-center">

            <UserProfile />
            <br>
            <hr>
            <Order />

        </div>




    </div>
</template>
  
<script>

import UserProfile from "@/components/UserProfile.vue";
import Order from "@/views/Order.vue";

export default {
    components: {
        UserProfile,
        Order,
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
            localStorage.removeItem('userId');
            window.location.reload();
            window.location.href = "/";

            // Thực hiện các thao tác cần thiết khi đăng xuất
        },
    },
};
</script>