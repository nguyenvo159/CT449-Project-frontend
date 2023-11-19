<template>
    <div class="container d-flex justify-content-center">
        <div class="mt-4 col-md-10 d-flex justify-content-center align-items-center">
            <div class="w-75">
                <h2 class="p-3 text-center">Thêm Sản phẩm</h2>
                <ProductForm :product="newProduct" @submit:product="createProduct" />
                <p>{{ message }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import ProductForm from "@/components/manager/ProductForm.vue";
import ProductService from "@/services/product.service";

export default {
    components: {
        ProductForm,
    },
    data() {
        return {
            newProduct: {
                name: "",
                price: 0,
                category: "",
                imgURL: "",
                description: "",
            },
            message: "",
        };
    },
    methods: {
        async createProduct(data) {
            try {
                await ProductService.create(data);
                this.message = "Đã thêm sản phẩm thành công.";

                // Hiển thị thông báo trong 1 giây trước khi chuyển hướng
                setTimeout(() => {
                    this.$router.push({ name: "product-manager" });
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>