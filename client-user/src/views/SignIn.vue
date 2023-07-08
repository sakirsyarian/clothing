<script>
import { postAjax } from '../helpers/ajax'

export default {
    data() {
        return {
            email: 'admin@mail.com',
            password: 'admin'
        }
    },
    methods: {
        async handlerSubmit() {
            try {
                const { data: user } = await postAjax('customer/signin', null,
                    { email: this.email, password: this.password })

                localStorage.setItem('access_token', user.access_token)
                this.$router.push('/')
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<template>
    <section class="container h-screen flex justify-center items-center">
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
            <form @submit.prevent="handlerSubmit" class="space-y-6" action="#">
                <h5 class="text-xl font-medium text-gray-900">Sign in to our platform</h5>
                <div>
                    <label for="email" class="form-label">Email</label>
                    <input type="email" name="email" class="form-input" v-model="email">
                </div>
                <div>
                    <label for="password" class="form-label">Password</label>
                    <input type="password" name="password" class="form-input" v-model="password">
                </div>

                <button type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login
                    to your account
                </button>

                <div class="text-sm font-medium text-gray-500">
                    Not registered?
                    <router-link to="/signup" class="text-blue-700 hover:underline">
                        Create account
                    </router-link>
                </div>
            </form>
        </div>

    </section>
</template>