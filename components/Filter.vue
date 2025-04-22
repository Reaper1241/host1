<script setup>
import { vMaska } from "maska/vue"
import { useRoute } from 'vue-router';
import { apiUsed } from "@/constants/";

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const $route = useRoute();

const emit = defineEmits(['showCars']);

const paramsLoading = ref(false);

const selectedPriceFrom = ref(null);
const selectedPriceTo = ref(null);

const selectedMileageFrom = ref(null);
const selectedMileageTo = ref(null);

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
const newBrands = ref([])
const models = ref([]);

const transmissions = ref([]);


const yearFrom = ref(0);
const yearTo = ref(0);
const years = ref([]);
const selectedYear = ref(0);

const priceFrom = ref(0);
const priceTo = ref(0);

const countCars = ref(0);

const brand = ref(0);
const model = ref(0);
const generation = ref(0);
const modification = ref(0);
const complectation = ref(0);
const fuel = ref(0);
const transmission = ref(0);
const drive = ref(0);
const body = ref(0);
const ownerCount = ref(0);

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
            case 'fuel_type_id':
                fuel.value = Number(newQueryArr.value[i][1]);
                break;
            case 'transmission_type_id':
                transmission.value = Number(newQueryArr.value[i][1]);
                break;
            case 'drive_type_id':
                drive.value = Number(newQueryArr.value[i][1]);
                break;
            case 'brand_id':
                brand.value = Number(newQueryArr.value[i][1]);
                break;
            case 'car_model_id':
                model.value = Number(newQueryArr.value[i][1]);
                break;
            case 'owner_count_id':
                ownerCount.value = Number(newQueryArr.value[i][1]);
                break;
            case 'year_from':
                yearFrom.value = Number(newQueryArr.value[i][1]);
                break;
            case 'price_from':
                priceFrom.value = Number(newQueryArr.value[i][1]);
                break;
            case 'price_to':
                priceTo.value = Number(newQueryArr.value[i][1]);
                break;
            case 'mileage_from':
                mileageFrom.value = Number(newQueryArr.value[i][1]);
                break;
            case 'mileage_to':
                mileageTo.value = Number(newQueryArr.value[i][1]);
                break;
            case 'body_type_id':
                body.value = Number(newQueryArr.value[i][1]);
                break;
            case 'generation_id':
                generation.value = Number(newQueryArr.value[i][1]);
                break;
        }
    }
    fetch(`${apiUsed}filters/params?${appStore.recentQuery}`)
        .then(res => res.json())
        .then(data => quary.value = data)
        .then(() => brands.value = quary.value.brands)
        .then(() => models.value = quary.value.models)
        .then(() => modifications.value = quary.value.modifications)
        .then(() => complectations.value = quary.value.complectations)
        .then(() => fuels.value = quary.value.fuels)
        .then(() => transmissions.value = quary.value.transmissions)
        .then(() => drives.value = quary.value.drives)
        .then(() => bodies.value = quary.value.bodies)
        .then(() => ownerCounts.value = quary.value.ownerCounts)
        .then(() => yearFrom.value = quary.value.yearFrom)
        .then(() => yearTo.value = quary.value.yearTo)
        .then(() => mileageFrom.value = quary.value.mileageFrom)
        .then(() => mileageTo.value = quary.value.mileageTo)
        .then(() => priceFrom.value = quary.value.priceFrom)
        .then(() => priceTo.value = quary.value.priceTo)
        .then(() => countCars.value = quary.value.countCars)
        .then(() => getYears())
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
        fetch(`${apiUsed}filters/params${$route.params.brand ? `?brand_id=${getBrand($route.params.brand)}` : ''}${$route.params.model ? `&car_model_id=${getModel($route.params.brand, $route.params.model)}` : ''}${$route.params.generation ? `&generation_id=${getGeneration($route.params.brand, $route.params.model, $route.params.generation)}` : ''}`)
            .then(res => res.json())
            .then(data => quary.value = data)
            .then(() => brands.value = quary.value.brands)
            .then(() => models.value = quary.value.models)
            .then(() => generations.value = quary.value.generations)
            .then(() => modifications.value = quary.value.modifications)
            .then(() => complectations.value = quary.value.complectations)
            .then(() => fuels.value = quary.value.fuels)
            .then(() => transmissions.value = quary.value.transmissions)
            .then(() => drives.value = quary.value.drives)
            .then(() => bodies.value = quary.value.bodies)
            .then(() => ownerCounts.value = quary.value.ownerCounts)
            .then(() => yearFrom.value = quary.value.yearFrom)
            .then(() => yearTo.value = quary.value.yearTo)
            .then(() => mileageFrom.value = quary.value.mileageFrom)
            .then(() => mileageTo.value = quary.value.mileageTo)
            .then(() => priceFrom.value = quary.value.priceFrom)
            .then(() => priceTo.value = quary.value.priceTo)
            .then(() => countCars.value = quary.value.countCars)
            .then(() => getYears())
            .then(() => appStore.recentQuery ? fullQuary = appStore.recentQuery : updateQuery())
            .then(() => appStore.recentQuery ? null : emit('showCars', fullQuary))
            .then(() => filterLoading.value = false)
            .then(() => paramsLoading.value = false)
    }
}

