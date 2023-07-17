<script>
import { mapWritableState } from 'pinia';
import useProductStore from '../stores/product';

export default {
    computed: {
        ...mapWritableState(useProductStore, ['shoppingCart']),
        total() {
            return this.shoppingCart.reduce((total, product) => {
                return total + (product.quantity * product.price)
            }, 0)
        }

    },
    methods: {
        deleteProduct(id) {
            const filter = this.shoppingCart.filter(el => el.id !== id)
            this.shoppingCart = filter
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
        }
    }
}
</script>

<template>
    <section class="container">
        <p v-if="!shoppingCart.length" class="font-semibold text-center text-xl text-red-500">404 Not Found!</p>

        <div class="grid grid-cols-12 gap-8">
            <div class="grid col-span-9">
                <div class="grid grid-cols-4 gap-4">

                    <div v-for="product in shoppingCart" :key="product.id"
                        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">

                        <router-link :to="'/detail/' + product.id">
                            <img class="rounded-t-lg" :src="'/img/' + product.image" alt="" />
                        </router-link>

                        <div class="p-5">
                            <router-link :to="'/detail/' + product.id">
                                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                    {{ product.name }}
                                </h5>
                            </router-link>

                            <p class="mb-3 font-normal text-gray-700">
                                {{ product.description }}
                            </p>

                            <p class="font-medium text-green-400"> {{ formatCurrency(product.price) }}</p>

                            <div class="mt-5 w-full flex gap-2">
                                <input
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                    type="number" min="1" name="quantity" v-model="product.quantity">
                                <button @click="deleteProduct(product.id)"
                                    class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
                                    Delete
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div class="col-span-3 p-5 border">
                <h3 class="mb-8 font-bold text-center text-xl">Shopping Cart</h3>

                <div v-for="product in shoppingCart" :key="product.id" class="mt-2">

                    <div class="">
                        <h5 class="font-medium">
                            {{ product.name }}
                        </h5>

                        <p class=" ">
                            {{ product.quantity }} x {{ product.price }} = {{ product.quantity * product.price }}
                        </p>
                    </div>

                </div>
                <p class="mt-5 font-medium">
                    Total : <span class=" text-green-400"> {{ formatCurrency(total) }}</span>
                </p>

                <button @click="" class="mt-10 w-full btn-login">Chcekout</button>

            </div>
        </div>
    </section>
</template>