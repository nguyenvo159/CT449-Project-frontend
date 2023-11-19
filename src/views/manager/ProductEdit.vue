<template>
    <div class="container d-flex justify-content-center">
        <div class="mt-4 col-md-10 d-flex justify-content-center align-items-center">
            <div class="w-75">
                <h2 class="p-3 text-center">Chỉnh sửa Sản phẩm</h2>
                <ProductForm :product="product" @submit:product="updateProduct" />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            product: null,
            message: "",
        };
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await ProductService.get(id);
            } catch (error) {
                console.log(error, "không lấy đưuocj product");

            }
        },
        async updateProduct(data) {
            try {
                await ProductService.update(this.product._id, data);
                this.message = "Liên hệ được cập nhật thành công.";

                // Hiển thị thông báo trong 1 giây trước khi chuyển hướng
                setTimeout(() => {
                    this.$router.push({ name: "product-manager" });
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        },

    },
    created() {
        this.getProduct(this.id);
        this.message = "";
    },
};
</script>