<script>
import { initDropdowns } from "flowbite";
import { mapState } from 'pinia'
import useProductStore from '../stores/product'

export default {
    computed: {
        ...mapState(useProductStore, ['shoppingCart'])
    },
    methods: {
        signOut() {
            localStorage.clear()
            this.$router.push('/signin')
        }
    },
    mounted() {
        initDropdowns();
    },
};
</script>

<template>
    <nav class="bg-white w-full z-20 top-0 left-0 border-b border-gray-200">
        <div class="navbar">
            <router-link to="/" class="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap">Flowbite</span>
            </router-link>

            <div class="flex md:order-2">
                <router-link to="/shop" class="flex items-center">
                    <button class="mr-5 flex items-center">
                        <span
                            class="bg-blue-100 text-blue-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded border border-blue-400">
                            {{ shoppingCart.length }}
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                </router-link>


                <button @click="signOut()" class="btn-login">
                    Sign out
                </button>

                <button data-collapse-toggle="navbar-sticky" type="button" class="btn-ham" aria-controls="navbar-sticky"
                    aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd">
                        </path>
                    </svg>
                </button>
            </div>

            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <ul class="nav">
                    <li>
                        <router-link to="/" class="nav-link">
                            Home
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/about" class="nav-link">
                            About
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/favorite" class="nav-link">
                            Favorite
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/about" class="nav-link">
                            Contact
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
