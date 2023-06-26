<script>
export default {
    emits: ["change-product"],
    props: ["get", "post", "getProducts"],
    data() {
        return {
            categories: [],
            name: "",
            description: "",
            price: "",
            stock: "",
            category: "",
        };
    },
    methods: {
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
        async handlerSubmit() {
            try {
                const access_token = localStorage.getItem("access_token");
                await this.post(
                    "products",
                    {
                        name: this.name,
                        description: this.description,
                        price: this.price,
                        stock: this.stock,
                        CategoryId: this.category,
                    },
                    { access_token }
                );

                this.getProducts();
                this.$emit("change-product", "list");
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
    <section class="px-12">
        <div class="flex justify-between">
            <h2 class="font-bold text-3xl">New Product</h2>
            <button
                @click="this.$emit('change-product', 'list')"
                type="button"
                class="px-3 py-2 flex items-center button-add"
            >
                Back
            </button>
        </div>

        <div class="mt-10">
            <form @submit.prevent="handlerSubmit()">
                <div class="mb-6">
                    <label for="title" class="label-form">Name </label>
                    <input
                        v-model="name"
                        type="text"
                        name="name"
                        class="input-form"
                        placeholder="Enter name ..."
                    />
                </div>
                <div class="mb-6">
                    <label for="imgUrl" class="label-form">Price </label>
                    <input
                        v-model="price"
                        type="number"
                        name="price"
                        class="input-form"
                        placeholder="Enter price ..."
                    />
                </div>
                <div class="mb-6">
                    <label for="imgUrl" class="label-form">Stock </label>
                    <input
                        v-model="stock"
                        type="number"
                        name="stock"
                        class="input-form"
                        placeholder="Enter stock ..."
                    />
                </div>
                <div class="mb-6">
                    <label for="AuthorId" class="label-form">
                        Categories
                    </label>
                    <select
                        name="CategoryId"
                        class="input-select"
                        v-model="category"
                    >
                        <option value="" disabled selected>Category</option>
                        <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.id"
                        >
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                <div class="mb-6">
                    <label for="content" class="label-form">
                        Description
                    </label>
                    <textarea
                        v-model="description"
                        name="description"
                        rows="4"
                        class="input-textarea"
                        placeholder="Leave a description ..."
                    ></textarea>
                </div>
                <button type="submit" class="button-form">
                    Add New Product
                </button>
            </form>
        </div>
    </section>
</template>
