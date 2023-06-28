<script>
import { initDropdowns } from "flowbite";

export default {
    mounted() {
        initDropdowns();
    },
};
</script>

<template>
    <nav class="bg-white w-full z-20 top-0 left-0 border-b border-gray-200">
        <div class="container">
            <router-link to="/" class="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap">Flowbite</span>
            </router-link>

            <div class="flex md:order-2">
                <router-link to="/signin" class="btn-login">
                    Sign in
                </router-link>

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
                </ul>
            </div>
        </div>
    </nav>
</template>
