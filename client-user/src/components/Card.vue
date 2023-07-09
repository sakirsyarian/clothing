<script>
import { mapWritableState } from 'pinia'
import useProductStore from '../stores/product'

export default {
    props: ['products'],
    computed: {
        ...mapWritableState(useProductStore, ['bookmark'])
    },
    methods: {
        makeBook(value, index) {
            const svg = document.getElementById(value)
            const getFill = svg.getAttribute('fill')

            if (getFill === 'none') {
                this.bookmark.push({
                    id: value,
                    name: this.products[index].name,
                    image: this.products[index].image,
                    description: this.products[index].description,
                    price: this.products[index].price,
                })
                return svg.setAttribute('fill', 'currentColor')
            }

            const filter = this.bookmark.filter(item => item.id !== value)
            this.bookmark = filter
            return svg.setAttribute('fill', 'none')
        },
        isBookmark() {
            if (this.bookmark) {
                this.bookmark.map(el => {
                    const svg = document.getElementById(el.id)
                    if (svg) return svg.setAttribute('fill', 'currentColor')
                })
            }
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
        }
    },
    updated() {
        this.isBookmark()
    }
}
</script>

<template>
    <p v-if="!products.length" class="font-semibold text-xl text-red-500">404 Not Found!</p>
    <div v-for="(product, index) in products" :key="product.id"
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <router-link :to="'/detail/' + product.id">
            <img class="rounded-t-lg" :src="'/img/' + product.image" alt="" />
        </router-link>
        <div class="p-5">
            <div class="flex justify-between">
                <router-link :to="'/detail/' + product.id">
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">
                        {{ product.name }}
                    </h5>
                </router-link>
                <button @click="makeBook(product.id, index)">
                    <svg :id="product.id" class="w-5 h-5 text-gray-800" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z" />
                    </svg>
                </button>
            </div>
            <p class="mb-3 font-normal text-gray-700">
                {{ product.description }}
            </p>
            <p class="font-medium text-green-400"> {{ formatCurrency(product.price) }}</p>
        </div>
    </div>
</template>