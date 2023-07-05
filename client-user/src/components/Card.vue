<script>
export default {
    props: ['products'],
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
        }
    },
}
</script>

<template>
    <p v-if="!products.length" class="font-semibold text-xl text-red-500">404 Not Found!</p>
    <div v-for="product in products" :key="product.id" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <a href="#">
            <img class="rounded-t-lg" :src="'/img/' + product.image" alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    {{ product.name }}
                </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700">
                Here are the biggest enterprise technology
            </p>
            <p class="font-medium text-green-400"> {{ formatCurrency(product.price) }}</p>
        </div>
    </div>
</template>