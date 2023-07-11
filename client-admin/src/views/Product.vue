<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import ProductList from "../components/products/ProductList.vue";
import ProductAdd from "../components/products/ProductAdd.vue";

export default {
    components: {
        Navbar,
        Sidebar,
        ProductList,
        ProductAdd,
    },
    emits: ["change"],
    props: ["changePage", "get", "post", "patch", "delete"],
    data() {
        return {
            products: [],
            pageProduct: "list",
        };
    },
    methods: {
        changeProduct(value) {
            this.pageProduct = value;
        },
        async getProducts() {
            try {
                const access_token = localStorage.getItem("access_token");
                const { data: products } = await this.get("products", {
                    access_token,
                });

                this.products = products.data;
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProduct(id) {
            try {
                const access_token = localStorage.getItem("access_token");
                await this.delete(`products/${id}`, {
                    access_token,
                });

                this.getProducts();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getProducts();
    },
};
</script>

<template>
    <header class="mx-auto top-0 z-10 container sticky bg-white">
        <Navbar @change="changePage" />
    </header>

    <main class="mx-auto container">
        <div class="grid grid-cols-5 relative h-screen">
            <Sidebar @change="changePage" />

            <div class="col-span-4 border-t-2 border-gray-50">
                <div class="col-span-4 grid gap-12 padding-section">
                    <ProductList v-if="pageProduct === 'list'" :patch="patch" :products="products"
                        :getProducts="getProducts" :deleteProduct="deleteProduct" @change-product="changeProduct" />
                    <ProductAdd v-else-if="pageProduct === 'add'" :get="get" :post="post" :getProducts="getProducts"
                        @change-product="changeProduct" />
                </div>
            </div>
        </div>
    </main>
</template>
