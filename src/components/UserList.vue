<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Chức năng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user._id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <button class="btn" @click="editUser(user._id)">Sửa</button>
                        <button class="btn" @click="deleteUser(user._id)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import UserService from "@/services/user.service";

export default {
    data() {
        return {
            users: [],
        };
    },
    async created() {
        try {
            const response = await UserService.getAllUsers();
            this.users = response.users;
        } catch (error) {
            console.error(error); // handle error (show message, etc.)
        }
    },
    methods: {
        async editUser(userId) {
            // Chuyển hướng đến trang chỉnh sửa người dùng
            // this.$router.push({ name: "user.edit", params: { id: userId } });
        },
        async deleteUser(userId) {
            if (confirm("Bạn muốn xóa người dùng này?")) {
                try {
                    await UserService.deleteUser(userId);
                    // Làm mới danh sách sau khi xóa
                    this.refreshList();
                } catch (error) {
                    console.error(error); // handle error (show message, etc.)
                }
            }
        },
        async refreshList() {
            try {
                const response = await UserService.getAllUsers();
                this.users = response.users;
            } catch (error) {
                console.error(error); // handle error (show message, etc.)
            }
        },
    },
};
</script>
  