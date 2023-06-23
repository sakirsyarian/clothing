<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
    components: {
        Navbar,
        Sidebar,
    },
    emits: ["change"],
    props: ["changePage", "post"],
    data() {
        return {
            name: "",
        };
    },
    methods: {
        async handlerSubmit() {
            try {
                const access_token = localStorage.getItem("access_token");
                await this.post(
                    "categories",
                    { name: this.name },
                    { access_token }
                );

                this.$emit("change", "Category");
            } catch (error) {
                console.log(error);
            }
        },
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
                    <!-- start: Category Add -->
                    <section class="px-12">
                        <h2 class="font-bold text-3xl">New Category</h2>

                        <div class="mt-10">
                            <form @submit.prevent="handlerSubmit()">
                                <div class="mb-6">
                                    <label for="name" class="label-form"
                                        >Name</label
                                    >
                                    <input
                                        v-model="name"
                                        type="text"
                                        name="name"
                                        class="input-form"
                                        placeholder="Enter category name ..."
                                        required
                                    />
                                </div>
                                <button type="submit" class="button-form">
                                    Add New Category
                                </button>
                            </form>
                        </div>
                    </section>
                    <!-- end: Category Add -->
                </div>
            </div>
        </div>
    </main>
</template>
