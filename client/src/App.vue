<script>
import axios from "axios";

import Auth from "./views/Auth.vue";
import Home from "./views/Home.vue";
import Category from "./views/Category.vue";
import CategoryAdd from "./views/CategoryPlus.vue";
import Product from "./views/Product.vue";
import ProductAdd from "./views/ProductPlus.vue";

export default {
    components: {
        Auth,
        Home,
        Category,
        CategoryAdd,
        Product,
        ProductAdd,
    },
    data() {
        return {
            base: "http://localhost:3000/",
            page: "Auth",
        };
    },
    methods: {
        getAjax(url, headers) {
            return axios({
                method: "GET",
                url: `${this.base}${url}`,
                headers,
            });
        },
        postAjax(url, data, headers) {
            return axios({
                method: "POST",
                url: `${this.base}${url}`,
                data,
                headers,
            });
        },
        deleteAjax(url, headers) {
            return axios({
                method: "DELETE",
                url: `${this.base}${url}`,
                headers,
            });
        },
        changePage(value) {
            return (this.page = value);
        },
    },
    mounted() {
        const storage = localStorage.getItem("access_token");
        const page = localStorage.getItem("page");
        if (storage) {
            this.page = page;
        }
    },
};
</script>

<template>
    <Auth v-if="page === 'Auth'" :post="postAjax" @change="changePage" />
    <Home
        v-else-if="page === 'Home'"
        :get="getAjax"
        @change="changePage"
        :changePage="changePage"
    />
    <Category
        v-else-if="page === 'Category'"
        :get="getAjax"
        :delete="deleteAjax"
        @change="changePage"
        :changePage="changePage"
    />
    <CategoryAdd
        v-else-if="page === 'Category Add'"
        :post="postAjax"
        @change="changePage"
        :changePage="changePage"
    />
    <Product
        v-else-if="page === 'Product'"
        :get="getAjax"
        :delete="deleteAjax"
        @change="changePage"
        :changePage="changePage"
    />
    <ProductAdd
        v-else-if="page === 'Product Add'"
        :get="getAjax"
        :post="postAjax"
        @change="changePage"
        :changePage="changePage"
    />
</template>
