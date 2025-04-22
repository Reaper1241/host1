<script setup>
import { apiUsed } from "@/constants/";
import { useRoute } from 'vue-router';
import { useAppStore } from '/stores/AppStore.js';

const $route = useRoute();
const appStore = useAppStore();

const props = defineProps(['currentQuary'])
let quary = ref('')

const carsLoading = ref(false);

let cars = ref([]);
let query = ref([]);
let carsCount = ref(0);
let next_page_url = ref(null);



function getCars() {
    carsLoading.value = true


    const url = new URL(`${apiUsed}filters/cars`);
    url.searchParams.set('sorting', appStore.sort);
    url.searchParams.set('per_page', $route.params.car ? appStore.currentPerPage + 1 : appStore.currentPerPage);

    if ($route.params.brand) {
        const brand = appStore.brands.find((b) => b.url_brand === $route.params.brand);
        url.searchParams.set('brand_id', brand.id);
    }

    if ($route.params.model || $route.params.car) {
        const model = appStore.brands
            .find((b) => b.url_brand === $route.params.brand)
            .car_models.find((m) => m.url_model === $route.params.model);
        url.searchParams.set('car_model_id', model.id);
    }

    if ($route.params.generation) {
        const generation = appStore.brands
            .find((b) => b.url_brand === $route.params.brand)
            .car_models.find((m) => m.url_model === $route.params.model)
            .generations.find((g) => g.url_generation === $route.params.generation);
        url.searchParams.set('generation_id', generation.id);
    }

    fetch(url.toString())
        .then(res => res.json())
        .then(data => query.value = data)
        .then(() => cars.value = query.value.cars.data)
        .then(() => carsCount.value = query.value.count)
        .then(() => !$route.params.car ? appStore.recentCars = query.value : null)
        .then(() => appStore.firstCar = cars.value[0])
        .then(() => yandexEcommerceArray('impressions', cars.value))
        .then(() => carsLoading.value = false)
        .then(() => next_page_url.value = query.value.cars.next_page_url)
}

function updateCars() {
    carsLoading.value = true
    fetch(`${apiUsed}filters/cars?sorting=${appStore.sort}&per_page=${appStore.currentPerPage}&${quary.value}`)
        .then(res => res.json())
        .then(data => query.value = data)
        .then(() => cars.value = query.value.cars.data)
        .then(() => carsCount.value = query.value.count)
        .then(() => !$route.params.car ? appStore.recentCars = query.value : null)
        .then(() => yandexEcommerceArray('impressions', cars.value))
        .then(() => carsLoading.value = false)
}

function nextPage() {
    fetch(`${next_page_url.value}&sorting=price_asc&per_page=9`)
}

if ($route.params.car) {
    quary.value = `&brand_id=${appStore.brands.find(brand => brand.url_brand === $route.params.brand).id}&car_model_id=${appStore.brands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).id}&generation_id=${appStore.brands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).generations.find(generation => generation.url_generation === $route.params.generation).id}`
}

const checkCars = computed(() => cars.value.length > 1 || !$route.params.car)

getCars()
</script>

<template>
    <section class="cars" :ref="(el) => { appStore.catalog = el }" v-if="checkCars">
        <div class="cars__content" v-if="!carsLoading">
            <div class="container">
                <CarsHead :carsCount="carsCount - ($route.params.car ? 1 : 0)" @updateCars="updateCars()"></CarsHead>
            </div>
            <div class="cars__container">
                <div class="container">
                    <div class="cars__body">
                        <CarSmall_G v-for="car in cars" :key="car" :car="car" />
                    </div>
                    <div class="cars__more">
                        <button class="cars__more-button standart-button" @click="appStore.perPage, nextPage()"
                            v-if="carsCount > appStore.currentPerPage">Загрузить ещё</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="cars__content" v-else>
            <div class="container">
                <div class="skeleton"></div>
            </div>
            <div class="cars__container">
                <div class="container">
                    <div class="cars__body">
                        <div v-for="car in appStore.currentPerPage" :key="car" class="skeleton-car">
                            <div class="image skeleton"></div>
                            <div class="small-text skeleton"></div>
                            <div class="text skeleton"></div>
                            <div class="text skeleton"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<style scoped lang="scss">
.cars {
    // padding: 40px 0;
    scroll-margin-top: 15vh;
    margin-top: 5vh;

    .cars__content {
        display: flex;
        flex-direction: column;

        .cars__body {
            display: flex;
            gap: 20px;
            padding-top: 25px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;

            @media screen and (max-width: 1450px) {
                grid-template-columns: 1fr 1fr 1fr;
            }


            @media screen and (max-width: 1050px) {
                grid-template-columns: 1fr 1fr;
            }

            @media screen and (max-width: 768px) {
                grid-template-columns: 1fr;
            }
        }

        .cars__more {
            display: flex;
            justify-content: center;
            padding: 25px 0;
        }
    }

}
</style>