<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { useRoute } from 'vue-router';
const $route = useRoute();

import { apiNew } from '@/constants';

const page = ref(1)

const { data: cars } = await useFetch(`${apiNew}filters/cars?sorting=${appStore.newSort}&per_page=8&page=${page.value}
${$route.params.brand ? `&brand_id=${findBrand($route.params.brand, appStore.newBrands)}` : ''}
${$route.params.model ? `&car_model_id=${findModel($route.params.model, newStore.models)}` : ''}`);

const currentCars = ref([])
const totalPages = ref(0)
currentCars.value = cars.value.cars.data
totalPages.value = cars.value.total_pages

const title = computed(() => {
    if ($route.params.model) {
        return `Новые автомобили ${cleanUpTitle($route.params.brand, $route.params.model)} в наличии`
    } else if ($route.params.brand) {
        return `Новые автомобили ${cleanUpTitle($route.params.brand)} в наличии`
    } else {
        return 'Горячее предложение!'
    }
})

function updateCars() {
    fetch(`${apiNew}filters/cars?sorting=${appStore.newSort}&per_page=8&page=${page.value}
    ${$route.params.brand ? `&brand_id=${findBrand($route.params.brand, appStore.newBrands)}` : ''}
    ${$route.params.model ? `&car_model_id=${findModel($route.params.model, newStore.models)}` : ''}`)
        .then(res => res.json())
        .then(data => {
            currentCars.value = data.cars.data
            totalPages.value = data.total_pages
        });
}

function loadMore() {
    page.value++

    fetch(`${apiNew}filters/cars?sorting=price_asc&per_page=8&page=${page.value}${$route.params.brand ? `&brand_id=${findBrand($route.params.brand, appStore.newBrands)}` : ''}${$route.params.model ? `&car_model_id=${findModel($route.params.model, newStore.models)}` : ''}
    `)
        .then(res => res.json())
        .then(data => currentCars.value.push(...data.cars.data))
}

</script>

<template>
    <section class="">
        <div class="container">
            <div class="cars-list__header section__header">
                <CarsNewHead @updateCars="updateCars()" :title="`${title}`" />
            </div>

            <div class="cars-list__body">
                <div class="cars-list__list cars-template">
                    <div class="car__item" v-for="car in currentCars">
                        <CarSmallC1 :car="car" />
                    </div>
                </div>

                <div class="cars-list__load-more">
                    <BaseButton :label="`Показать еще`" @click="loadMore()" :class="`load`" v-if="totalPages > page" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.cars-list__load-more {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
}

.section__header{
    margin-bottom: 10px;
}

/*
.cars-list__body {
    @media screen and (max-width: 400px) {
        margin: 0 -10px;
    }
}
    */
</style>