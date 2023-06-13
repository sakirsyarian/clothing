<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
    components: {
        Navbar,
        Sidebar,
    },
};
</script>

<template>
    <header class="mx-auto top-0 z-10 container sticky bg-white">
        <Navbar />
    </header>

    <main class="mx-auto container">
        <div class="grid grid-cols-5 relative h-screen">
            <Sidebar />

            <section class="padding-section, border-t-2, border-gray-50">
                <div class="col-span-4 grid gap-12 padding-section">
                    <!-- start: Dashboard -->
                    <div class="px-12">
                        <h2 class="font-bold text-3xl">Dashboard</h2>

                        <div class="mt-10 flex gap-10">
                            <div class="px-8 py-5 border-2 rounded-lg">
                                <p
                                    class="mb-2 text-center font-semibold text-3xl"
                                >
                                    11
                                    <!-- {{ postings.length }} -->
                                </p>
                                <p class="text-gray-500">Total Postings</p>
                            </div>
                            <div class="px-8 py-5 border-2 rounded-lg">
                                <p
                                    class="mb-2 text-center font-semibold text-3xl"
                                >
                                    27
                                    <!-- {{ categories.length }} -->
                                </p>
                                <p class="text-gray-500">Total Categories</p>
                            </div>
                        </div>
                    </div>
                    <!-- end: Dashboard -->
                </div>
            </section>
        </div>
    </main>
</template>
