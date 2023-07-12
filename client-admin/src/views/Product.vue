<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import ProductList from "../components/products/ProductList.vue";
import ProductAdd from "../components/products/ProductAdd.vue";
import ProductEdit from "../components/products/ProductEdit.vue";

export default {
    components: {
        Navbar,
        Sidebar,
        ProductList,
        ProductAdd,
        ProductEdit,
    },
    emits: ["change"],
    props: ["changePage", "get", "post", "patch", "put", "delete", "errorMessage"],
    data() {
        return {
            user: {},
            product: {},
            products: [],
            pageProduct: "list",
        };
    },
    methods: {
        changeProduct(value) {
            this.pageProduct = value;
        },
        getProduct(value) {
            this.product = value
        },
        async getProducts() {
            try {
                const access_token = localStorage.getItem("access_token");
                const { data: product } = await this.get("products", {
                    access_token,
                });

                this.user = product.user;
                this.products = product.data;
            } catch (error) {
                console.log(error);
                this.errorMessage(error)
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
                    <ProductList v-if="pageProduct === 'list'" :get="get" :patch="patch" :user="user" :products="products"
                        :getProducts="getProducts" :deleteProduct="deleteProduct" @get-product="getProduct"
                        @change-product="changeProduct" />
                    <ProductAdd v-else-if="pageProduct === 'add'" :get="get" :post="post" :getProducts="getProducts"
                        @change-product="changeProduct" />
                    <ProductEdit v-else-if="pageProduct === 'edit'" :get="get" :put="put" :product="product"
                        :getProducts="getProducts" @change-product="changeProduct" />
                </div>
            </div>
        </div>
    </main>
</template>
