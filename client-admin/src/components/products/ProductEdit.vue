<script>
export default {
    emits: ["change-product"],
    props: ["get", "put", "product", "getProducts"],
    data() {
        return {
            categories: [],
            category: 0,
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
        selectedCategory() {
            this.category = this.product.CategoryId
        },
        async handlerSubmit() {
            try {
                const access_token = localStorage.getItem("access_token");
                await this.put(
                    `products/${this.product.id}`,
                    {
                        name: this.product.name,
                        description: this.product.description,
                        price: this.product.price,
                        stock: this.product.stock,
                        CategoryId: this.category
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
        this.selectedCategory()
    },
};
</script>
<template>
    <section class="px-12">
        <div class="flex justify-between">
            <h2 class="font-bold text-3xl">New Product</h2>
            <button @click="this.$emit('change-product', 'list')" type="button"
                class="px-3 py-2 flex items-center button-add">
                Back
            </button>
        </div>

        <div class="mt-10">
            <form @submit.prevent="handlerSubmit()">
                <div class="mb-6">
                    <label for="title" class="label-form">Name </label>
                    <input type="text" name="name" class="input-form" v-model="product.name" />
                </div>
                <div class="mb-6">
                    <label for="imgUrl" class="label-form">Price </label>
                    <input type="number" name="price" class="input-form" v-model="product.price" />
                </div>
                <div class="mb-6">
                    <label for="imgUrl" class="label-form">Stock </label>
                    <input type="number" name="stock" class="input-form" v-model="product.stock" />
                </div>
                <div class="mb-6">
                    <label for="AuthorId" class="label-form">
                        Categories
                    </label>
                    <select name="CategoryId" class="input-select" v-model="category">
                        <template v-for="category in categories" :key="category.id">
                            <option :value="category.id">{{ category.name }}</option>
                        </template>
                    </select>
                </div>
                <div class="mb-6">
                    <label for="content" class="label-form">
                        Description
                    </label>
                    <textarea name="description" v-model="product.description" rows="4" class="input-textarea"></textarea>
                </div>
                <button type="submit" class="button-form">
                    Update Product
                </button>
            </form>
        </div>
    </section>
</template>
