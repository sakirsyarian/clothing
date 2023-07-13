<script>
import { getAjax } from '../helpers/ajax';

export default {
    data() {
        return {
            detail: {}
        }
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
        },
        async getDetail() {
            let loader = this.$loading.show({
                canCancel: true,
            });

            try {
                const access_token = localStorage.getItem('access_token')
                const { data: product } = await getAjax(
                    `products/${this.$route.params.id}`,
                    { access_token }
                )

                this.detail = product.data
            } catch (error) {
                console.log(error);
            } finally {
                loader.hide()
            }
        },
    },
    created() {
        this.getDetail()
    },
}
</script>

<template>
    <section class="container">
        <div class="flex bg-white border-gray-200 rounded-lg shadow">
            <a class="max-w-sm" href="#">
                <img class="rounded-l-lg" :src="'/img/' + detail.image" alt="" />
            </a>
            <div class="py-5 pr-5 pl-10">
                <h5 class="mb-5 text-2xl font-bold tracking-tight text-gray-900">
                    {{ detail.name }}
                </h5>
                <p class="mb-3 font-normal text-gray-700">
                    {{ detail.description }}
                </p>
                <p class="font-medium text-lg text-green-400"> {{ formatCurrency(detail.price) }}</p>
            </div>
        </div>
    </section>
</template>