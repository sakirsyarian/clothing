<script>
export default {
    emits: ["change-category"],
    props: ["post", "getCategories"],
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

                this.getCategories();
                this.$emit("change-category", "list");
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<template>
    <section class="px-12">
        <div class="flex justify-between">
            <h2 class="font-bold text-3xl">New Category</h2>
            <button
                @click="this.$emit('change-category', 'list')"
                type="button"
                class="px-3 py-2 flex items-center button-add"
            >
                Back
            </button>
        </div>

        <div class="mt-10">
            <form @submit.prevent="handlerSubmit()">
                <div class="mb-6">
                    <label for="name" class="label-form">Name</label>
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
</template>
