<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

import { useCreditStore } from "/stores/CreditStore.js";
const creditStore = useCreditStore();

import { apiNew } from "@/constants/";

const emits = defineEmits(['closeModal', 'choiceCar']);

const props = defineProps({
    selectedCategory: String,
})

const selectedBrand = ref(appStore.newBrands[0]);
const selectedModel = ref();
const selectedMod = ref();
const selectedComp = ref();

const selectedStep = ref(0);

const modelsList = ref([]);
const modList = ref([]);

function createColorsArray(num) {
    if (!selectedModel.value?.colored_galleries.length) return [];
    const array = [];
    for (let i = 0; i < num; i++) {
        array.push(selectedModel.value?.colored_galleries[i % selectedModel.value?.colored_galleries.length]?.url || '');
    }
    return array;
}
function getModels(brandId) {
    fetch(`${apiNew}models/${brandId}`).then(res => res.json()).then(data => modelsList.value = data)
}

function getModel(modelId) {
    fetch(`${apiNew}models/model/${modelId}`)
        .then(res => res.json())
        .then(data => modList.value = data.modifications)
}

const choiceCar = computed(() => {
    return {
        brand: selectedBrand.value.brand,
        model: selectedModel.value.model,
        images: selectedModel.value.colored_galleries,
        sale: selectedModel.value.min_sale,
        modification: selectedMod.value.modification,
        engine_size: selectedMod.value.engine_size,
        power: selectedMod.value.power,
        price: selectedComp.value.price,
        complectation: selectedComp.value.complectation
    }
})

getModels(selectedBrand.value.id)
</script>

