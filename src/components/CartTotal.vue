<template>
    <div>
        <strong>Tổng tiền: </strong> <span class="price">$ {{ totalAmount }}</span>
    </div>
</template>
  
<script>
import ProductService from "@/services/product.service";

export default {
    props: {
        cartItems: Array,
    },
    data() {
        return {
            totalAmount: 0,
        };
    },
    watch: {
        cartItems: {
            handler: "calculateTotalAmount",
            immediate: true, // Gọi hàm ngay từ khi component được tạo
        },
    },
    methods: {
        async calculateTotalAmount() {
            if (!this.cartItems || !Array.isArray(this.cartItems)) {
                return;
            }
            let total = 0;

            for (const item of this.cartItems) {
                try {
                    const product = await ProductService.get(item.productId);
                    if (product && product.price) {
                        total += item.quantity * product.price;
                    }
                } catch (error) {
                    console.error(error);
                }
            }

            this.totalAmount = total.toFixed(2);
        },
    },
};
</script>
  