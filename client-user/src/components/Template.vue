<script>
import Navbar from "./Navbar.vue";

export default {
    components: { Navbar },
};
</script>

<template>
    <Navbar />
    <router-view></router-view>
</template>