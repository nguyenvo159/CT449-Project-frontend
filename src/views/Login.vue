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
                    <br />
                    <button class="btn btn-secondary" type="submit">Login</button>
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
        };
    },
    methods: {
        async login() {
            try {
                const credentials = { email: this.email, password: this.password };
                const response = await UserService.login(credentials);

                // Lưu token và thông tin người dùng vào localStorage
                const token = response.token;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(response.user));

                console.log(response); // handle success (store token, redirect, etc.);
                window.location.reload();
                window.location.href = "/";
            } catch (error) {
                console.error(error); // handle error (show message, etc.)
            }
        },
    },
};
</script>