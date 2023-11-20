<!-- EditUserPage.vue -->
<template>
    <div class="container d-flex justify-content-center">
        <div class="mt-4 col-md-10 d-flex justify-content-center align-items-center">
            <div class="w-75">
                <h2 class="p-3 text-center">Chỉnh sửa người dùng</h2>
                <form @submit.prevent="updateUser">
                    <div class="mb-3">
                        <label for="name" class="form-label">Tên:</label>
                        <input type="text" class="form-control" v-model="editedUser.name" id="name" required />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" class="form-control" v-model="editedUser.email" id="email" required />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Mật khẩu:</label>
                        <div class="input-group">
                            <input class="form-control" v-model="editedUser.password" id="password"
                                :type="showPassword ? 'text' : 'password'" required />
                            <button class="btn btn-outline-secondary" type="button" @click="toggleShowPassword">
                                <i v-if="showPassword" class="fa-solid fa-eye"></i>
                                <i v-else class="fa-solid fa-eye-slash"></i>
                                Mật khẩu
                            </button>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Lưu</button>
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
            userId: null,
            editedUser: {
                name: "",
                email: "",
                password: "",
            },
            showPassword: false,
        };
    },
    async created() {
        this.userId = this.$route.params.id;
        try {
            const response = await UserService.getUserProfile(this.userId);
            this.editedUser = { ...response.user };
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async updateUser() {
            try {
                await UserService.updateUser(this.userId, this.editedUser);
                this.$router.push({ name: "user-manager" });
            } catch (error) {
                console.error(error);
            }
        },
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>
  