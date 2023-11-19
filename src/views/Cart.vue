<template>
    <div>
        <h2>Giỏ Hàng</h2>
        <ul>
            <li v-for="item in cart.items" :key="item.product._id">
                {{ item.product.name }} - Số Lượng: {{ item.quantity }}
                <button @click="removeItem(item.product._id)">Xóa</button>
            </li>
        </ul>
    </div>
</template>
  
<script>
import CartService from "@/services/cart.service";

export default {
    data() {
        return {
            cart: null,
        };
    },
    async mounted() {
        try {
            const userId = localStorage.getItem('userId'); // Thay thế bằng ID người dùng thực tế
            this.cart = await CartService.getCart(userId);
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async removeItem(productId) {
            try {
                const userId = localStorage.getItem('userId'); // Thay thế bằng ID người dùng thực tế
                await CartService.removeItem(userId, productId);
                this.cart = await CartService.getCart(userId);
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>