function getYears() {
    years.value = []
    for (let i = yearFrom.value; i <= yearTo.value; i++) {
        years.value.push({ id: i, name: i })
    }
    years.value = years.value.reverse()
}

function updateQuery() {
    fullQuary = [`${brand.value > 0 ? `brand_id=${brand.value}` : ''}`, `${model.value > 0 ? `car_model_id=${model.value}` : ''}`, `${generation.value > 0 ? `generation_id=${generation.value}` : ''}`, `${modification.value > 0 ? `modification_id=${modification.value}` : ''}`, `${complectation.value > 0 ? `complectation_id=${complectation.value}` : ''}`, `${fuel.value > 0 ? `fuel_type_id=${fuel.value}` : ''}`, `${transmission.value > 0 ? `transmission_type_id=${transmission.value}` : ''}`, `${drive.value > 0 ? `drive_type_id=${drive.value}` : ''}`, `${body.value > 0 ? `body_type_id=${body.value}` : ''}`, `${ownerCount.value > 0 ? `owner_count_id=${ownerCount.value}` : ''}`, `${selectedYear.value > 0 ? `year_from=${selectedYear.value}` : ''}`, `${unmaskedPriceFrom.value > 0 ? `price_from=${unmaskedPriceFrom.value}` : ''}`, `${unmaskedPriceTo.value > 0 ? `price_to=${unmaskedPriceTo.value}` : ''}`, `${selectedMileageFrom.value > 0 ? `mileage_from=${selectedMileageFrom.value}` : ''}`, `${selectedMileageTo.value > 0 ? `mileage_to=${selectedMileageTo.value}` : ''}`].filter(elm => elm).join('&')
}

function getBrand(brandName) {
    return appStore.newBrands.find(brand => brand.url_brand === brandName)?.id
}

function getModel(brandName, modelName) {
    return appStore.newBrands.find(brand => brand.url_brand === brandName)?.car_models.find(model => model.url_model === modelName)?.id
}

// function getGeneration(brandName, modelName, generationName) {
//     return appStore.brands.find(brand => brand.url_brand === brandName)?.car_models.find(model => model.url_model === modelName)?.generations.find(generation => generation.url_generation === generationName)?.id
// }


/* Обновляем параметры фильтрации при переходе между страницами */
if ($route.name === 'model') {
    model.value = getModel($route.params.brand, $route.params.model) || 0;
}
if (['brand', 'model'].includes($route.name)) {
    brand.value = getBrand($route.params.brand) || 0;
}
if ($route.name === 'generation') {
    model.value = getModel($route.params.brand, $route.params.model) || 0;
    brand.value = getBrand($route.params.brand) || 0;
}
/* Обновляем параметры фильтрации при переходе между страницами */

if ($route.name != 'car') {
    appStore.recentPage = $route.name
}