<template>
    <div class="modal modal__credit" @click.self="emits('closeModal'), car ? yandexEcommerce('remove', car) : null">
        <div class="modal__dialog">
            <div class="modal__content">
                <div class="modal__title">
                    Выберите новый авто
                </div>

                <div class="modal__steps">
                    <div class="modal__step" :class="{ 'active': selectedStep, 'current': selectedStep == 0 }"
                        @click="selectedStep = 0">
                        {{ selectedBrand.id ? `1. ${selectedBrand.brand}` : '1. Марка' }}
                    </div>
                    <div class="modal__step" :class="{ 'active': selectedBrand, 'current': selectedStep == 1 }"
                        @click="selectedStep = 1">
                        {{ selectedModel ? `2. ${selectedModel.model}` : '2. Модель' }}
                    </div>
                    <div class="modal__step" :class="{ 'active': selectedModel, 'current': selectedStep == 2 }"
                        @click="selectedStep = 2">
                        {{ selectedMod ? `3. ${selectedMod.modification}` : '3. Модификация' }}
                    </div>
                    <div class="modal__step" :class="{ 'active': selectedMod, 'current': selectedStep == 3 }"
                        @click="selectedStep = 3">
                        {{ selectedComp ? `4. ${selectedComp.complectation}` : '4. Комплектация' }}
                    </div>
                </div>

                <div class="modal__steps-content">
                    <div class="modal__step-block" v-if="selectedStep == 0">
                        <ul class="brands__list">
                            <li class="brand__item" v-for="brand in appStore.newBrands"
                                :class="{ 'active': selectedBrand == brand }"
                                @click="selectedBrand = brand, selectedStep = 1, getModels(selectedBrand.id),
                                    selectedModel = null, modelsList = null, modList = null, selectedComp = null, selectedMod = null" >
                                <div class="item__image">
                                    <img :src="brand.logo" :alt="brand.brand">
                                </div>
                                <div class="item__name">
                                    {{ brand.brand }}
                                </div>
                                <div class="item__count">
                                    {{ brand.cars_count == 0 ? '' : brand.cars_count }}
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="modal__step-block" v-else-if="selectedStep == 1">
                        <ul class="models__list">
                            <li class="model__item" v-for="model in modelsList"
                                :class="{ 'active': selectedModel == model }"
                                @click="selectedModel = model, selectedStep = 2, getModel(selectedModel.id), modList = null, selectedMod = null, selectedComp = null">
                                <div class="item__name">
                                    {{ model.model }}
                                </div>
                                <div class="item__image">
                                    <img :src="model?.colored_galleries[0]?.url" :alt="model.model">
                                </div>
                                <div class="price">
                                    <p class="old__price">от {{ makeSpaces(model.min_price + model.min_sale) }} руб.</p>
                                    <p class="new__price">от {{ makeSpaces(model.min_price) }} руб.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="modal__step-block" v-else-if="selectedStep == 2">
                        <ul class="modifications__list grid__template-list">
                            <li class="modifications__item" v-for="(mod, index) in modList"
                                :class="{ 'active': selectedMod == mod }"
                                @click="selectedMod = mod, selectedStep = 3, selectedComp = null">
                                <div class="item__name">
                                    {{ mod.modification }}
                                </div>
                                <div class="item__image">
                                    <img :src="createColorsArray(modList.length)[index]" :alt="mod.modification">
                                </div>
                                <div class="price">
                                    <p class="old__price" v-if="selectedModel.min_sale">от {{ makeSpaces(mod.min_price +
                                        selectedModel.min_sale) }} руб.</p>
                                    <p class="new__price">от {{ makeSpaces(mod.min_price) }} руб.</p>
                                </div>
                                <div class="item__button">
                                    <BaseButton :label="'Выбрать'" :class="'credit-mod'" />
                                </div>
                            </li>
                        </ul>
                    </div>


                    <div class="modal__step-block" v-else-if="selectedStep == 3">
                        <ul class="completations__list grid__template-list">
                            <li class="completations__item" v-for="(comp, index) in selectedMod.car_complectations"
                                :class="{ 'active': selectedComp == comp }"
                                @click="selectedComp = comp, emits('closeModal'), creditStore.carNew = choiceCar">
                                <div class="item__name">
                                    {{ comp.complectation }}
                                </div>
                                <div class="item__image">
                                    <img :src="selectedModel.colored_galleries.length > index ? selectedModel.colored_galleries[index].url : '/src/static/img/no_image.webp'"
                                        :alt="comp.complectation" v-if="selectedModel.colored_galleries.length">
                                </div>
                                <div class="price">
                                    <p class="old__price" v-if="selectedModel.min_sale">от {{ makeSpaces(comp.min_price
                                        + selectedModel.min_sale) }} руб.</p>
                                    <p class="new__price">от {{ makeSpaces(comp.min_price) }} руб.</p>
                                </div>
                                <div class="item__button">
                                    <BaseButton :label="'Выбрать'" :class="'credit-mod'" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <button class="modal__close-credit modal__close" type="button" @click="emits('closeModal')">
                    <span class="close__text">Закрыть</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal__credit {
    animation: fadeIn 0.3s ease-in-out;

    .modal__dialog {
        .modal__content {
            display: flex;
            flex-direction: column;

            padding: 40px;
            height: 90vh;

            padding: 40px;
            min-height: 90vh;

            width: 60vw;

            @media screen and (max-width: 1200px) {
                width: 90vw;
            }

            @media screen and (max-width: 768px) {
                padding: 20px 10px;
                width: 95vw;
            }

            .modal__title {
                font-size: 24px;
                font-weight: 500;
                margin-bottom: 20px;
            }

            .modal__steps {
                display: flex;
                gap: 5px;
                flex-wrap: wrap;

                .modal__step {
                    padding: 4px 10px;
                    border: var(--border);
                    border-radius: var(--border-radius);
                    opacity: 0.4;
                    cursor: not-allowed;
                    pointer-events: none;
                    font-size: var(--small-size);
                }

                .current {
                    opacity: 1;
                    background: white;
                    color: var(--color-c);
                    cursor: pointer;
                    pointer-events: auto;
                }

                .active {
                    opacity: 1;
                    cursor: pointer;
                    pointer-events: auto;
                    transition: 0.3s;
                    border:1px solid var(--color-c) ;
                }
            }

            .modal__steps-content {
                margin-top: 20px;
                height: max-content;
                overflow: auto;
                padding-right: 10px;

                &::-webkit-scrollbar {
                    width: 5px;
                }

                &::-webkit-scrollbar-track {
                    background: white;
                    border-radius: 5px;
                }

                &::-webkit-scrollbar-thumb {
                    background: rgba(95, 95, 95, 0.582);
                    border-radius: 5px;
                }

                .brands__list {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;

                    @media screen and (max-width: 1200px) {
                        grid-template-columns: repeat(3, 1fr);
                    }

                    @media screen and (max-width: 768px) {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 10px;
                    }

                    .brand__item {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        gap: 15px;
                        cursor: pointer;

                        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
                        border-radius: 10px;
                        padding: 15px 20px;
                        transition: 0.3s;

                        &:hover {
                            border: 2px solid var(--color-c);
                            border-radius: 8px;
                            transition: 0.3s;
                        }

                        .item__image {
                            img {
                                width: 100%;
                                height: 50px;
                                object-fit: contain;
                            }
                        }

                        .item__name {
                            font-weight: 600;
                            text-align: center;
                        }
                    }

                    .active {
                        border: 2px solid var(--color-c);
                        border-radius: 8px;
                    }
                }

                .grid__template-list {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                }

                .modifications__list {
                    .modifications__item {
                        display: flex;
                        justify-content: center;
                        // align-items: center;
                        flex-direction: column;
                        gap: 10px;
                        cursor: pointer;
                        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
                        border-radius: 15px;
                        padding: 10px;
                        transition: 0.3s;
                        text-align: center;

                        .item__name {
                            font-weight: 600;
                        }

                        .item__image {
                            padding: 20px;

                            @media screen and (max-width: 768px) {
                                padding: 0;
                            }

                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: contain;
                            }
                        }
                    }
                }

                .completations__list {
                    .completations__item {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        gap: 10px;
                        cursor: pointer;
                        background: #f5f5f5;
                        border: 2px solid #f5f5f5;
                        border-radius: 15px;
                        padding: 10px;
                        transition: 0.3s;
                        text-align: center;

                        .item__image {
                            padding: 20px;

                            @media screen and (max-width: 768px) {
                                padding: 0;
                            }

                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: contain;
                            }
                        }
                    }
                }

                .items__list {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;

                    .active {
                        background: var(--color-c);
                        color: white;
                    }
                }

                .models__list {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;

                    @media screen and (max-width: 1200px) {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    @media screen and (max-width: 768px) {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 10px;
                    }


                    .model__item {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                        text-align: center;
                        padding: 20px;
                        //   border-radius: 20px;;
                        border: 2px solid #f5f5f5;
                        cursor: pointer;
                        transition: 0.3s;

                        @media screen and (max-width: 768px) {
                            padding: 10px;
                        }

                        &:hover {
                            border: 2px solid var(--color-c);
                            transition: 0.3s;
                        }

                        .item__image {
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: contain;
                            }
                        }
                    }
                }
            }

            .modal__close {
                top: 15px;
                right: 15px;

                .close__text {
                    display: none;
                }
            }
        }
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.price {
    .old__price {
        font-size: 16px;
        color: #b8b8b8;
        text-decoration: line-through;

        @media screen and (max-width:500px) {
            font-size: 14px;
        }

        @media screen and (max-width:370px) {
            font-size: 11px;
        }
    }

    .new__price {
        font-size: 18px;
        color: var(--color-c);
        font-weight: 600;

        @media screen and (max-width:500px) {
            font-size: 16px;
        }

        @media screen and (max-width:370px) {
            font-size: 13px;
        }
    }
}
</style>