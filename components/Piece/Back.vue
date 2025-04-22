<script setup>
import { useRoute } from 'vue-router';
const $route = useRoute();
</script>

<template>
    <div class="back">
        <div class="container">
            <NuxtLink :to="`/cars-used/${$route.params.brand}`" class="back__link" v-if="$route.name === 'model'">←
                Обратно к {{
                    $route.params.brand.toUpperCase()
                }}</NuxtLink>

            <NuxtLink :to="`/cars-used/`" class="back__link" v-else-if="$route.name === 'brand'">←
                Смотреть все автомобили</NuxtLink>

            <div @click="$router.push({ name: 'Model' })" class="back__link" v-else-if="$route.name === 'generation'">←
                Обратно к {{ $route.params.model.toUpperCase() }}</div>

            <div @click="$router.options.history.state.back ? $router.go(-1) : $router.push({ name: 'Generation' })"
                class="back__link" v-else-if="$route.name === 'car'">←
                Вернуться назад</div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.back__link {
    font-size: var(--standart-size);
    display: inline-block;
    padding: 10px 15px;
    width: max-content;
    color: white;
    font-weight: bold;
    background: var(--main-black);
//    border-radius: var(--border-small-radius);
    cursor: pointer;
}

.margin-30 {
    margin-bottom: 20px;
}
</style>