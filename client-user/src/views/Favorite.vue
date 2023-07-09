<script>
import { mapState } from 'pinia';
import useProductStore from '../stores/product';

export default {
    computed: {
        ...mapState(useProductStore, ['bookmark'])
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
        }
    }
}
</script>

<template>
    <section class="container">
        <p v-if="!bookmark.length" class="font-semibold text-xl text-red-500">404 Not Found!</p>

        <div class="grid grid-cols-4 gap-4">
            <div v-for="product in bookmark" :key="product.id"
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
                </div>
            </div>
        </div>
    </section>
</template>