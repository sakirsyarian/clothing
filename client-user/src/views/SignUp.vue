<script>
import { postAjax } from '../helpers/ajax'

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async handlerSubmit() {
            let loader = this.$loading.show({
                canCancel: true,
            });

            try {
                await postAjax('customer/signup', null,
                    { email: this.email, password: this.password })

                this.$toast.success('Create a new account', { position: 'top-right' })
                this.$router.push('/signin')
            } catch (error) {
                console.log(error);

                if (error.response.status === 400) {
                    const errorMessage = error.response.data.message
                    errorMessage.map(err => {
                        this.$toast.error(err, { position: 'top-right', queue: true })
                    })
                }
            } finally {
                loader.hide()
            }
        }
    }
}
</script>

<template>
    <section class="container h-screen flex justify-center items-center">
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
            <form @submit.prevent="handlerSubmit" class="space-y-6" action="#">
                <h5 class="text-xl font-medium text-gray-900">Sign up to our platform</h5>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input type="email" name="email" v-model="email" placeholder="Enter a email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input type="password" name="password" v-model="password" placeholder="Enter a password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                </div>

                <button type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Register a new account
                </button>

                <div class="text-sm font-medium text-gray-500">
                    Already registered?
                    <router-link to="/signin" class="text-blue-700 hover:underline">
                        Sign in
                    </router-link>
                </div>
            </form>
        </div>

    </section>
</template>