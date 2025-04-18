<script setup>
import { vMaska } from "maska/vue"
import { useRoute } from 'vue-router';
import { apiNew } from "@/constants/";

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const $route = useRoute();

const emit = defineEmits(['showCars']);

const paramsLoading = ref(false);

const selectedPriceFrom = ref(null);
const selectedPriceTo = ref(null);

const unmaskedPriceFrom = ref(null);
const unmaskedPriceTo = ref(null);

const options = {
    number: { unsigned: true, fraction: true },
    tokensReplace: true,
}

const unPriceFrom = (event) => {
    unmaskedPriceFrom.value = event.detail.unmasked
}

const unPriceTo = (event) => {
    unmaskedPriceTo.value = event.detail.unmasked
}
/* vMaska */

const filterLoading = ref(false);

const quary = ref([]);

const brands = ref([]);
const models = ref([]);

const transmissions = ref([]);
const drives = ref([]);

const priceFrom = ref(0);
const priceTo = ref(0);

const countCars = ref(0);

const brand = ref(0);
const model = ref(0);
const modification = ref(0);
const complectation = ref(0);
const fuel = ref(0);
const transmission = ref(0);
const drive = ref(0);

let fullQuary = ``
const showMoreFilter = ref(false);

/* Recent Quary */
const newQueryArr = ref([]);
function updateRecentFilter() {
    paramsLoading.value = true;
    const recentQueryArr = appStore.recentQuery.split('&');
    for (const i in recentQueryArr) {
        newQueryArr.value.push(recentQueryArr[i].split('='))
    }
    for (const i in newQueryArr.value) {
        switch (newQueryArr.value[i][0]) {
            case 'transmission_type_id':
                transmission.value = Number(newQueryArr.value[i][1]);
                break;
            case 'brand_id':
                brand.value = Number(newQueryArr.value[i][1]);
                break;
            case 'car_model_id':
                model.value = Number(newQueryArr.value[i][1]);
                break;
            case 'price_from':
                priceFrom.value = Number(newQueryArr.value[i][1]);
                break;
            case 'price_to':
                priceTo.value = Number(newQueryArr.value[i][1]);
                break;
        }
    }
    fetch(`${apiNew}filters/params?${appStore.recentQuery}`)
        .then(res => res.json())
        .then(data => quary.value = data)
        .then(() => brands.value = quary.value.brands)
        .then(() => models.value = quary.value.models)
        .then(() => transmissions.value = quary.value.transmissions)
        .then(() => priceFrom.value = quary.value.priceFrom)
        .then(() => priceTo.value = quary.value.priceTo)
        .then(() => countCars.value = quary.value.countCars)
        .then(() => appStore.recentQuery ? fullQuary = appStore.recentQuery : updateQuery())
        .then(() => appStore.recentQuery ? null : emit('showCars', fullQuary))
        .then(() => paramsLoading.value = false)
}
/* Recent Quary */

