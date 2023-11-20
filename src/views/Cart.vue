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
            <div class="row w-100 justify-content-between">
                <CartTotal :cartItems="cart.items" />
                <button type="button" class="p-2 pl-4 pr-4 btn btn-dark" data-toggle="modal" data-target="#exampleModal">Đặt
                    hàng</button>
            </div>


            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="exampleModalLabel">Thông tin đặt hàng</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="placeOrder">
                                <div class="form-group">
                                    <label for="name">Tên</label>
                                    <input type="text" class="form-control" id="name" v-model="orderInfo.name" required>
                                </div>
                                <div class="form-group">
                                    <label for="address">Địa chỉ</label>
                                    <input type="text" class="form-control" id="address" v-model="orderInfo.address"
                                        required>
                                </div>
                                <div class="form-group">
                                    <label for="phone">Số điện thoại</label>
                                    <input type="tel" class="form-control" id="phone" v-model="orderInfo.phone" required>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <button type="button" class="btn btn-danger mr-3" data-dismiss="modal">Hủy</button>
                                    <button type="submit" class="btn btn-primary">Đặt hàng</button>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
import CartService from "@/services/cart.service";
import ProductService from "@/services/product.service";
import OrderService from "@/services/order.service";
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
            orderInfo: {
                name: '',
                address: '',
                phone: '',
            },
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
        async placeOrder() {
            try {
                const userId = localStorage.getItem("userId");

                let total = 0;

                for (const item of this.cart.items) {

                    const product = await ProductService.get(item.productId);

                    total += item.quantity * product.price;



                }
                const result = await OrderService.createOrder(
                    userId,
                    this.cart,
                    this.orderInfo.address,
                    this.orderInfo.name,
                    this.orderInfo.phone,
                    total
                );
                await CartService.clearCart(userId);

                this.$router.push("/profile");

                $("#exampleModal").modal("hide");
                console.error("Error placing order. Please try again.");

            } catch (error) {
                console.error("Error placing order:", error);
            }
        },
    },
};
</script>
  