function reset() {
    brand.value = $route.name === 'brand' ? brand.value : 0;
    model.value = $route.name === 'model' ? model.value : 0;

    modification.value = 0;
    complectation.value = 0;
    fuel.value = 0;
    transmission.value = 0;
    drive.value = 0;
    body.value = 0;
    ownerCount.value = 0;

    selectedPriceFrom.value = null;
    selectedPriceTo.value = null;

    unmaskedPriceFrom.value = null;
    unmaskedPriceTo.value = null;

    selectedYear.value = 0;

    selectedMileageFrom.value = null;
    selectedMileageTo.value = null;
    fullQuary = ``

    emit('showCars', fullQuary)
    getFilterData(false)
}

function updateFilter(from) {
    if (brand.value == 0) {
        model.value = 0
        generation.value = 0
    }

    updateQuery()

    paramsLoading.value = true
    filterLoading.value = true

    fetch(`${apiUsed}filters/params?${fullQuary}`)
        .then(res => res.json())
        .then(data => quary.value = data)
        .then(() => from == 'brand' && brand.value != 0 ? null : brands.value = quary.value.brands)
        .then(() => from == 'model' && model.value != 0 ? null : models.value = quary.value.models)
        .then(() => from == 'generation' && generation.value != 0 ? null : generations.value = quary.value.generations)
        .then(() => from == 'modification' && modification.value != 0 ? null : modifications.value = quary.value.modifications)
        .then(() => from == 'complectation' && complectation.value != 0 ? null : complectations.value = quary.value.complectations)
        .then(() => from == 'fuel' && fuel.value != 0 ? null : fuels.value = quary.value.fuels)
        .then(() => from == 'transmission' && transmission.value != 0 ? null : transmissions.value = quary.value.transmissions)
        .then(() => from == 'drive' && drive.value != 0 ? null : drives.value = quary.value.drives)
        .then(() => from == 'body' && body.value != 0 ? null : bodies.value = quary.value.bodies)
        .then(() => from == 'ownerCount' && ownerCount.value != 0 ? null : ownerCounts.value = quary.value.ownerCounts)
        .then(() => yearFrom.value = quary.value.yearFrom)
        .then(() => yearTo.value = quary.value.yearTo)
        .then(() => mileageFrom.value = quary.value.mileageFrom)
        .then(() => mileageTo.value = quary.value.mileageTo)
        .then(() => priceFrom.value = quary.value.priceFrom)
        .then(() => priceTo.value = quary.value.priceTo)
        .then(() => countCars.value = quary.value.countCars)
        .then(() => getYears())
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
    <!-- <section class="filter">
        <div class="container">
            <div class="filter__button-mobile" @click="toggleFilter()">
                <span>{{ showFilter ? `Скрыть фильтры` : `Показать фильтры` }}</span>
                <span v-if="!showFilter"><i class="fa-solid fa-filter" /></span>
                <span v-else><i class="fa-solid fa-xmark" /></span>
            </div>
            <div class="filter__content" :class="{ 'active': showFilter }">
                <div class="filter__header">
                    <PieceTitle :title="'Подобрать Б/У авто по параметрам'" />
                    <button class="filter__header-reset" @click="reset">
                        Сбросить все фильры <img src="/assets/svg/xmark.svg" alt="reset">
                    </button>
                </div>
                <div class="filter__body">
                    <div class="filter__body-selects">
                            <BaseSelect v-model="brand" :label="'Марка'" :options="brands"
                                :disabled="$route.name == 'brand' || $route.name == 'model' || $route.name == 'generation' || paramsLoading"
                                class='wide' @change="updateFilter('brand')" />

                            <BaseSelect v-model="transmission" :label="'Коробка'" :options="transmissions"
                                :disabled="paramsLoading" @change="updateFilter(`transmission`)" />

                            <BaseSelect v-model="model" :label="'Модель'" :options="models"
                                :disabled="brand == 0 || $route.name == 'model' || $route.name == 'generation' || paramsLoading"
                                class='wide' @change="updateFilter('model')" />

                            <BaseSelect v-model="generation" :label="'Поколение'" :options="generations"
                                :disabled="model == 0 || $route.name == 'generation' || paramsLoading" class='wide'
                                @change="updateFilter(`generation`)" />

                            <label class="filter__body-input wide">
                                <input v-model="selectedPriceFrom" v-maska="options" type="text" name="selectPriceFrom"
                                    :placeholder="`Цена, от ${makeSpaces(priceFrom)} руб`" autocomplete="off"
                                    inputmode="numeric" :disabled="paramsLoading" @maska="unPriceFrom"
                                    @change="updateFilter()">
                                <span>|</span>
                                <input v-model="selectedPriceTo" v-maska="options" type="text" name="selectPriceTp"
                                    :placeholder="`до ${makeSpaces(priceTo)} руб`" autocomplete="off"
                                    inputmode="numeric" :disabled="paramsLoading" @maska="unPriceTo"
                                    @change="updateFilter()">
                            </label>

                            <BaseButton :disabled="!countCars || filterLoading"
                                class="wide filter__body-button wide black-button"
                                :label="countCars > 0 ? `Показать ${countCars} объявлений` : 'Авто не найдено'"
                                @click="emit('showCars', fullQuary), appStore.catalog.scrollIntoView({ behavior: 'smooth' })">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </BaseButton>
                    </div>

                    <div class="filter__body-selects mobile">
                        <div class="filter__body-column">
                            <BaseSelect v-model="brand" :label="'Марка'" :options="brands"
                                :disabled="$route.name == 'brand' || $route.name == 'model' || $route.name == 'generation' || paramsLoading"
                                class="wide" @change="updateFilter('brand')" />
                        </div>

                        <div class="filter__body-column">
                            <BaseSelect v-model="model" :label="'Модель'" :options="models"
                                :disabled="brand == 0 || $route.name == 'model' || $route.name == 'generation' || paramsLoading"
                                class="wide" @change="updateFilter('model')" />
                        </div>

                        <div class="filter__body-column">
                            <BaseSelect v-model="generation" :label="'Поколение'" :options="generations"
                                :disabled="model == 0 || $route.name == 'generation' || paramsLoading" class="wide"
                                @change="updateFilter(`generation`)" />
                        </div>

                        <div v-show="showMoreFilter" class="filter__body-column more">
                            <Title :title="'Дополнительные параметры'" class="wide" />
                            <BaseSelect v-model="fuel" :label="'Тип двигателя'" :options="fuels" class="wide"
                                :disabled="paramsLoading" @change="updateFilter(`fuel`)" />

                            <BaseSelect v-model="transmission" :label="'Коробка'" :options="transmissions" class="wide"
                                :disabled="paramsLoading" @change="updateFilter(`transmission`)" />


                            <BaseSelect v-model="drive" :label="'Привод'" :options="drives" class="wide"
                                :disabled="paramsLoading" @change="updateFilter(`drive`)" />

                            <BaseSelect v-model="ownerCount" :label="'Владельцев'" :options="ownerCounts" class="wide"
                                :disabled="paramsLoading" @change="updateFilter(`ownerCount`)" />

                            <BaseSelect v-model="selectedYear" :label="'Год от'" :options="years" class="wide"
                                :disabled="paramsLoading" name="selectYearFrom"
                                :class="selectedYear > 0 ? 'active' : ''" @change="updateFilter()" />

                            <BaseSelect v-model="body" :label="'Тип кузова'" :options="bodies" class="wide"
                                :disabled="paramsLoading" @change="updateFilter(`body`)" />

                            <label class="filter__body-input wide">
                                <input v-model="selectedMileageFrom" type="text" name="inputMileageFrom"
                                    :placeholder="`Пробег, от ${makeSpaces(mileageFrom)} км`" autocomplete="off"
                                    :disabled="paramsLoading" @change="updateFilter()">
                                <span>|</span>
                                <input v-model="selectedMileageTo" type="text" name="inputMileageTo"
                                    :placeholder="`до ${makeSpaces(mileageTo)} км`" autocomplete="off"
                                    :disabled="paramsLoading" @change="updateFilter()">
                            </label>

                            <label class="filter__body-input wide">
                                <input v-model="selectedPriceFrom" v-maska="options" type="text" name="selectPriceFrom"
                                    :placeholder="`Цена, от ${makeSpaces(priceFrom)} руб`" autocomplete="off"
                                    inputmode="numeric" :disabled="paramsLoading" @maska="unPriceFrom"
                                    @change="updateFilter()">
                                <span>|</span>
                                <input v-model="selectedPriceTo" v-maska="options" type="text" name="selectPriceTp"
                                    :placeholder="`до ${makeSpaces(priceTo)} руб`" autocomplete="off"
                                    inputmode="numeric" :disabled="paramsLoading" @maska="unPriceTo"
                                    @change="updateFilter()">
                            </label>
                        </div>

                        <div class="filter__body-column">
                            <BaseButton :disabled="!countCars || filterLoading"
                                class="wide filter__body-button wide black-button"
                                :label="countCars > 0 ? `Показать ${countCars} объявлений` : 'Авто не найдено'"
                                @click="emit('showCars', fullQuary), appStore.catalog.scrollIntoView({ behavior: 'smooth' })" />
                        </div>

                        <div class="filter__body-show" @click="showMoreFilter = !showMoreFilter">
                            {{ showMoreFilter ? `Скрыть фильтры` :
                                'Показать больше фильтров' }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> -->
    <section class="filter__section">
        <div class="container">
            <PieceTitle :title="'Подобор новых авто онлайн'" />
            <div class="filter">
                <BaseSelect v-model="brand" :label="'Марка'" :options="brands"
                    :disabled="$route.name == 'brand' || $route.name == 'model' || paramsLoading"
                    class='wide' @change="updateFilter('brand')" />

                <BaseSelect v-model="model" :label="'Модель'" :options="models"
                    :disabled="brand == 0 || $route.name == 'model' || $route.name == 'generation' || paramsLoading"
                    class='wide' @change="updateFilter('model')" />

                <BaseSelect v-model="transmission" :label="'Тип КПП'" :options="transmissions"
                    :disabled="paramsLoading" @change="updateFilter(`transmission`)" />
            </div>
            
        </div>
    </section>


</template>


<style scoped lang="scss">
// .filter {
//     padding: 20px 0;

//     .filter__button-mobile {
//         display: none;
//         cursor: pointer;
//         padding: 15px 25px;
//         background: #f6f6f6;
//     //    border-radius: var(--border-small-radius);
//         gap: 10px;

//         @media screen and (max-width: 768px) {
//             display: inline-flex;
//         }
//     }

//     .filter__content {
//         border-radius: var(--border-radius);
//         padding: 25px 0;
//         flex-direction: column;
//         gap: 20px;
//         display: none;

//         @media screen and (min-width: 768px) {
//             display: flex;
//         }

//         .filter__header {
//             display: flex;
//             justify-content: space-between;
//             // padding-bottom: 25px;

//             @media screen and (max-width: 540px) {
//                 flex-wrap: wrap;
//             }


//             .filter__header-reset {
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 gap: 10px;
//                 color: var(--main-black);
//                 background: var(--grey);
//                 padding: 10px 15px;
//                 border-radius: var(--border-radius);

//                 @media screen and (max-width: 540px) {
//                     margin-top: 15px;
//                 }
//             }
//         }

//         .filter__body-selects {
//             display: grid;
//             gap: 20px;
//             grid-template-columns: 1fr 1fr 1fr;

//             @media screen and (max-width: 1300px) {
//                 grid-template-columns: 1fr 1fr;
//             }

//             @media screen and (max-width: 1000px) {
//                 grid-template-columns: 1fr;
//                 gap: 35px;
//             }

//             @media screen and (max-width: 768px) {
//                 display: none;
//                 padding-top: 0;
//             }

//             .filter__body-column {
//                 display: grid;
//                 grid-template-columns: 1fr 1fr;
//                 gap: 10px;

//                 @media screen and (max-width: 500px) {
//                     grid-template-columns: 1fr;
//                     column-gap: 0;
//                     row-gap: 10px;
//                 }
//             }

//             .filter__body-column.more {
//                 margin-top: 30px;
//             }

//             .filter__body-select {
//                 flex-grow: 1;
//                 position: relative;

//                 &:after {
//                     content: "\f107";
//                     position: absolute;
//                     right: 10px;
//                     top: 50%;
//                     transform: translateY(-50%);
//                     font-family: "Font Awesome 6 Free";
//                     font-weight: 900;
//                     pointer-events: none;
//                     background: white;
//                     padding: 3px 4px;
//                     border-radius: 100%;
//                     text-align: center;
//                 }

//                 @media screen and (max-width: 500px) {
//                     grid-column-start: 1;
//                 }

//                 select {
//                     background: white;
//                     min-width: 210px;
//                     width: 100%;
//                     padding: 15px 15px;
//                     color: #767676;
//                     border-radius: var(--border-radius);

//                     option {
//                         padding: 5px;
//                     }
//                 }

//                 select.active {
//                     font-weight: bold;
//                 }
//             }

//             .filter__body-show {
//                 display: inline-block;
//                 width: max-content;
//                 padding: 10px 15px;
//                 background: white;
//                 border-radius: var(--border-radius);
//                 font-size: 16px;
//             }

//             .wide {
//                 grid-column-start: 1;
//                 grid-column-end: 3;
//             }

//             .filter__body-input {
//                 background: white;
//                 min-width: 210px;
//                 width: 100%;
//                 padding: 15px 15px;
//                 color: #767676;
//             //    border-radius: var(--border-small-radius);
//                 display: flex;
//                 border: var(--border);

//                 input {
//                     width: 49%;
//                 }

//                 input {
//                     &:last-child {
//                         text-align: end;
//                     }
//                 }
//             }

//             .filter__body-button {
//                 border: none;
//                 font-weight: bold;
//                 color: white;
//                 background: var(--green);
//             }
//         }

//         .filter__body-selects.mobile {
//             display: none;
//             gap: 10px;

//             @media screen and (max-width: 768px) {
//                 display: grid;
//             }
//         }


//         .filter__body-bodies {
//             display: grid;
//             gap: 20px;
//             grid-template-columns: repeat(8, 1fr);
//             border: none;

//             @media screen and (max-width: 1200px) {
//                 display: none;
//             }

//             .filter__body-body {
//                 display: inline-flex;
//                 flex-direction: column;
//                 justify-content: center;
//                 align-items: center;
//                 gap: 10px;
//                 padding: 20px 25px;
//                 border: none;
//                 border-radius: var(--border-radius);
//                 transition: 0.3s;
//                 cursor: pointer;

//                 p {
//                     transition: 0.3s;
//                     font-size: 12px;
//                 }

//                 &:hover {
//                     border: 2px solid var(--main-black);
//                     transition: 0.3s;

//                     p {
//                         font-weight: bold;
//                         transition: 0.3s;
//                     }
//                 }

//                 img {
//                     object-fit: contain;
//                     height: 100%;
//                     width: 100%;
//                 }
//             }


//         }

//         .filter__body-controls {
//             padding-top: 20px;
//             display: flex;
//             gap: 10px;
//             flex-wrap: wrap;

//             @media screen and (max-width: 540px) {
//                 gap: 5px;
//             }

//             .controls__item {
//                 padding: 8px 14px;
//                 background: white;
//                 border-radius: var(--border-radius);
//                 cursor: pointer;
//                 transition: 0.3s;

//                 &:hover {
//                     background: var(--main-black);
//                     color: var(--bg-light);
//                     transition: 0.3s;
//                 }

//                 @media screen and (max-width: 540px) {
//                     font-size: 12px;
//                     padding: 8px 8px;
//                 }
//             }
//         }
//     }

//     .filter__content.active {
//         display: flex;
//     }
// }

// select:disabled {
//     opacity: 0.5;
// }

.filter__section{
    background: #f8f8f8;
}

</style>