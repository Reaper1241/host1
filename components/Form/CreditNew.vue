<script setup>
import Input from '@/components/Base/Input.vue';
import Textarea from '@/components/Base/Textarea.vue';
import FormTitle from '@/components/Base/FormTitle.vue';
import Select from '@/components/Base/Select.vue';

import { options, apiUsed, name, errors } from "@/constants/";
import { vMaska } from "maska/vue"

import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const emits = defineEmits(['showCar']);

let formSend = ref(false)

let brandValue = ref(0);
let modelValue = ref(0);
let generationValue = ref(0);
let carValue = ref(0);
let showAuto = ref(false);

function replaceKeysWithNames(arr, keysToReplace = ['brand', 'model', 'generation']) {
    return arr.map(item => {
        const newItem = { ...item };
        keysToReplace.forEach(key => {
            if (newItem[key]) {
                newItem.name = newItem[key];
                delete newItem[key];
            }
        });
        return newItem;
    });
}

const brands = replaceKeysWithNames(Object.values(appStore.brands));

const models = ref([]);
const generations = ref([]);
const cars = ref([]);

function getModels() {
    if (brandValue.value > 0) {
        models.value = replaceKeysWithNames(Object.values(appStore.getModelsByBrand(brandValue)));
        formFields.value.find(field => field.name === 'model').bindings.options = models.value;
        formFields.value.find(field => field.name === 'model').bindings.disabled = false;
    } else {
        models.value = [];
        formFields.value.find(field => field.name === 'model').bindings.disabled = true;
    }
    modelValue.value = 0
    generationValue.value = 0
    carValue.value = 0
    showAuto.value = false
}

function getGenerations() {
    if (modelValue.value > 0) {
        generations.value = appStore.getGenerationsByModel(brandValue, modelValue)
    }
    generationValue.value = 0
    carValue.value = 0
    showAuto.value = true
}

function getCars() {
    let query = `${brandValue.value > 0 ? `brand_id=${brandValue.value}` : ''}${modelValue.value > 0 ? `&car_model_id=${modelValue.value}` : ''}${generationValue.value > 0 ? `&generation_id=${generationValue.value}` : ''}`
    fetch(`${apiUsed}filters/cars?sorting=price_asc&per_page=8&${query}`).then(res => res.json()).then(data => cars.value = data.cars.data)
}

function getCar() {
    showAuto.value = false
    fetch(`${apiUsed}cars/car/${carValue.value.id}`)
        .then(res => res.json())
        .then(data => currCar.value = data)
        .then(() => carPrice.value = currCar.value.sale ? currCar.value.price - currCar.value.sale : currCar.value.price)
        .then(() => emits('showCar', currCar.value))
}


const formFields = shallowRef([
    { component: FormTitle, bindings: { title: 'Выберите автомобиль' } },
    {
        name: 'brand', component: Select, bindings: {
            label: 'Марка', options: brands, modelValue: 0, class: 'form-select', onChange: (value) => {
                brandValue.value = value
                getModels()
            }
        }
    },
    {
        name: 'model', component: Select, bindings: {
            label: 'Модель', disabled: brandValue.value == 0, options: models.value, modelValue: 0, class: 'form-select', onChange: (value) => {
            }
        }
    },
    { component: FormTitle, bindings: { title: 'Ваши данные' } },
    { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: '+7 (___) ___-__-__', modelValue: '', class: 'form-input', type: 'tel', maska: options } },
    { name: 'name', component: Input, bindings: { label: 'ФИО', placeholder: 'Ваше ФИО', modelValue: '', class: 'form-input', type: 'text', maska: name } },
]);

const handleFormSubmit = (formData) => {
    console.log('Форма отправлена!', formData);
};
</script>

<template>

    <BaseForm :fields="formFields" @submit="handleFormSubmit" :submit-text="`Оставить заявку`" :appType="9" />
</template>

