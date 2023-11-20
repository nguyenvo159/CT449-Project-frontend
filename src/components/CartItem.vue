<template>
    <div v-if="productInfo">
        <div class="card mt-3 flex-row border-right-0 border-left-0 border-top-0">
            <div class="card-img-left d-flex align-items-center" style="height: 154px;">
                <img :src="productInfo.imgURL" style="width:154px; height: 100%; object-fit: contain;" class="img-fluid"
                    alt="Ảnh sản phẩm">
            </div>
            <div class="card-body">
                <h5 class="card-title main-hover">{{ productInfo.name }}</h5>
                <p class="price card-text">${{ productInfo.price }}</p>

                <div class="d-flex justify-content-between">
                    <div class="input-group" style="width: 130px;">
                        <div class="input-group-prepend">
                            <button class="btn border rounded-0 decrease-btn" type="submit" @click="decreaseQuantity">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" id="quantity{{ productId }}" name="quantity"
                            class="form-control input-number text-center" :value="localQuantity" @input="handleInput"
                            min="1" max="10" />
                        <div class="input-group-append">
                            <button class="btn border rounded-0 increase-btn" type="submit" @click="increaseQuantity">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <p class="price m-0"> <b class="text-dark">Thành tiền: </b> ${{ calculateTotal() }}</p>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
  
<script>
import ProductService from "@/services/product.service";
import CartService from "@/services/cart.service";

export default {
    props: {
        productId: String,
        quantity: Number,
    },
    data() {
        return {
            productInfo: null,
            localQuantity: this.quantity,
        };
    },
    methods: {
        async updateQuantity(newQuantity) {
            // Gọi phương thức CartService để cập nhật số lượng
            const userId = localStorage.getItem("userId");
            await CartService.updateQuantity(userId, this.productId, newQuantity);

            // Phát một sự kiện để cập nhật prop trong thành phần cha
            this.$emit("update:quantity", newQuantity);
        },
        async decreaseQuantity() {
            if (this.localQuantity > 1) {
                const newQuantity = this.localQuantity - 1;
                this.localQuantity = newQuantity;
                await this.updateQuantity(newQuantity);
            }
        },
        async increaseQuantity() {
            if (this.localQuantity < 10) {
                const newQuantity = this.localQuantity + 1;
                this.localQuantity = newQuantity;
                await this.updateQuantity(newQuantity);
            }
        },
        handleInput() {
            // Số lượng từ 1 >= 10
            if (this.localQuantity < 1) {
                this.localQuantity = 1;
            } else if (this.localQuantity > 10) {
                this.localQuantity = 10;
            }
        },
        calculateTotal() {
            return (this.localQuantity * this.productInfo.price).toFixed(2);
        },
    },
    async mounted() {
        try {
            const product = await ProductService.get(this.productId);
            this.productInfo = product;
        } catch (error) {
            console.error(error);
        }
    },
};
</script>
  