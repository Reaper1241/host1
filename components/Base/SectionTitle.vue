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
    margin-bottom: 20px;

    @media screen and (max-width: 767px) {
        font-size: var(--large-size);
    }

    @media screen and (max-width: 400px) {
        font-size: var(--medium-size);
    }
}
</style>