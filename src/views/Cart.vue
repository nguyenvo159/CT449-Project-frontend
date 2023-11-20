<template>
    <div class="container-fluid d-flex justify-content-center">
        <div class="row w-75">
            <h2 class="w-100 mt-3 mb-3">Giỏ Hàng</h2>
            <ul class="w-100">
                <li v-for="item in cart.items" :key="item.productId" class="position-relative list-unstyled">
                    <CartItem :productId="item.productId" :quantity.sync="item.quantity" />
                    <div class="mt-2 mr-2 position-absolute" style="right: 0; top: 0;">
                        <button class="btn delete-btn" @click="removeItem(item.productId)">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </li>
            </ul>
            <CartTotal :cartItems="cart.items" />
        </div>
    </div>
</template>
  
<script>
import CartService from "@/services/cart.service";
import ProductService from "@/services/product.service";
import CartItem from "@/components/CartItem.vue";
import CartTotal from "@/components/CartTotal.vue";

export default {
    components: {
        CartItem,
        CartTotal,
    },
    data() {
        return {
            cart: {},
        };
    },
    async mounted() {
        try {
            const userId = localStorage.getItem("userId");
            this.cart = await CartService.getCart(userId);
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async removeItem(productId) {
            try {
                const userId = localStorage.getItem("userId");
                await CartService.removeItem(userId, productId);
                this.cart = await CartService.getCart(userId);
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
  