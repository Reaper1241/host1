<script setup>
definePageMeta({
    name: 'index',
    layout: 'home'
})

let currentQuary = ref([])

function callback(n) {
    currentQuary.value = n
}
</script>

<template>
    <Slider />
    <BrandsChoice/>
    <!-- <FilterNew @showCars="callback"/> -->
    <BannerSP1 />
    <CarsNewList :currentQuary="currentQuary"/>
    <FormExpressCredit/>
    <CarsHot />
    <SEO />
</template>


<style lang="scss" scoped></style>