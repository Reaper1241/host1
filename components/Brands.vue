<script setup>
import { useAppStore } from '/stores/AppStore.js';
import { useRoute } from 'vue-router';
const $route = useRoute();

const appStore = useAppStore();
let brands = computed(() => appStore.brands);

let sortedBrands = brands.value

const cut = ref(19);
const show = ref(false);

sortedBrands.sort((a, b) => {
    if (a.cars_count < b.cars_count) return 1
    if (a.cars_count > b.cars_count) return -1
    return 0
})
</script>

<template>
    <section class="brands">
        <div class="container">
            <div class="brands__wrapper">
                <div class="brands__header section__header">
                    <BasePageTitle />
                </div>
                <div class="brands__body">
                    <ul class="brands__list">
                        <li class="brand__item" v-for="brand in (show ? sortedBrands : sortedBrands.slice(0, cut))">
                            <NuxtLink :to="`/cars-used/${brand.url_brand}`" class="brand__link"
                                :class="{ 'active': $route.params.brandId === brand.url_brand }">
                                <div class="brand__content">
                                    <p class="brand__name">{{ brand.brand }}</p>
                                    <span class="brand__count">{{ brand.cars_count }} авто</span>
                                </div>
                                <img class="brand__logo" :src="brand.logo" :alt="brand.brand" v-if="brand.logo">
                                <i class="fa-solid fa-car-side brand__logo" v-else />
                            </NuxtLink>
                        </li>
                        <li class="brand__item">
                            <button class="brand__button" @click="show = !show">
                                {{ show ? 'Скрыть' : 'Показать еще марки' }}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>