<script setup>
import { apiNew } from '@/constants/';

definePageMeta({
    name: 'model',
})

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const $route = useRoute();
const brand= findBrand($route.params.brand, appStore.newBrands)

const { data: models } = await useFetch(`${apiNew}models/${brand}`);
newStore.models = models

const { data: model } = await useFetch(`${apiNew}models/model/${findModel($route.params.model, newStore.models)}`);
newStore.model = model

const {data: brand_value} = await useFetch(`${apiNew}brands/brand/${brand}`);
newStore.brand = brand_value

</script>

<template>
    <Bread />
    <ModelCard />
    <ModelMenu/>
    <FormExpressCredit/>

    <!-- <ModelComplectations />
    <ModelFinance />
    <ModelСharacteristics /> -->
    <!-- <BannerMB1 /> -->
    <CarsNewList />
    <!-- <BannerBC1 />
    <ContactsBlock /> -->
    <SEO/>

</template>

<style scoped lang="scss"></style>