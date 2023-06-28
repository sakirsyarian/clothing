<script>
export default {
    props: ["msg"],
    data() {
        return {
            count: 0,
        };
    },
};
</script>

<template>
    <div class="m-5 relative">
        <h1>{{ msg }}</h1>
        <button class="p-2 rounded bg-green-400" type="button" @click="count++">
            count is {{ count }}
        </button>
    </div>
</template>
