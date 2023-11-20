<template>
    <div class="container d-flex justify-content-center">
        <div class="mt-4 col-md-10 d-flex justify-content-center align-items-center">
            <div class="w-75">
                <h2 class="p-3 text-center">LOGIN</h2>
                <form @submit.prevent="login">
                    <label for="email-login">Email:</label>
                    <input id="email-login" class="form-control" v-model="email" type="email" required />
                    <br />
                    <label for="password-login">Password:</label>
                    <input id="password-login" class="form-control" v-model="password" type="password" required />
                    <span class="text-danger mt-1 mb-2" v-if="loginError">Thông tin đăng nhập sai</span>
                    <br />
                    <button class="btn btn-secondary mt-2" type="submit">Login</button>
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
            email: "",
            password: "",
            loginError: false,
        };
    },
    methods: {
        async login() {
            try {
                this.loginError = false;

                const credentials = { email: this.email, password: this.password };
                const response = await UserService.login(credentials);

                // Lưu token và thông tin người dùng vào localStorage
                const token = response.token;
                const user = response.user;

                localStorage.setItem("userId", user._id);
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(response.user));

                console.log(response); // handle success (store token, redirect, etc.);
                window.location.reload();
                window.location.href = "/";
            } catch (error) {
                this.loginError = true;

                console.error(error, "Sai"); // handle error (show message, etc.)
            }
        },
    },
};
</script>