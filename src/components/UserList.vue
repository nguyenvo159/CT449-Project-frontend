<template>
    <div>
        <h2>User List</h2>
        <ul>
            <li v-for="user in users" :key="user._id">
                {{ user.name }} - {{ user.email }}
            </li>
        </ul>
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
};
</script>
  