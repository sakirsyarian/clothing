<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import CategoryList from "../components/categories/CategoryList.vue";
import CategoryAdd from "../components/categories/CategoryAdd.vue";

export default {
    components: {
        Navbar,
        Sidebar,
        CategoryList,
        CategoryAdd,
    },
    emits: ["change"],
    props: ["changePage", "get", "post", "delete"],
    data() {
        return {
            categories: [],
            pageCategory: "list",
        };
    },
    methods: {
        changeCategory(value) {
            this.pageCategory = value;
        },
        async getCategories() {
            try {
                const access_token = localStorage.getItem("access_token");
                const { data: categories } = await this.get("categories", {
                    access_token,
                });

                this.categories = categories.data;
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCategory(id) {
            try {
                const access_token = localStorage.getItem("access_token");
                await this.delete(`categories/${id}`, {
                    access_token,
                });

                this.getCategories();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getCategories();
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
                    <CategoryList
                        v-if="pageCategory === 'list'"
                        :categories="categories"
                        :deleteCategory="deleteCategory"
                        @change-category="changeCategory"
                    />
                    <CategoryAdd
                        v-else-if="pageCategory === 'add'"
                        :post="post"
                        :getCategories="getCategories"
                        @change-category="changeCategory"
                    />
                </div>
            </div>
        </div>
    </main>
</template>
