<script setup>
const props = defineProps(['title'])
</script>


<template>
    <h2 class="title">{{ title }}</h2>
</template>


<style lang="scss" scoped>
.title {
    font-size: var(--big-size);
    font-weight: bold;
    line-height: normal;
    margin-bottom: 10px;
    margin-top: 20px;

    @media screen and (max-width:570px) {
        margin-bottom: 10px;
    }
}

.margin-0 {
    margin: 0;
}
</style>