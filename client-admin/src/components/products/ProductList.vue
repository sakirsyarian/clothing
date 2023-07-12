<script>
import { initDropdowns } from 'flowbite'

export default {
    emits: ["get-product", "change-product"],
    props: ["get", "patch", "user", "products", "getProducts", "deleteProduct"],
    methods: {
        async updateStatus(id, status) {
            try {
                const access_token = localStorage.getItem('access_token')
                await this.patch(
                    `products/${id}`,
                    { status },
                    { access_token }
                )

                this.getProducts()
                this.$toast.success('Product updated', { position: 'top-right' })
            } catch (error) {
                console.log(error);
            }
        },
        async editProduct(id) {
            try {
                const access_token = localStorage.getItem("access_token");
                const { data: product } = await this.get(
                    `products/${id}`,
                    { access_token }
                );

                this.$emit('get-product', product.data)
                this.$emit('change-product', 'edit')
            } catch (error) {
                console.log(error);
            }
        },
    },
    updated() {
        initDropdowns();
    },
};
</script>

<template>
    <section class="px-12">
        <div class="flex justify-between">
            <h2 class="font-bold text-3xl">Products</h2>
            <button type="button" class="px-3 py-2 flex items-center button-add"
                @click="this.$emit('change-product', 'add')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path strbaseUrloke-linecap="round" stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span class="ml-2">Add</span>
            </button>
        </div>

        <div class="mt-10 relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">No</th>
                        <th scope="col" class="px-6 py-3">Name</th>
                        <th scope="col" class="px-6 py-3">Price</th>
                        <th scope="col" class="px-6 py-3">Stock</th>
                        <th scope="col" class="px-6 py-3">Category</th>
                        <th scope="col" class="px-6 py-3">Author</th>
                        <th scope="col" class="px-6 py-3">Status</th>
                        <th scope="col" class="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b" v-for="(product, index) in products" :key="product.id">
                        <td class="px-6 py-4">
                            {{ index + 1 }}
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
                            {{ product.User.username }}
                        </td>
                        <td class="px-6 py-4">
                            <div v-if="user.id !== 1">
                                {{ product.status }}
                            </div>
                            <!-- Appear when user is admin -->
                            <div v-else>
                                <button id="dropdownDefaultButton" :data-dropdown-toggle="'dropdown' + index"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button"> {{ product.status }} <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                <!-- Dropdown menu -->
                                <div :id="'dropdown' + index"
                                    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                    <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                                        <li v-if="product.status !== 'Active'" @click="updateStatus(product.id, 'Active')">
                                            <p class="block px-4 py-2 hover:bg-gray-100">Active</p>
                                        </li>
                                        <li v-if="product.status !== 'Inactive'"
                                            @click="updateStatus(product.id, 'Inactive')">
                                            <p class="block px-4 py-2 hover:bg-gray-100">Inactive</p>
                                        </li>
                                        <li v-if="product.status !== 'Archived'"
                                            @click="updateStatus(product.id, 'Archived')">
                                            <p class="block px-4 py-2 hover:bg-gray-100">Archived</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </td>
                        <td class="py-4">
                            <div v-if="user.id === 1">
                                <a href="" class="font-medium text-yellow-400" @click.prevent="editProduct(product.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </a>
                            </div>
                            <div v-else-if="user.id === product.UserId">
                                <a href="" class="font-medium text-yellow-400" @click.prevent="editProduct(product.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
