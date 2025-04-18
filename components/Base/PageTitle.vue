<script setup>
import { useAppStore } from '/stores/AppStore.js';
import { useCarStore } from '/stores/CarStore.js';
import { useRoute } from 'vue-router';

const appStore = useAppStore();
const carStore = useCarStore();
const $route = useRoute();

function setSeo(string) {
    const car_id = $route.params.car ? carStore.car.id : ''
    const car_minprice = $route.params.car ? carStore.car.price - carStore.car.sale : ''

    const brand_name_rus = $route.params.brand ? appStore.brands.find(brand => brand.url_brand === $route.params.brand).ru_brand : ''
    const brand_name_eng = $route.params.brand ? appStore.brands.find(brand => brand.url_brand === $route.params.brand).brand : ''

    const model_name_rus = $route.params.model ? appStore.brands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).ru_model : ''
    const model_name_eng = $route.params.model ? appStore.brands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).model : ''

    const generation_name = $route.params.generation ? appStore.brands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).generations.find(generation => generation.url_generation === $route.params.generation).generation : ''
    const generation_minprice = $route.params.generation ? appStore.brands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).generations.find(generation => generation.url_generation === $route.params.generation).min_price : ''

    function replaceSEO(string) {
        if (string == null) { return 'Page Title' }
        return string
            .replaceAll('%brand_name_rus%', brand_name_rus)
            .replaceAll('%model_name_eng%', model_name_eng)
            .replaceAll('%generation_name_rus%', generation_name)
            .replaceAll('%generation_name_eng%', generation_name)
            .replaceAll('%brand_name_eng%', brand_name_eng)
            .replaceAll('%model_name_rus%', model_name_rus)
            .replaceAll('%car_id%', car_id)
            .replaceAll('%generation_minprice%', makeSpaces(generation_minprice))
            .replaceAll('%car_minprice%', makeSpaces(car_minprice))
    }

    return replaceSEO(string)
}
</script>

<template>
    <h1 class="page__title"
        v-html="appStore?.newSeo[$route.name.replaceAll('-used', '').replaceAll('-new', '')]?.h1 ? setSeo(removeTrash(appStore?.newSeo[$route.name.replaceAll('-used', '').replaceAll('-new', '')]?.h1)) : null" />
</template>


<style lang="scss" scoped>
.page__title {
    margin: 10px 0 30px 0;
    font-size: var(--big-size);
    font-weight: bold;
}

.margin-0 {
    margin: 0;
}
</style>