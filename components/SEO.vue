<script setup>
import { useAppStore } from '/stores/AppStore.js';
import { useCarStore } from '/stores/CarStore.js';
import { useRoute } from 'vue-router';

const appStore = useAppStore();
const carStore = useCarStore();
const $route = useRoute();

const title = ref('')
const description = ref('')

function setSeo() {
    const car_id = $route.params.car ? carStore.car.id : ''
    const car_minprice = $route.params.car ? carStore.car.price - carStore.car.sale : ''

    const brand_name_rus = $route.params.brand ? appStore.newBrands.find(brand => brand.url_brand === $route.params.brand).ru_brand : ''
    const brand_name_eng = $route.params.brand ? appStore.newBrands.find(brand => brand.url_brand === $route.params.brand).brand : ''

    const model_name_rus = $route.params.model ? $route.params.model?.toUpperCase() : ''
    const model_name_eng = $route.params.model ? $route.params.model?.toUpperCase() : ''

    const generation_name = $route.params.generation ? appStore.newBrands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).generations.find(generation => generation.url_generation === $route.params.generation).generation : ''
    const generation_minprice = $route.params.generation ? appStore.newBrands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).generations.find(generation => generation.url_generation === $route.params.generation).min_price : ''

    function replaceSEO(string) {
        if (string == null) { return '' }
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
            .replaceAll(`%site_name_eng%`, appStore.siteName)
    }

    title.value = cleanUpTitle(replaceSEO(appStore.newSeo[$route.name]?.title))
    description.value = cleanUpTitle(replaceSEO(appStore.newSeo[$route.name]?.description))

    useHead({
        title: `${title.value}`,
        meta: [
            { name: 'description', content: `${cleanUpTitle(description.value)}` },
            { name: 'og:title', content: `${cleanUpTitle(title.value)}` },
            { name: 'og:description', content: `${cleanUpTitle(description.value)}` },
            { name: 'og:url', content: `https://host-auto.ru${$route.path}` },
            { name: 'canonical', content: `https://host-auto.ru${$route.path}` }
        ],
    })
}

setSeo()

// useHead({
//     title: `${title.value}`,
//     meta: [
//         { name: 'description', content: `Автосалон host-auto` },
//         { name: 'og:title', content: `Автосалон host-auto` },
//         { name: 'og:description', content: `Автосалон host-auto` },
//         { name: 'og:url', content: `https://host-auto.ru${$route.path}` },
//         { name: 'canonical', content: `https://host-auto.ru${$route.path}` }
//     ],
// })
</script>

<template>
    <div />
</template>

<style lang="scss" scoped></style>