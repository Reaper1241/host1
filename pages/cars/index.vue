<script setup>
definePageMeta({
    name: 'cars',
})

let currentQuary = ref([])

function callback(n) {
    currentQuary.value = n
}
</script>

<template>
    <BrandsChoice />
    <Bread />
    <!-- <FilterNew @showCars="callback"/> -->
    <CarsNewList :currentQuary="currentQuary"/>
    <SEO/>
</template>

<style scoped lang="scss"></style>