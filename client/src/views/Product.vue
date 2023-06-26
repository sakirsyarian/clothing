<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
    components: {
        Navbar,
        Sidebar,
    },
    emits: ["change"],
    props: ["changePage", "get", "delete"],
    data() {
        return {
            products: [],
        };
    },
    methods: {
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
            } catch (error) {
                console.log(error);
            }
        },
        localDate(index) {
            const dateFormat = this.products.map((product) => {
                const date = new Date(product.createdAt);

                return date.toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
            });

            return dateFormat[index];
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
                    <!-- start: Product -->
                    <section class="px-12">
                        <div class="flex justify-between">
                            <h2 class="font-bold text-3xl">Products</h2>
                            <button
                                type="button"
                                class="px-3 py-2 flex items-center button-add"
                                @click="this.$emit('change', 'Product Add')"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5"
                                >
                                    <path
                                        strbaseUrloke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                    />
                                </svg>
                                <span class="ml-2">Add</span>
                            </button>
                        </div>

                        <div class="mt-10 relative overflow-x-auto">
                            <table
                                class="w-full text-sm text-left text-gray-500"
                            >
                                <thead
                                    class="text-xs text-gray-700 uppercase bg-gray-50"
                                >
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            No
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Stock
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Created
                                        </th>
                                        <th scope="col" class="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        class="bg-white border-b"
                                        v-for="(product, index) in products"
                                        :key="product.id"
                                    >
                                        <td class="px-6 py-4">
                                            {{ index + 1 }}
                                        </td>
                                        <th
                                            scope="row"
                                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {{ product.name }}
                                        </th>
                                        <td class="px-6 py-4">
                                            {{ product.price }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ product.stock }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ product.Category.name }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ localDate(index) }}
                                        </td>
                                        <td class="px-6 py-4">
                                            <a
                                                href=""
                                                class="font-medium text-red-600"
                                                @click="
                                                    deleteProduct(product.id)
                                                "
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="w-6 h-6"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <!-- end: Product -->
                </div>
            </div>
        </div>
    </main>
</template>