<style scoped lang="scss">
.form__form-content {
    display: flex;
    flex-direction: column;
    gap: 50px;
    width: 100%;
    position: relative;

    @media screen and (max-width: 768px) {
        gap: 30px;
    }

    /*
    &:before {
        content: "";
        display: block;
        position: absolute;
        left: 38px;
        width: 5px;
        height: 75%;
        border-left: 5px dashed var(--main-black);

        @media screen and (max-width: 768px) {
            display: none;
        }
    }
        */

    .form__form-block {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-left: 100px;
        position: relative;

        @media screen and (max-width: 768px) {
            margin-left: 0;
        }

        /*
        @media screen and (max-width: 540px) {
            margin-left: 30px;
        }
        */

        .form__credit-data {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
            padding: 40px 0;
            border: 2px solid var(--border-color);
            border-radius: var(--border-radius);

            @media screen and (max-width: 540px) {
                align-items: start;
                padding: 15px;
                gap: 15px;
            }

            @media screen and (max-width: 360px) {
                flex-direction: column;
            }

            .credit-data__item {
                text-align: start;
                font-weight: bold;

                span {
                    font-size: 25px;
                    font-weight: bold;
                    color: var(--main-color);
                }
            }
        }

        &:before {
            position: absolute;
            left: -100px;
            background: var(--light-grey);
            border: 5px solid var(--main-color);
            /* padding: 30px; */
            width: 80px;
            height: 80px;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 36px;
            font-weight: bold;
            color: var(--main-color);
            z-index: 10;

            @media screen and (max-width: 768px) {
                display: none;
            }

            /*
            @media screen and (max-width: 540px) {
                margin-left: 45px;
                width: 50px;
                height: 50px;
                font-size: 26px;
            }
            */

        }

        &:after {
            content: "";
            display: block;
            position: absolute;
            left: -60px;
            width: 5px;
            height: 120%;
            border-left: 5px dashed var(--main-black);

            @media screen and (max-width: 768px) {
                display: none;
            }
        }

        &:nth-child(1) {
            &:before {
                content: "1";
            }
        }

        &:nth-child(2) {
            &:before {
                content: "2";
            }
        }

        &:nth-child(3) {
            &:before {
                content: "3";
            }

            &:after {
                display: none;
            }
        }

        .form__form-submit {
            border-radius: var(--border-radius);
            padding: 15px;
            background: var(--main-color);
            color: var(--bg-light);
            font-weight: bold;
            transition: 0.3s;
            border: 3px solid var(--main-color);

            &:hover {
                background: var(--bg-light);
                transition: 0.3s;
                color: var(--main-color);
            }
        }

        .form__form-notice {
            text-align: start;
            display: flex;
            align-items: center;
            gap: 5px;

            span {
                font-size: 30px;
                line-height: normal;
                color: var(--main-color);
                font-weight: bold;
            }
        }

        .form__form-select {
            position: relative;

            select {
                border: 2px solid var(--border-color);
                min-width: 210px;
                width: 100%;
                padding: 10px 15px;
                color: #767676;
                border-radius: var(--border-radius);
                background: white;
            }

            &:after {
                content: "\f107";
                position: absolute;
                right: 10px;
                top: 10px;
                font-family: "Font Awesome 6 Free";
                font-weight: 900;
                pointer-events: none;
                background: var(--light-grey);
                padding: 3px 4px;
                border-radius: 100%;
                text-align: center;
                color: var(--main-black);
                transition: 0.3s;
            }

        }

        .form__form-select.auto {
            border: 2px solid var(--border-color);
            min-width: 210px;
            width: 100%;
            color: #767676;
            border-radius: var(--border-radius);
            background: white;
            text-align: start;
            cursor: pointer;
            overflow: hidden;

            .auto__title {
                padding: 10px 15px;
            }

            .auto__select {
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-height: 400px;
                overflow: auto;

                @media screen and (max-width: 540px) {
                    gap: 20px;
                }

                .auto__select-item {
                    display: grid;
                    grid-template-columns: 2fr 4fr;
                    height: auto;
                    align-items: center;

                    .auto__select-item-text {
                        padding: 0 10px;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        color: var(--main-black);
                        font-size: var(--standart-size);

                        @media screen and (max-width: 540px) {
                            gap: 5px;
                        }

                        .auto__select-item-title {
                            font-weight: bold;
                        }

                        .auto__select-item-info {
                            display: flex;
                            justify-content: space-between;
                            background: var(--main-color);
                            padding: 5px 10px;
                            color: white;
                            border-radius: 15px;

                            @media screen and (max-width: 540px) {
                                font-size: 12px;
                            }
                        }

                        .auto__select-item-price {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            @media screen and (max-width: 540px) {
                                flex-direction: column;
                            }

                            .price__current {
                                font-size: 16px;
                                font-weight: bold;
                            }

                            .price__old {
                                text-decoration: line-through;
                            }
                        }
                    }

                    .auto__select-item-image {
                        width: 100%;
                        height: 100%;

                        img {
                            object-fit: contain;
                            width: 100%;
                            height: 100%;
                        }

                    }
                }
            }

        }

        .form__form-select.active {
            &:after {
                transform: rotate(180deg);
                transition: 0.3s;
            }
        }

        .form__form-select.auto.disabled,
        .form__form-select.disabled {
            pointer-events: none;
            opacity: 0.6;
        }

        .form__form-title {
            font-weight: bold;
            text-align: start;
            padding-bottom: 10px;
        }

        input {
            border: 2px solid var(--border-color);
            width: 100%;
            padding: 10px 15px;
            color: #767676;
            border-radius: var(--border-radius);
            background: white;
        }
    }

}

.form__form-alert {
    padding: 15px;
    background: transparent;
    border-radius: var(--border-radius);
    color: var(--main-color);
    font-weight: bold;
    border: 3px solid var(--main-color);
}

.form__form-block.disabled div {
    pointer-events: none;
    opacity: 0.6;
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    background: white;
    border-radius: 5px;
}

::-webkit-scrollbar-thumb {
    background: rgba(95, 95, 95, 0.582);
    border-radius: 5px;
}
</style>