
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-10 offset-1">
                <h2 class="mt-3 mb-3">User Management</h2>
                <h4 class="mt-3 mb-3">
                    <i class="fa-regular fa-rectangle-list"></i>
                    Danh sách user
                </h4>
                <UserList />

            </div>
        </div>
    </div>
</template>
  
<script>
import UserList from "@/components/UserList.vue";

export default {
    components: {
        UserList,
        // UserCreateForm,
    },
};
</script>
  