<script>
import axios from "axios";

import Auth from "./views/Auth.vue";
import Home from "./views/Home.vue";
import Category from "./views/Category.vue";
import Product from "./views/Product.vue";
import Log from "./views/Log.vue";

export default {
    components: {
        Auth,
        Home,
        Category,
        Product,
        Log,
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
        patchAjax(url, data, headers) {
            return axios({
                method: "PATCH",
                url: `${this.base}${url}`,
                data,
                headers,
            });
        },
        putAjax(url, data, headers) {
            return axios({
                method: "PUT",
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
        errorMessage(value) {
            const errorMessage = value.response.data.message
            this.$toast.error(errorMessage, { position: 'top-right' })

            if (value.response.status === 401) {
                this.page = 'Auth'
            }
        },
    },
    mounted() {
        const storage = localStorage.getItem("access_token");
        if (storage) {
            this.page = "Home";
        }
    },
};
</script>

<template>
    <Auth v-if="page === 'Auth'" :post="postAjax" @change="changePage" />
    <Home v-else-if="page === 'Home'" :get="getAjax" @change="changePage" :changePage="changePage"
        :errorMessage="errorMessage" />
    <Category v-else-if="page === 'Category'" :get="getAjax" :post="postAjax" :delete="deleteAjax" @change="changePage"
        :changePage="changePage" :errorMessage="errorMessage" />
    <Product v-else-if="page === 'Product'" :get="getAjax" :post="postAjax" :patch="patchAjax" :put="putAjax"
        :delete="deleteAjax" @change="changePage" :changePage="changePage" :errorMessage="errorMessage" />
    <Log v-else-if="page === 'Log'" :get="getAjax" @change="changePage" :changePage="changePage"
        :errorMessage="errorMessage" />
</template>
