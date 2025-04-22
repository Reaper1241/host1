<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

</script>

<template>
    <section class="brands section" :ref="(el) => { appStore.newCatalog = el }">
        <div class="container">
            <div class="brands__wrapper">
                <div class="brands__header section__header">
                    <BaseSectionTitle :title="`Модели ${$route.params.brand.toUpperCase()} в наличии`" />
                </div>

                <div class="brands__body">
                    <ul class="brands__list">
                        <li class="brand__item" v-for="model in newStore.models">
                            <NuxtLink :to="`/cars-new/${$route.params.brand}/${model.url_model}`" class="brand__link"
                                :class="{ 'active': $route.params.model === model.url_model }">
                                <p class="brand__name">{{ model.model }}</p>
                                <span class="brand__count">{{ model.cars_count }}</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.brands {
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