function getFilterData(recentStatus) {
    paramsLoading.value = true
    filterLoading.value = true
    if (appStore.recentCars?.count > 0 && !$route.params.car && recentStatus) {
        updateRecentFilter()
        paramsLoading.value = false
        filterLoading.value = false
    } else {
        if ($route.name == 'cars-china') {
            fetch(`${apiNew}filters/params?brand_tag_id=3${$route.params.brand ? `&brand_id=${getBrand($route.params.brand)}` : ''}${$route.params.model ? `&car_model_id=${getModel($route.params.brand, $route.params.model)}` : ''}`)
                .then(res => res.json())
                .then(data => quary.value = data)
                .then(() => brands.value = quary.value.brands)
                .then(() => models.value = quary.value.models)
                .then(() => transmissions.value = quary.value.transmissions)
                .then(() => priceFrom.value = quary.value.priceFrom)
                .then(() => priceTo.value = quary.value.priceTo)
                .then(() => countCars.value = quary.value.countCars)
                .then(() => appStore.recentQuery ? fullQuary = appStore.recentQuery : updateQuery())
                .then(() => appStore.recentQuery ? null : emit('showCars', fullQuary))
                .then(() => filterLoading.value = false)
                .then(() => paramsLoading.value = false)
        } else {
            fetch(`${apiNew}filters/params${$route.params.brand ? `?brand_id=${getBrand($route.params.brand)}` : ''}${$route.params.model ? `&car_model_id=${getModel($route.params.brand, $route.params.model)}` : ''}`)
                .then(res => res.json())
                .then(data => quary.value = data)
                .then(() => brands.value = quary.value.brands)
                .then(() => models.value = quary.value.models)
                .then(() => transmissions.value = quary.value.transmissions)
                .then(() => priceFrom.value = quary.value.priceFrom)
                .then(() => priceTo.value = quary.value.priceTo)
                .then(() => countCars.value = quary.value.countCars)
                .then(() => appStore.recentQuery ? fullQuary = appStore.recentQuery : updateQuery())
                .then(() => appStore.recentQuery ? null : emit('showCars', fullQuary))
                .then(() => filterLoading.value = false)
                .then(() => paramsLoading.value = false)
        }

    }
}

function updateQuery() {
    fullQuary = [`${brand.value > 0 ? `&brand_id=${brand.value}` : ''}`, `${model.value > 0 ? `car_model_id=${model.value}` : ''}`, `${transmission.value > 0 ? `&transmission_type_id=${transmission.value}` : ''}`, `${unmaskedPriceFrom.value > 0 ? `price_from=${unmaskedPriceFrom.value}` : ''}`, `${unmaskedPriceTo.value > 0 ? `price_to=${unmaskedPriceTo.value}` : ''}`].filter(elm => elm).join('&')
}

function getBrand(brandName) {
    return appStore.newBrands.find(brand => brand.url_brand === brandName)?.id
}

function getModel(brandName, modelName) {
    return appStore.newBrands.find(brand => brand.url_brand === brandName)?.car_models.find(model => model.url_model === modelName)?.id
}


/* Обновляем параметры фильтрации при переходе между страницами */
if ($route.name === 'model') {
    model.value = getModel($route.params.brand, $route.params.model) || 0;
}

if (['brand', 'model'].includes($route.name)) {
    brand.value = getBrand($route.params.brand) || 0;
}
/* Обновляем параметры фильтрации при переходе между страницами */

if ($route.name != 'car') {
    appStore.recentPage = $route.name
}


function reset() {
    // brand.value = $route.name === 'brand' ? brand.value : 0;
    model.value = $route.name === 'model' ? model.value : 0;

    modification.value = 0;
    complectation.value = 0;
    fuel.value = 0;
    transmission.value = 0;
    drive.value = 0;

    selectedPriceFrom.value = null;
    selectedPriceTo.value = null;

    unmaskedPriceFrom.value = null;
    unmaskedPriceTo.value = null;

    fullQuary = ``

    emit('showCars', fullQuary)
    getFilterData(false)
}

function updateFilter(from) {
    if (brand.value == 0) {
        model.value = 0
    }

    if (from == 'brand') {
        model.value = 0
        modification.value = 0
        complectation.value = 0
        fuel.value = 0
        transmission.value = 0
        drive.value = 0
        priceFrom.value = 0
        priceTo.value = 0
    }

    updateQuery()

    paramsLoading.value = true
    filterLoading.value = true

    fetch(`${apiNew}filters/params?${fullQuary}`)
        .then(res => res.json())
        .then(data => quary.value = data)
        // .then(() => from == 'brand' && brand.value != 0 ? null : brands.value = quary.value.brands)
        .then(() => from == 'model' && model.value != 0 ? null : models.value = quary.value.models)
        .then(() => from == 'transmission' && transmission.value != 0 ? null : transmissions.value = quary.value.transmissions)
        .then(() => priceFrom.value = quary.value.priceFrom)
        .then(() => priceTo.value = quary.value.priceTo)
        .then(() => countCars.value = quary.value.countCars)
        .then(() => filterLoading.value = false)
        .then(() => paramsLoading.value = false)
}

