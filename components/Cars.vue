<script setup>
import { apiUsed } from "@/constants/";
import { useRoute } from 'vue-router';
import { useAppStore } from '/stores/AppStore.js';

const $route = useRoute();
const appStore = useAppStore();

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


function getCars() {
    if (appStore.recentCars.cars?.length > 0 && !$route.params.car) {
        cars.value = appStore.recentCars.cars
        carsCount.value = appStore.recentCars.count
        totalPages.value = appStore.recentCars.totalPages
        page.value = appStore.recentCars.page
    } else {
        carsLoading.value = true

        const url = new URL(`${apiUsed}filters/cars`);
        url.searchParams.set('sorting', appStore.sort);
        url.searchParams.set('page', page.value);
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

    fetch(`${apiUsed}filters/cars?sorting=${appStore.sort}&per_page=${appStore.currentPerPage}&page=${page.value}&${quary.value}`)
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

    fetch(`${apiUsed}filters/cars?sorting=${appStore.sort}&per_page=${appStore.currentPerPage}&page=${page.value}&${quary.value}`)
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

if ($route.params.car) {
    quary.value = `&brand_id=${appStore.brands.find(brand => brand.url_brand === $route.params.brand).id}&car_model_id=${appStore.brands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).id}&generation_id=${appStore.brands.find(brand => brand.url_brand === $route.params.brand).car_models.find(model => model.url_model === $route.params.model).generations.find(generation => generation.url_generation === $route.params.generation).id}`
}

const checkCars = computed(() => cars.value.length > 1 || !$route.params.car)

getCars()
</script>

<template>
    <section v-if="checkCars" :ref="(el) => { appStore.catalog = el }" class="cars section">
        <div class="cars__content" v-if="!carsLoading">
            <div class="container">
                <CarsHead :cars-count="carsCount - ($route.params.car ? 1 : 0)" @update-cars="updateCars()" />
            </div>
            <div class="cars__container">
                <div class="container">
                    <div class="cars__body cars-template">
                        <CarSmall_G v-for="car in cars" :key="car" :car="car" />
                    </div>
                    <div class="cars__more">
                        <button class="cars__more-button standart-button" v-if="totalPages > page"
                            @click="loadPage()">Загрузить ещё</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="cars__content">
            <div class="container">
                <div class="skeleton" />
            </div>
            <div class="cars__container">
                <div class="container">
                    <div class="cars__body cars-template">
                        <div v-for="car in (cars.length == 0 ? appStore.currentPerPage : cars.length)" :key="car"
                            class="skeleton-car">
                            <div class="image skeleton" />
                            <div class="small-text skeleton" />
                            <div class="text skeleton" />
                            <div class="text skeleton" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<style scoped lang="scss">
.cars {
    scroll-margin-top: 15vh;

    .cars__content {
        display: flex;
        flex-direction: column;

        .cars__more {
            display: flex;
            justify-content: center;
            padding: 25px 0;
        }
    }

}
</style>