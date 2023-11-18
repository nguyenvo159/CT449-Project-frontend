<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-10 offset-1">
                <!-- Search -->
                <div class="mt-3 w-100 d-flex justify-content-center align-items-center">
                    <InputSearch v-model="searchText" />
                </div>
                <hr>
                <router-link :to="{ name: 'productList' }" class="h4 mt-3 main-hover">
                    Product
                </router-link>

                <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts"
                    v-model:activeIndex="activeIndex" />


            </div>
        </div>
    </div>
</template>

<script>
// import ProductDetail from "@/components/ProductDetail.vue";
import InputSearch from "@/components/InputSearch.vue";
import ProductList from "@/components/ProductList.vue";
import ProductService from "@/services/product.service";

export default {
    components: {
        // ProductDetail,
        InputSearch,
        ProductList,
    },
    data() {
        return {
            products: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        productStrings() {
            return this.products.map((product) => {
                const { name, category, price, description, imgURL } = product;
                return [name, category, price, description, imgURL].join("");
            });
        },
        // Trả về các product có chứa thông tin cần tìm kiếm.
        filteredProducts() {
            if (!this.searchText) return this.products;
            return this.products.filter((_product, index) =>
                this.productStrings[index].includes(this.searchText)
            );
        },
        activeProduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredProducts[this.activeIndex];
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
    },
    methods: {
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveProducts();
            this.activeIndex = -1;
        },

        goToProductDetail(index) {
            const productId = this.filteredProducts[index]._id;
            // Chuyển hướng đến trang Chi tiết sản phẩm
            this.$router.push({ name: 'productDetail', params: { id: productId } });
        },

    },
    mounted() {
        console.log("Component is mounted!");
        this.refreshList();
    },

};
</script>


<style scoped></style>