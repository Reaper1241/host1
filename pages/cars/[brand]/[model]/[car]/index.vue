<script setup>
import { useRoute } from 'vue-router';
import { apiNew } from '@/constants/';

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useNewCarStore } from '/stores/NewCarStore.js'
const carStore = useNewCarStore()

definePageMeta({
    name: 'car',
})

const $route = useRoute();
const brand = findBrand($route.params.brand, appStore.newBrands)

const { data: car } = await useFetch(`${apiNew}cars/car/${$route.params.car}`);

if (car.value) {
    const { data: images } = await useFetch(`${apiNew}galleries/${car.value.car_model_id}`);
    carStore.galleries = images.value
}

carStore.car = car

/*
if (brand) {
    const { data: model } = await useFetch(`${apiNew}models/model/${findModel($route.params.model, newStore.models)}`);
    if (model.value) {
        const { data: car } = await useFetch(`${apiNew}cars/car/${$route.params.car}`);
        carStore.car = car
        
    } else {
        throw createError({ statusCode: 404, statusMessage: 'Model not found!', fatal: true })
    }
} else {
    throw createError({ statusCode: 404, statusMessage: 'Brand not found!', fatal: true })
}
*/

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
    <Bread />

    <!--
    <transition name="fade" mode="out-in" class="my-fade-transition">
        <NewCarCard v-if="showNewCarCard" key="new-car-card" />
    </transition>
    -->
    <NewCarCard />
    <NewCarSaleCalculator/>
    <NewCarComplectation/>
    <NewCarModificationValue/>
    <FormExpressCredit/>
    <CarsNewList/>

    <!-- <BannerSP1 /> -->
    <!-- <BannerMB2 /> -->
    <!-- <ContactsBlock /> -->
    <SEO/>

</template>

<style scoped lang="scss">
/*
.my-fade-transition {
    animation: my-fade-animation 0.5s ease-in-out;
}

@keyframes my-fade-animation {
    0% {
        opacity: 0;
        transform: scale(0.5);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}
    */
</style>