
<template>
    <div>
        <h2>User Management</h2>
        <UserList />
        <hr />
        <h3>Create New User</h3>
        <UserCreateForm />
    </div>
</template>
  
<script>
import UserList from "@/components/UserList.vue";
// import UserCreateForm from "@/components/UserCreateForm.vue";

export default {
    components: {
        UserList,
        // UserCreateForm,
    },
};
</script>
  