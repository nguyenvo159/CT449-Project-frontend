<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-10 offset-1">
                <!-- Search -->
                <div class="mt-3 w-100 d-flex justify-content-center align-items-center">
                    <InputSearch v-model="searchText" />
                </div>
                <hr>
                <router-link :to="{ name: 'productPant' }" class="h4 mt-3 main-hover">
                    Pant
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
            pants: [],
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
        // Chuyển các đối tượng product thành chuỗi để tiện cho tìm kiếm.
        productStrings() {
            return this.pants.map((pant) => {
                const { name, category, price, description, imgURL } = pant;
                return [name, category, price, description, imgURL].join("");
            });
        },
        // Trả về các sản phẩm quần có chứa thông tin cần tìm kiếm.
        filteredProducts() {
            if (!this.searchText) return this.pants;
            return this.pants.filter((_pant, index) =>
                this.productStrings[index].includes(this.searchText)
            );
        },
        activePant() {
            if (this.activeIndex < 0) return null;
            return this.filteredProducts[this.activeIndex];
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
    },
    methods: {
        async retrievePants() {
            try {
                this.pants = await ProductService.getPant();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievePants();
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
  