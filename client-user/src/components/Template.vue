<script>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

export default {
    components: { Navbar, Footer },
};
</script>

<template>
    <Navbar />
    <router-view></router-view>
    <Footer />
</template>