<script>
export default {
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex", "productClick"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
            this.$emit("productClick", index);
        }
    }
};
</script>
<template>
    <!-- <ul class="list-group">
        <li class="list-group-item" v-for="(product, index) in products" :key="product._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ product.name }}
        </li>
    </ul> -->

    <div class="row justify-content-start">
        <!-- Card -->
        <div v-for="(product, index) in products" :key="product._id"
            class=" justify-content-center mb-3 col-lg-3 col-md-4 col-6 pr-3">
            <div class="card-container">
                <div class="card border-0 ">
                    <img class="card-img-top " style="height: 240px; width: auto; object-fit: contain;"
                        :src="product.imgURL">
                    <a type="button" class="icon-cardplus card-overlay">
                        <i class="fa-solid fa-cart-plus"></i>
                    </a>
                    <div class="card-body text-center text-justify">
                        <router-link :to="{ name: 'productDetail', params: { id: product._id } }"
                            class="h5 card-title main-hover">
                            {{ product.name }}
                        </router-link>
                        <!-- <h5 class="card-title main-hover">{{ product.name }}</h5> -->
                        <div class="row justify-content-around p-3">
                            <span class="price">${{ product.price }}</span>
                            <span class="compare-price">$99.99</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>