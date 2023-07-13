<script>
export default {
    props: ["logs"],
    methods: {
        localDate(index) {
            const dateFormat = this.logs.map((log) => {
                const date = new Date(log.createdAt);

                return date.toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
            });

            return dateFormat[index];
        },
    },
};
</script>

<template>
    <section class="px-12">
        <div class="flex justify-between">
            <h2 class="font-bold text-3xl">Logs</h2>
        </div>

        <div class="mt-10 relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">No</th>
                        <th scope="col" class="px-6 py-3">Title</th>
                        <th scope="col" class="px-6 py-3">Description</th>
                        <th scope="col" class="px-6 py-3">Updated By</th>
                        <th scope="col" class="px-6 py-3">Created</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!logs.length">
                        <td class="p-5 text-center text-red-500 border" colspan="4">No data available</td>
                    </tr>
                    <tr class="bg-white border-b" v-for="(log, index) in logs" :key="log.id">
                        <td class="px-6 py-4">
                            {{ index + 1 }}
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ log.name }}
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ log.description }}
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ log.updatedBy }}
                        </td>
                        <td class="px-6 py-4">
                            {{ localDate(index) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
