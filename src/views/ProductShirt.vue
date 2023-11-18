<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-10 offset-1">
                <!-- Search -->
                <div class="mt-3 w-100 d-flex justify-content-center align-items-center">
                    <InputSearch v-model="searchText" />
                </div>
                <hr>
                <router-link :to="{ name: 'productShirt' }" class="h4 mt-3 main-hover ">
                    Shirt
                </router-link>

                <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts"
                    v-model:activeIndex="activeIndex" />

            </div>
        </div>
    </div>
</template>
  
<script>
import InputSearch from "@/components/InputSearch.vue";
import ProductList from "@/components/ProductList.vue";
import ProductService from "@/services/product.service";

export default {
    components: {
        InputSearch,
        ProductList,

    },
    data() {
        return {
            shirts: [],
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
        // Chuyển các đối tượng product thành chuỗi để tiện cho tìm kiếm.
        productStrings() {
            return this.shirts.map((shirt) => {
                const { name, category, price, description, imgURL } = shirt;
                return [name, category, price, description, imgURL].join("");
            });
        },
        // Trả về các sản phẩm áo có chứa thông tin cần tìm kiếm.
        filteredProducts() {
            if (!this.searchText) return this.shirts;
            return this.shirts.filter((_shirt, index) =>
                this.productStrings[index].includes(this.searchText)
            );
        },
        activeShirt() {
            if (this.activeIndex < 0) return null;
            return this.filteredProducts[this.activeIndex];
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
    },
    methods: {
        async retrieveShirts() {
            try {
                this.shirts = await ProductService.getShirt();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveShirts();
            this.activeIndex = -1;
        },
    },
    mounted() {
        console.log("Component is mounted!");
        this.refreshList();
    },
};
</script>
  
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>
  