const showFilter = ref(false)
function toggleFilter() {
    showFilter.value = !showFilter.value
}

// emit('showCars', fullQuary)
getFilterData(true)
</script>

<template>


    <section class="filter__section">
        <div class="container">
            <div class="filter__header">
                <BaseSectionTitle :title="'Подобрать новые авто по параметрам'" />
            </div>
            <div class="filter">
                <BaseSelect v-model="brand" :label="'Марка'" :options="brands"
                    :disabled="$route.name == 'brand' || paramsLoading"
                    class='filter__select new__filter-select filter__item'
                    @change="$route.params.brand ? navigateTo(`/cars/${brandUrl ? brandUrl : ''}`) : updateFilter('brand')" />

                <BaseSelect v-model="model" :label="'Модель'" :options="models"
                    :disabled="brand == 0 || $route.name == 'model' || paramsLoading" @change="updateFilter('model')"
                    class='filter__select new__filter-select filter__item' />
                <BaseSelect v-model="transmission" :label="'Коробка'" :options="transmissions" :disabled="paramsLoading"
                    @change="updateFilter(`transmission`)" class='filter__select new__filter-select filter__item' />
                <div class="input-box filter__item">
                    <input v-model="selectedPriceFrom" v-maska="options" type="text" name="selectPriceFrom"
                        :placeholder="`Цена от `" autocomplete="off" inputmode="numeric" :disabled="paramsLoading"
                        @maska="unPriceFrom" @change="updateFilter()">
                </div>
                <div class="input-box filter__item">
                    <input v-model="selectedPriceTo" v-maska="options" type="text" name="selectPriceTp"
                        :placeholder="`Цена до`" autocomplete="off" inputmode="numeric" :disabled="paramsLoading"
                        @maska="unPriceTo" @change="updateFilter()">
                </div>

                <BaseButton :disabled="!countCars || filterLoading" class="filter__btn filter__item"
                    :label="countCars > 0 ? `Показать ${countCars} авто` : 'Авто не найдено'"
                    @click="emit('showCars', fullQuary), appStore.newCatalog.scrollIntoView({ behavior: 'smooth' })" />
            </div>
        </div>
    </section>

</template>


<style scoped lang="scss">
.filter {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;

    @media screen and (max-width: 767px) {
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }

    .filter__item {
        -ms-flex-positive: 1;
        flex-grow: 1;
        margin-right: 15px;

        &:last-child {
            margin-right: 0;
        }

        @media screen and (max-width: 767px) {
            margin: 5px;
        }
    }

    .input-box {
        -ms-flex-preferred-size: 100px;
        flex-basis: 100px;

        @media screen and (max-width: 767px) {
            -ms-flex-preferred-size: 45%;
            flex-basis: 45%;
        }
    }

    .new__filter-select {
        -ms-flex-preferred-size: 150px;
        flex-basis: 150px;

        @media screen and (max-width: 1000px) {
            -ms-flex-preferred-size: 120px;
            flex-basis: 120px;
        }

        @media screen and (max-width: 767px) {
            -ms-flex-preferred-size: 100%;
            flex-basis: 100%;
        }
    }

    button {
        display: block;
        border: none;
        background-color: var(--color-c);
        padding: 12px 26px;
        text-transform: uppercase;
        text-align: center;
        color: #fff;
        transition: 0.6s;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        font-size: inherit;
        width: max-content;


    }


    input {
        padding: 7px 15px;
        border: 1px solid #ccc;
        background: transparent;
        position: relative;
        z-index: 1;
        font-size: inherit;
        width: 100%;
        min-width: 88px;
    }
}

.filter__section {
    background: #f8f8f8;
    margin-bottom: 40px;
    padding: 20px 0;
}

.filter__header {
    margin-bottom: 10px;
}
</style>