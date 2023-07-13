<script>
import Loading from 'vue-loading-overlay';
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import LogList from "../components/LogList.vue";

export default {
    components: {
        Loading,
        Navbar,
        Sidebar,
        LogList,
    },
    emits: ["change"],
    props: ["changePage", "get", "errorMessage"],
    data() {
        return {
            isLoading: false,
            logs: [],
        };
    },
    methods: {
        async getLogs() {
            try {
                this.isLoading = true

                const access_token = localStorage.getItem("access_token");
                const { data: logs } = await this.get("histories", {
                    access_token,
                });

                this.logs = logs.data;
            } catch (error) {
                console.log(error);
                this.errorMessage(error)
            } finally {
                this.isLoading = false
            }
        },
    },
    mounted() {
        this.getLogs();
    },
};
</script>

<template>
    <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="true" />

    <header class="mx-auto top-0 z-10 container sticky bg-white">
        <Navbar @change="changePage" />
    </header>

    <main class="mx-auto container">
        <div class="grid grid-cols-5 relative h-screen">
            <Sidebar @change="changePage" />

            <div class="col-span-4 border-t-2 border-gray-50">
                <div class="col-span-4 grid gap-12 padding-section">
                    <LogList :logs="logs" />
                </div>
            </div>
        </div>
    </main>
</template>
