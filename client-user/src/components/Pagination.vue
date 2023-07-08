<script>
import { mapWritableState } from 'pinia'
import useProductStore from '../stores/product';
import { getAjax } from '../helpers/ajax'

export default {
    computed: {
        ...mapWritableState(useProductStore, ['products', 'pagination'])
    },
    methods: {
        async next() {
            try {
                const access_token = localStorage.getItem('access_token')
                const { data: product } = await getAjax(
                    `customers/products?page=${this.pagination.next.page}`,
                    { access_token }
                )

                this.products = product.data
                this.pagination = product.pagination
            } catch (error) {
                console.log(error);
            }
        },
        async prev() {
            try {
                const access_token = localStorage.getItem('access_token')
                const { data: product } = await getAjax(
                    `customers/products?page=${this.pagination.prev.page}`,
                    { access_token }
                )

                this.products = product.data
                this.pagination = product.pagination
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<template>
    <nav aria-label="Page navigation example">
        <ul class="pt-10 inline-flex items-center -space-x-px">
            <li v-if="pagination.prev">
                <button @click="prev()"
                    class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                    <span class="sr-only">Previous</span>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </li>
            <li v-if="pagination.next">
                <button @click="next()"
                    class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
                    <span class="sr-only">Next</span>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </li>
        </ul>
    </nav>
</template>