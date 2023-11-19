<template>
    <div class="container-fluid">
        <div v-if="product" class=" col-10 offset-1 row">
            <div class="mt-3 mb-3 col-12">
                <h2>Sản phẩm
                    / {{ product.category }}
                </h2>
            </div>
            <div class="col-lg-7 col-12 mr-3">
                <div id="carouselExampleControls" class="carousel slide border" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item">
                            <img :src="product.imgURL" class="d-block w-100" style="height: 500px; object-fit: contain;"
                                alt="image">
                        </div>
                        <div class="carousel-item active">
                            <img :src="product.imgURL" class="d-block w-100" style="height: 500px; object-fit: contain;"
                                alt="image">
                        </div>
                        <div class="carousel-item">
                            <img :src="product.imgURL" class="d-block w-100" style="height: 500px; object-fit: contain;"
                                alt="image">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-target="#carouselExampleControls"
                        data-slide="prev">
                        <span class="" aria-hidden="true">
                            <i class="fa-solid fa-chevron-left" style="color: #000;"></i>
                        </span>
                        <span class="sr-only">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-target="#carouselExampleControls"
                        data-slide="next">
                        <span class="" aria-hidden="true">
                            <i class="fa-solid fa-chevron-right" style="color: #000;"></i>
                        </span>
                        <span class="sr-only">Next</span>
                    </button>
                </div>
            </div>


            <div class="p-4 col-lg-4 col-12">
                <h3 class="card-title main-hover" data-product-id="24">{{ product.name }}</h3>
                <hr>
                <h4><span class="price">${{ product.price }}</span></h4> <br>
                <div>
                    <h5>Mô tả:</h5>
                    <p>Thông tin sản phẩm: <br>
                        {{ product.description }}</p>
                </div>
                <br>
                <h5>Số lượng:</h5>
                <div class="input-group mb-3" style="width: 130px;">

                    <input type="hidden" name="productID" :value="product._id">

                    <div class="input-group-prepend">
                        <button class="btn border rounded-0 decrease-quantity">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                    <input type="text" id="quantityDetail" name="quantity" class="form-control input-number text-center"
                        value="1" min="1" max="100">
                    <div class="input-group-append">
                        <button class="btn border rounded-0 increase-quantity">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>

                <button class="addFromDetai btn btn-dark pl-3 p-2 pr-3 rounded-0" @click="addToCart">Thêm vào giỏ</button>

                <!-- </form> -->

                <br> <br>

            </div>
            <div class="col-lg-7 col-12 mt-4">
                <p class="p-2 text-justify"><b>Hướng dẫn bảo quản sản phẩm:</b> <br><br>

                    - Ngâm áo vào NƯỚC LẠNH có pha giấm hoặc phèn chua từ trong 2 tiếng đồng hồ<br><br>

                    - Giặt ở nhiệt độ bình thường, với đồ có màu tương tự.<br><br>

                    - Không dùng hóa chất tẩy.<br><br>

                    - Hạn chế sử dụng máy sấy và ủi (nếu có) thì ở nhiệt độ thích hợp.<br><br><br>


                    <b>Chính sách bảo hành:</b><br><br>

                    - Miễn phí đổi hàng cho khách mua ở shop trong trường hợp bị lỗi từ nhà sản xuất, giao nhầm hàng, bị hư
                    hỏng
                    trong quá trình vận chuyển hàng.<br><br>

                    - Sản phẩm đổi trong thời gian 3 ngày kể từ ngày nhận hàng<br><br>

                    - Sản phẩm còn mới nguyên tem, tags và mang theo hoá đơn mua hàng, sản phẩm chưa giặt và không dơ bẩn,
                    hư
                    hỏng bởi những tác nhân bên ngoài cửa hàng sau khi mua hàng.
                </p>
            </div>

        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>
  
<script>
import ProductService from "@/services/product.service";
import CartService from "@/services/cart.service";

export default {
    data() {
        return {
            product: null,
        };
    },
    methods: {
        async addToCart() {
            try {
                const userId = localStorage.getItem('userId');
                const productId = this.product._id;
                const quantity = parseInt(document.getElementById('quantityDetail').value);

                await CartService.addToCart(userId, productId, quantity);
                const updatedCart = await CartService.getCart(userId);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
            } catch (error) {
                console.error(error);
            }
        },
    },
    async mounted() {
        // Lấy thông tin sản phẩm từ API sử dụng ProductService
        try {
            const productId = this.$route.params.id;
            this.product = await ProductService.get(productId);
        } catch (error) {
            console.error(error);
        }
    },
};
</script>
  