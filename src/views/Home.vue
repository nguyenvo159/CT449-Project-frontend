<template>
    <div class="container-fluid m-0 p-0">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1" class=""></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2" class=""></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100"
                        src="https://amiri.com/cdn/shop/files/DESKTOP_-slideshow-banner_desktop_core.png" alt="First slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100"
                        src="https://amiri.com/cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-6D.jpg" alt="Second slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100"
                        src="https://amiri.com/cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-1.jpg" alt="Third slide">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <div class="row">
            <div class="col-10 offset-1">
                <hr>
                <router-link :to="{ name: 'productShirt' }" class="main-hover">
                    <h4 class="mt-3">
                        Shirt
                    </h4>
                </router-link>

                <ProductList v-if="filteredShirtsCount > 0" :products="filteredShirts" v-model:activeIndex="activeIndex" />
                <p v-else>Don't have any shirt.</p>

                <hr>

                <router-link :to="{ name: 'productPant' }" class="main-hover">
                    <h4 class="mt-3">
                        Pant
                    </h4>
                </router-link>
                <ProductList v-if="filteredPantsCount > 0" :products="filteredPants" v-model:activeIndex="activeIndex" />
                <p v-else>Don't have any pant.</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import ProductList from "@/components/ProductList.vue";
import ProductService from "@/services/product.service";

export default {
    components: {
        ProductList,
    },
    data() {
        return {
            shirts: [],
            pants: [],
            activeIndex: -1,
            searchText: "",
            maxProductsToShow: 4, // Số lượng sản phẩm tối đa để hiển thị
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        productStrings(products) {
            return products.map((product) => {
                const { name, category, price, description, imgURL } = product;
                return [name, category, price, description, imgURL].join("");
            });
        },
        filteredShirts() {
            if (!this.searchText) {
                return this.shirts.slice(0, this.maxProductsToShow);
            }
            const filtered = this.shirts.filter((_shirt, index) =>
                this.productStrings(this.shirts)[index].includes(this.searchText)
            );
            return filtered.slice(0, this.maxProductsToShow);
        },
        filteredShirtsCount() {
            return this.filteredShirts.length;
        },
        filteredPants() {
            if (!this.searchText) {
                return this.pants.slice(0, this.maxProductsToShow);
            }
            const filtered = this.pants.filter((_pant, index) =>
                this.productStrings(this.pants)[index].includes(this.searchText)
            );
            return filtered.slice(0, this.maxProductsToShow);
        },
        filteredPantsCount() {
            return this.filteredPants.length;
        },
        activeShirt() {
            if (this.activeIndex < 0) return null;
            return this.filteredShirts[this.activeIndex];
        },
        activePant() {
            if (this.activeIndex < 0) return null;
            return this.filteredPants[this.activeIndex];
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
        async retrievePants() {
            try {
                this.pants = await ProductService.getPant();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveShirts();
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