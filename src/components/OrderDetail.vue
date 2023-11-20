<template>
    <div class="card mb-3 rounded-0 flex-row" v-for="(item, index) in items" :key="index">
        <div class="card-img-left d-flex align-items-center">
            <img :src="item.product.imgURL" style="width:80px; height: 80px; object-fit: contain;" class="img-fluid"
                alt="Ảnh sản phẩm">
        </div>
        <div class="pl-3 card-body position-relative">
            <strong class="card-title main-hover">{{ item.product.name }}</strong>
            <p class="price card-text"> <i>${{ item.product.price }}</i> </p>

            <div class="position-absolute" style="right: 20px; bottom: 10px;">
                <p class="">x{{ item.quantity }}</p>
            </div>
        </div>

    </div>
</template>
  
<script>
import ProductService from "@/services/product.service";

export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            productDetails: [],
        };
    },
    async mounted() {
        // Lấy thông tin chi tiết sản phẩm cho mỗi item trong items
        for (const item of this.items) {
            const product = await ProductService.get(item.productId);
            this.productDetails.push({ ...item, product });
        }
    },
};
</script>
  
<style scoped>
.product-info {
    display: flex;
    margin-bottom: 10px;
}

.product-image {
    width: 50px;
    /* Điều chỉnh kích thước ảnh sản phẩm theo ý muốn */
    height: auto;
    margin-right: 10px;
}
</style>
  