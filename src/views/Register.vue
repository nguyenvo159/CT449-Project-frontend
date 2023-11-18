<template>
    <div class="container d-flex justify-content-center">
        <div class="mt-4 col-md-10 d-flex justify-content-center align-items-center">
            <div class="w-75">
                <h2 class="p-3 text-center">REGISTER</h2>
                <form @submit.prevent="register">
                    <!-- Các trường đăng ký -->
                    <label for="name-register">Name:</label>
                    <input id="name-register" class="form-control" v-model="name" type="text" required />
                    <br />
                    <label for="email-register">Email:</label>
                    <input id="email-register" class="form-control" v-model="email" type="email" required />
                    <br />
                    <label for="password-register">Password:</label>
                    <input id="password-register" class="form-control" v-model="password" type="password" required />
                    <br />
                    <!-- Thêm một lần nữa trường password để xác nhận -->
                    <label for="confirm-password-register">Confirm Password:</label>
                    <input id="confirm-password-register" class="form-control" v-model="confirmPassword" type="password"
                        required />
                    <br />
                    <button class="btn btn-secondary" type="submit">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        };
    },
    methods: {
        async register() {
            try {
                // Kiểm tra xác nhận mật khẩu
                if (this.password !== this.confirmPassword) {
                    console.error("Password and confirm password do not match.");
                    return;
                }

                // Gửi yêu cầu đăng ký
                const user = { name: this.name, email: this.email, password: this.password };
                const response = await UserService.register(user);


                const credentials = { email: this.email, password: this.password };
                const response2 = await UserService.login(credentials);

                // Lưu token và thông tin người dùng vào localStorage
                const token = response2.token;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(response2.user));

                // Tự động chuyển đến trang "/" sau khi đăng ký
                window.location.reload();
                window.location.href = "/";
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
