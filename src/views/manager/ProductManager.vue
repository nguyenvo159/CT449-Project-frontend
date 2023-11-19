<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-10 offset-1">
                <div class="mt-3 pb-3 w-100 border-bottom d-flex justify-content-center align-items-center">
                    <InputSearch v-model="searchText" />
                </div>

                <div class="row justify-content-center">
                    <div class="mt-3 col-md-6">
                        <h4 class="mt-3 mb-3">
                            <i class="fa-regular fa-rectangle-list"></i>
                            Danh sách sản phẩm
                        </h4>
                        <button class="mb-2 btn btn-success" @click="goToAddProduct">
                            <i class="fas fa-plus"></i> Thêm sản phẩm
                        </button>
                        <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts"
                            v-model:activeIndex="activeIndex" />
                        <p v-else>Don't have any product.</p>

                        <button class="mt-3 btn btn-primary" @click="refreshList()">
                            <i class="fas fa-redo"></i> Làm mới
                        </button>


                    </div>

                    <div class="mt-3 col-md-6 d-flex pl-5">
                        <div class="pl-3" v-if="activeProduct">
                            <h4 class="mt-3 mb-3">
                                Chi tiết sản phẩm
                                <i class="fa-solid fa-circle-info"></i>
                            </h4>
                            <router-link :to="{ name: 'product.edit', params: { id: activeProduct._id } }">

                                <span class=" btn btn-warning rounded  text-dark ">
                                    <i class="fas fa-edit"></i> <b>Chỉnh sửa</b></span>
                            </router-link>
                            <span class="ml-3 btn btn-danger" @click="deleteProduct(activeProduct._id)">
                                <i class="fa-solid fa-trash"></i> Xóa</span>
                            <ProductCard :product="activeProduct" />

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from "@/components/manager/ProductCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ProductList from "@/components/manager/ProductList.vue";
import ProductService from "@/services/product.service";

export default {
    components: {
        ProductCard,
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
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        productStrings() {
            return this.products.map((product) => {
                const { name, category, price, description, imgURL } = product;
                return [name, category, price, description, imgURL].join("");
            });
        },
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
        async deleteProduct(id) {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await ProductService.delete(id);
                    window.location.reload();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddProduct() {
            this.$router.push({ name: "product.create" });
        },
    },
    mounted() {
        this.refreshList();
    },

};
</script>
