<template>
    <div class=" p-0">
        <h2 class="mt-3 mb-4">Đơn hàng</h2>
        <div v-if="orders.length === 0">
            <p>Không có đơn hàng nào.</p>
        </div>
        <div v-else>
            <div v-for="order in orders" :key="order._id" class="order-item position-relative">
                <p><strong><i>{{ formatDate(order.orderDate) }}</i></strong></p>
                <p><strong>Mã: </strong> <i>{{ order._id }}</i></p>
                <p><strong>Tên người nhận:</strong> {{ order.name }}, {{ order.phone }}</p>
                <p><strong>Địa chỉ:</strong> {{ order.address }} </p>

                <p class="position-absolute" style="right: 10px; top: 160px;"><strong>Tổng tiền: &nbsp</strong>
                    <i class="price">${{ order.totalMoney }}</i>
                </p>

                <a @click="cancelOrder(order._id)" class="pr-2 position-absolute text-decoration-none text-dark"
                    style=" cursor: pointer ;right: 10px; top: 10px;"><i>Hủy đơn
                        hàng</i></a>

                <a class=" mb-3" data-toggle="collapse" :href="`#collapse${order._id}`" aria-expanded="false"
                    aria-controls="collapse">
                    Xem chi tiết
                </a>
                <div class="collapse mt-3" :id="`collapse${order._id}`">
                    <div class="">
                        <OrderDetail :items="order.cart.items" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import OrderService from "@/services/order.service";
import { format } from "date-fns";
import OrderDetail from "@/components/OrderDetail.vue";
export default {
    components: {
        OrderDetail,
    },
    data() {
        return {
            orders: [],
        };
    },
    mounted() {
        this.loadOrders();
    },
    methods: {
        async loadOrders() {
            try {
                const userId = localStorage.getItem("userId");
                this.orders = await OrderService.getUserOrders(userId);
            } catch (error) {
                console.error("Error loading orders:", error);
            }
        },
        formatDate(dateString) {
            const formattedDate = format(new Date(dateString), "HH:mm dd/MM/yyyy ");
            return formattedDate;
        },
        async cancelOrder(orderId) {
            try {
                // hàm để hủy đơn hàng 
                const userId = localStorage.getItem("userId");
                const result = await OrderService.deleteOrder(userId, orderId);
                console.log("Order canceled successfully:", result);

                // Sau khi hủy đơn hàng, làm mới danh sách đơn hàng
                this.loadOrders();
            } catch (error) {
                console.error("Error canceling order:", error);
            }
        },
    },
};
</script>
  
<style>
.order-item {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
}
</style>
  