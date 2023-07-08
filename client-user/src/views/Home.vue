<script>
import { mapActions, mapState } from 'pinia'
import useProductStore from '../stores/product'

import Card from '../components/Card.vue'
import Pagination from '../components/Pagination.vue'
import Search from '../components/Search.vue'

export default {
    components: { Card, Pagination, Search },
    computed: {
        ...mapState(useProductStore, ['products', 'search']),
    },
    methods: {
        ...mapActions(useProductStore, ['getProducts']),
        onSearch() {
            if (!this.search) {
                return this.products
            }

            return this.products.filter(item => item.name.toLowerCase().match(this.search))
        }
    },
    mounted() {
        this.getProducts()
    }
};
</script>

<template>
    <section class="container">
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-9">
                <div class="grid grid-cols-4 gap-4">
                    <Card :products="onSearch()" />
                </div>

                <Pagination />
            </div>

            <div class="col-span-3">
                <p class="mb-3 font-semibold">Search :</p>
                <Search />
            </div>
        </div>

    </section>
</template>
