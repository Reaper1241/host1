<script setup>

let currentQuary = ref([])

function callback(n) {
    currentQuary.value = n
}
</script>

<template>
<BrandsChoice class="china"/>
<Bread/>
<CarsHotChina/>
<!-- <FilterNew @showCars="callback"/> -->
<CarsListChina :currentQuary="currentQuary"/>
<SEO/>
</template>