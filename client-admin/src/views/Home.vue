<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
    components: {
        Navbar,
        Sidebar,
    },
    emits: ["change"],
    props: ["changePage", "get"],
    data() {
        return {
            categories: [],
            products: [],
        };
    },
    methods: {
        async getCategories() {
            try {
                const access_token = localStorage.getItem("access_token");
                const { data: categories } = await this.get("categories", {
                    access_token,
                });

                this.categories = categories.data;
            } catch (error) {
                console.log(error);
            }
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
    },
    mounted() {
        this.getCategories();
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
                    <!-- start: Dashboard -->
                    <div class="px-12">
                        <h2 class="font-bold text-3xl">Dashboard</h2>

                        <div class="mt-10 flex gap-10">
                            <div class="px-8 py-5 border-2 rounded-lg">
                                <p
                                    class="mb-2 text-center font-semibold text-3xl"
                                >
                                    {{ products.length }}
                                </p>
                                <p class="text-gray-500">Total Products</p>
                            </div>
                            <div class="px-8 py-5 border-2 rounded-lg">
                                <p
                                    class="mb-2 text-center font-semibold text-3xl"
                                >
                                    {{ categories.length }}
                                </p>
                                <p class="text-gray-500">Total Categories</p>
                            </div>
                        </div>
                    </div>
                    <!-- end: Dashboard -->
                </div>
            </div>
        </div>
    </main>
</template>
