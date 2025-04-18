<script setup>
import { apiNew } from '@/constants/';

definePageMeta({
    name: 'brand',
    layout: 'home',
})

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const $route = useRoute();

const brand = findBrand($route.params.brand, appStore.newBrands)
const { data: models } = await useFetch(`${apiNew}models/${brand}`);

newStore.models = models

const { data: brand_value } = await useFetch(`${apiNew}brands/brand/${brand}`);
newStore.brand = brand_value

let currentQuary = ref([])

function callback(n) {
    currentQuary.value = n
}
</script>

<template>
    <Bread />
    <BannerPB1 />
    <NewModelsCatalog />
    <FormBrandNew/>
    <CarsNewList :currentQuary="currentQuary" />
    <SEO />
</template>

<style scoped lang="scss"></style>