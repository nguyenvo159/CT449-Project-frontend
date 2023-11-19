<script>
export default {
    props: {
        product: { type: Object, required: true },

    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <img :src="product.imgURL" alt="imgae" style="height: 150px;">
        </div>

        <div class="p-1">
            <router-link :to="{ name: 'productDetail', params: { id: product._id } }" class="main-hover">
                <strong class="main-hover">{{ product.name }}</strong>
            </router-link>
        </div>



        <div class="p-1">
            <strong>Loại: </strong>
            <i> {{ product.category }}</i>
        </div>

        <div class="p-1">
            <strong>Giá: </strong>
            <i class="price"> ${{ product.price }}</i>
        </div>

        <div class="p-1">
            <strong>Mô tả: </strong>
            <i>{{ product.description }}</i>
        </div>




    </div>
</template>