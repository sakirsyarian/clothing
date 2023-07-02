<script>
import Card from '../components/Card.vue'
import Pagination from '../components/Pagination.vue'
import Search from '../components/Search.vue'

export default {
    components: { Card, Pagination, Search },
    data() {
        return {
            count: 0,
        };
    },
};
</script>

<template>
    <section class="container">
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-3">
                <Search />
            </div>

            <div class="col-span-9">
                <div class="grid grid-cols-3 gap-3">
                    <Card />
                    <Card />
                    <Card />
                </div>

                <Pagination />
            </div>
        </div>

    </section>
</template>
