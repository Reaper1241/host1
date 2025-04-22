<script setup>
import { apiNew } from "@/constants/";
import { useRoute } from 'vue-router';
import { useAppStore } from '/stores/AppStore.js';
import { useNewStore } from '/stores/NewStore.js';

import { useNewCarStore } from '/stores/NewCarStore.js'
const carStore = useNewCarStore()

const $route = useRoute();
const appStore = useAppStore();
const newStore = useNewStore();

const props = defineProps(['currentQuary'])
let quary = ref('')

const carsLoading = ref(false);

const cars = ref([]);
const query = ref([]);
const carsCount = ref(0);
const totalPages = ref(0);
const page = ref(1);

quary.value = appStore.recentQuery || '';


watch(() => props.currentQuary, (curr, prev) => {
    quary.value = curr
    appStore.recentQuery = curr
    appStore.currentPerPage = appStore.perPage

    if (prev.length > 0 || curr.length > 0) {
        updateCars()
    }
})

function updateRecentCars() {
    if (!$route.params.car) {
        appStore.recentCars.cars = cars.value
        appStore.recentCars.count = carsCount.value
    }
}

const brand = ref(0);
const model = ref(0);

if ($route.params.car) {
    model.value = carStore.car.car_model_id
    quary.value += `&car_model_id=${model.value}`
} else if ($route.params.model) {
    model.value = newStore.models.find((m) => m.url_model === $route.params.model).id;
    quary.value += `&car_model_id=${model.value}`
}

if ($route.params.brand) {
    brand.value = appStore.newBrands.find((b) => b.url_brand === $route.params.brand).id;
    quary.value += `&brand_id=${brand.value}`
}

function getCars() {
    if (appStore.recentCars.cars?.length > 0 && !$route.params.car) {
        cars.value = appStore.recentCars.cars
        carsCount.value = appStore.recentCars.count
        totalPages.value = appStore.recentCars.totalPages
        page.value = appStore.recentCars.page
    } else {
        carsLoading.value = true

        const url = new URL(`${apiNew}filters/cars`);
        url.searchParams.set('sorting', appStore.newSort);
        url.searchParams.set('page', page.value);
        url.searchParams.set('car_tag_id', 3);
        url.searchParams.set('per_page', $route.params.car ? appStore.currentPerPage + 1 : appStore.currentPerPage);

        if ($route.params.brand) {
            url.searchParams.set('brand_id', brand.value);
        }

        if ($route.params.model || $route.params.car) {
            url.searchParams.set('car_model_id', model.value);
        }

        fetch(url.toString())
            .then(res => res.json())
            .then(data => query.value = data)
                
            .then(() => cars.value.push(...query.value.cars.data))
            .then(() => carsCount.value = query.value.count)
            .then(() => totalPages.value = query.value.total_pages)

            .then(() => !$route.params.car ? appStore.recentCars.totalPages = totalPages.value : null)

            .then(() => updateRecentCars())
            .then(() => appStore.firstCar = cars.value[0])

            .then(() => yandexEcommerceArray('impressions', cars.value))
            .then(() => carsLoading.value = false)
    }
}

function updateCars() {
    carsLoading.value = true
    page.value = 1

    fetch(`${apiNew}filters/cars?sorting=${appStore.newSort}&per_page=${appStore.currentPerPage}&page=${page.value}&car_tag_id=3&${quary.value ? `${quary.value}` : ''}`)
        .then(res => res.json())
        .then(data => query.value = data)

        .then(() => cars.value = query.value.cars.data)
        .then(() => carsCount.value = query.value.count)
        .then(() => totalPages.value = query.value.total_pages)
        .then(() => appStore.recentCars.totalPages = totalPages.value)

        .then(() => updateRecentCars())

        .then(() => yandexEcommerceArray('impressions', cars.value))
        .then(() => carsLoading.value = false)
}

function loadPage() {
    carsLoading.value = true
    page.value++

    const brand = ref(0)
    const model = ref(0)

    if ($route.params.brand) {
        brand.value = appStore.newBrands.find((b) => b.url_brand === $route.params.brand);
    }

    if ($route.params.model || $route.params.car) {
        model.value = newStore.models.find((m) => m.url_model === $route.params.model);
    }

    fetch(`${apiNew}filters/cars?sorting=${appStore.newSort}&per_page=${appStore.currentPerPage}${brand.value ? `&brand_id=${brand.value.id}` : ''}${model.value ? `&car_model_id=${model.value.id}` : ''}&page=${page.value}&car_tag_id=3${quary.value ? `&${quary.value}` : ''}`)
        .then(res => res.json())
        .then(data => query.value = data)

        .then(() => cars.value.push(...query.value.cars.data))
        .then(() => carsCount.value = query.value.count)
        .then(() => totalPages.value = query.value.total_pages)
        .then(() => appStore.recentCars.page = page.value)

        .then(() => updateRecentCars())

        .then(() => yandexEcommerceArray('impressions', cars.value))
        .then(() => carsLoading.value = false)
}


// if ($route.params.car) {
//     quary.value = `&brand_id=${appStore.newBrands.find(brand => brand.url_brand === $route.params.brand).id}&car_model_id=${appStore.newBrands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).id}&generation_id=${appStore.newBrands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).generations.find(generation => generation.url_generation === $route.params.generation).id}`
//} else if ($route.params.model) {
//     quary.value = `&brand_id=${appStore.newBrands.find(brand => brand.url_brand === $route.params.brand).id}&car_model_id=${appStore.newBrands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).id}&generation_id=${appStore.newBrands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).generations.find(generation => generation.url_generation === $route.params.generation).id}`
//} else if ($route.params.brand) {
//     quary.value = `&brand_id=${appStore.newBrands.find(brand => brand.url_brand === $route.params.brand).id}&car_model_id=${appStore.newBrands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).id}&generation_id=${appStore.newBrands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).generations.find(generation => generation.url_generation === $route.params.generation).id}`
//}

const checkCars = computed(() => cars.value.length > 1)

const title = computed(() => {
    if ($route.params.car) {
        return `Другие ${cleanUpTitle($route.params.brand, $route.params.model)} в наличии`
    } else if ($route.params.model) {
        return `Новые автомобили ${cleanUpTitle($route.params.brand, $route.params.model)} в наличии`
    } else if ($route.params.brand) {
        return `Новые автомобили ${cleanUpTitle($route.params.brand)} в наличии`
    } else {
        return 'Новые автомобили в наличии'
    }
})

getCars()
</script>

<template>
    <section class="" :ref="(el) => { appStore.newCatalog = el }">
        <div class="container">
            <div class="cars-list__header section__header">
                <CarsNewHead @updateCars="updateCars()" :title="`${title}`" />
            </div>

            <div class="cars-list__body">
                <div class="cars-list__list cars-template">
                    <div class="car__item" v-for="car in cars">
                        <CarSmallC1 :car="car" />
                    </div>
                </div>

                <div class="cars-list__load-more">
                    <button class="cars__more-button standart-button" v-if="totalPages > page "@click="loadPage()">
                        Загрузить ещё
                    </button>
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
    margin: 30px 0;
    
}

.cars__more-button{
    width: 260px;
                height: 39px;
                background-color: white;
                border: 2px solid #D2122B;
                color: #D2122B;
                transition: all 0.3s ease;
                font-weight: 600;
                border-radius: 5px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                &:hover {
                    background-color: #D2122B;
                    color: white;
                }
}

/*
.cars-list__body {
    @media screen and (max-width: 400px) {
        margin: 0 -10px;
    }
}
    */
</style>