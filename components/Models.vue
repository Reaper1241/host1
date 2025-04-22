<script setup>
import { useRoute } from 'vue-router';
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const $route = useRoute();

let models = computed(() => appStore.brands.find(brand => brand.url_brand === $route.params.brand)?.car_models);
</script>

<template>
    <section class="brands">
        <div class="container">
            <BasePageTitle />
            <ul class="brands__list">
                <li class="brand__item" v-for="model in models">
                    <NuxtLink :to="`/cars-used/${$route.params.brand}/${model.url_model}`" class="brand__link"
                        :class="{ 'active': $route.params.model === model.url_model }">
                        <p class="brand__name">{{ model.model }}</p>
                        <span class="brand__count">{{ model.cars_count }}</span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped lang="scss">
.brands {
    padding: 20px 0;

    .brands__list {
        display: grid;
        gap: 10px;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

        @media screen and (max-width: 1200px) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        @media screen and (max-width: 900px) {
            grid-template-columns: 1fr 1fr 1fr;
        }

        @media screen and (max-width: 768px) {
            grid-template-columns: 1fr 1fr;
        }

        .brand__item-button {
            text-align: center;
            display: block;
            padding: 15px;
            border: 2px solid var(--main-black);
            flex-direction: row;
            font-size: var(--medium-size);
            justify-content: space-between;
            width: 100%;
            border-radius: var(--border-radius);
            font-weight: bold;
            cursor: pointer;
        }
    }
}
</style>