<script>
import axios from "axios";

import Auth from "./views/Auth.vue";
import Home from "./views/Home.vue";

export default {
    components: {
        Auth,
        Home,
    },
    data() {
        return {
            base: "http://localhost:3000/",
            page: "Auth",
        };
    },
    methods: {
        postAjax(url, data, headers) {
            return axios({
                method: "POST",
                url: `${this.base}${url}`,
                data,
                headers,
            });
        },
        changePage(value) {
            return (this.page = value);
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
    <Home
        v-else-if="page === 'Home'"
        @change="changePage"
        :changePage="changePage"
    />
</template>
