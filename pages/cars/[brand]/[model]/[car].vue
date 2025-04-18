<script setup>
import { useNewCarStore } from '/stores/NewCarStore.js'
import { useRoute } from 'vue-router';
import { apiNew } from '@/constants/';

const $route = useRoute();
const carStore = useNewCarStore()

const { data: car } = await useFetch(`${apiNew}cars/car/${$route.params.car}`);
carStore.car = car

if (!car.value) {
    throw createError({ statusCode: 404, statusMessage: 'Car not found!', fatal: true })
} else {
    if (car.value.images?.length) {
        useHead({
            meta: [
                { name: 'og:image', content: `${car.value?.images[0]?.url}` },
            ],
        })
    }

}
</script>

<template>
    <NuxtPage />
</template>

<style lang="scss" scoped></style>