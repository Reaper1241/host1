<script setup>
import { options,  numberMask, name } from "@/constants/";

function validateYear() {
    if (yearValue.value.length == 4) {
        if (yearValue.value < 1990) {
            yearValue.value = 1990
        } else if (yearValue.value > new Date().getFullYear()) {
            yearValue.value = new Date().getFullYear()
        }
    } else if (yearValue.value == '') {
        yearValue.value = null
    } else {
        yearValue.value = 2020
    }
}

import { vMaska } from "maska/vue"
import axios from 'axios'

import { useCreditStore } from "/stores/CreditStore.js";
const creditStore = useCreditStore();

import { useRouter } from "vue-router";
const router = useRouter();

const emits = defineEmits(['showCar']);

import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const steps = ref(['Данные вашего авто', 'Данные нового авто', 'Оформление заявки'])
const activeStep = ref(0)

/* Form Check */
const formChecked = ref(true);
function returnEmit(value) {
    formChecked.value = value
}
/* Form Check */

const formSend = ref(false)

const phoneValue = ref('')
const phoneError = ref(false)

const brandValue = ref();
const modelValue = ref();
const yearValue = ref();

const nameValue = ref('')
const nameError = ref(false)

const nextStage = computed(() => {
    let result = true
    if(brandValue.value && modelValue.value && yearValue){
        result = false
    }else{
        result = true
    }

    return result
})

watch(() => creditStore.category, (currentData) => {
    creditStore.carNew = null
})

const carStatus = computed(() => {
    return Boolean(creditStore.carNew)
})

const validateForm = () => {
    const clearPhone = phoneValue.value.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');

    const formValues = {
        phone: clearPhone,
        name: nameValue.value,
        brand: brandValue.value,
        model: modelValue.value,
        year: yearValue.value
    }

    const appType = 8
    const car = creditStore.carNew ? creditStore.carNew : creditStore.carUsed

    console.log({
        formValues: formValues,
        appType: appType,
        car: car,
    })

    if (clearPhone.length == 11 && nameValue.value ) {
        postForm(formValues, appType, car);
    }else{
        if (clearPhone.length < 11 && nameValue.value == 0 ) {
            phoneError.value = true
            nameError.value = true
            setTimeout(() => {
                phoneError.value = false
                nameError.value = false
            }, 3000)
        }else {
            if (clearPhone.length < 11 ) {
                phoneError.value = true
                setTimeout(() => {
                    phoneError.value = false
                }, 3000)
            }
            if ( nameValue.value == 0) {
                nameError.value = true
                setTimeout(() => {
                    nameError.value = false
                }, 3000)
            }
        }
    }
};



</script>

<template>

    <section class="page section">
        <div class="container">
            <div class="page__content">
                <div class="page__form">
                    <div class="form__form">
                        <div class="form__steps-wrapper">
                            <div class="form__steps">
                                <ul class="form__steps-list">
                                    <li class="form__steps-item"
                                        :class="{ 'form__steps-item--active': activeStep === 0 || activeStep === 1 || activeStep === 2 }">
                                        <div class="form__steps-item__number">1</div>
                                        <div class="form__steps-item__text">Данные вашего авто</div>
                                    </li>
                                    <li class="form__steps-item"
                                        :class="{ 'form__steps-item--active': activeStep === 1 || activeStep === 2 }">
                                        <div class="form__steps-item__number">2</div>
                                        <div class="form__steps-item__text">Данные нового авто</div>
                                    </li>
                                    <li class="form__steps-item" :class="{ 'form__steps-item--active': activeStep === 2 }">
                                        <div class="form__steps-item__number">3</div>
                                        <div class="form__steps-item__text">Оформление заявки</div>
                                    </li>

                                </ul>
                                <div class="form__steps-progress">
                                    <div class="form__steps-progress--filled"
                                        :style="{ width: (activeStep === 0 ? '50%' : `${(activeStep / (steps.length - 1)) * 115}%`) }">
                                    </div>
                                </div>
                            </div>
                        </div>    
                        <div class="form__content">
                            <div class="form__content-item" v-show="activeStep === 0">
                                <div class="form__form-block">
                                    <div class="base-input">
                                        <input type="text" name="brand" placeholder="Марка" v-model="brandValue"
                                            autocomplete="off" class="form-input">
                                    </div>

                                    <div class="base-input">
                                        <input type="text" name="model" placeholder="Модель" v-model="modelValue"
                                            autocomplete="off" class="form-input">
                                    </div>

                                    <div class="base-input">
                                        <input type="text" name="year" placeholder="Год" v-model="yearValue"
                                            autocomplete="on" class="form-input" v-maska="numberMask"
                                            @change="validateYear">
                                    </div>
                                </div>

                                <div class="item__controls">
                                    <button class="btn" @click="activeStep = 1" :disabled="nextStage">
                                        Перейти к следующему шагу
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="form__content-item" v-show="activeStep === 1">
                                <div class="form__form-block">

                                    <div class="switcher">
                                        <div class="switcher__inner">
                                            
                                        </div>
                                    </div>

                                    <div class="car__choice">
                                        <div class="car-show"
                                            v-if="creditStore.carNew">
                                            <div class="car-show__wrapper">
                                                <div class="car-show__image">
                                                    <img
                                                        :src="`${creditStore.carNew.images[0]?.url ? creditStore.carNew.images[0].url : '/src/static/img/no_image.webp'}`">
                                                </div>
                                                <div class="car-show__content">
                                                    <div class="car-show__title">
                                                        {{ cleanUpTitle(creditStore.carNew.brand,
                                                            creditStore.carNew.model,
                                                            creditStore.carNew.modification,
                                                            creditStore.carNew.complectation) }}
                                                    </div>
                                                    <div class="car-show__price">
                                                        <div class="block">
                                                            <span class="old">
                                                                от {{ makeSpaces(creditStore.carNew.price) }} ₽
                                                            </span>
                                                            <span class="current">
                                                                от
                                                                {{ makeSpaces(creditStore.carNew.price -
                                                                    creditStore.carNew?.sale)
                                                                }}
                                                                ₽
                                                            </span>
                                                        </div>
                                                        <span class="credit">
                                                            от
                                                            {{
                                                                makeSpaces(appStore.calcMonthPriceModel(creditStore.carNew?.sale,
                                                                    creditStore.carNew.price)) }}
                                                            ₽/мес.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="car-show__select" @click="creditStore.modalShow()">
                                                Выбрать другое авто
                                            </div>
                                        </div>

                                        

                                        <div class="car-select" v-else>
                                            <div class="car-select__wrapper" @click="creditStore.modalShow()">
                                                <div class="car-select__image">
                                                    <img src="/assets/img/dimensions3.png" alt="no image">
                                                </div>
                                                <div class="car-select__title">
                                                    {{ creditStore.category == 'new' ? 'Выберите новое авто' :
                                                        'Выберите авто с пробегом' }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="item__controls">
                                    <button class="btn" @click="activeStep = 2" :disabled="!carStatus">Продолжить <i
                                            class="fa-solid fa-arrow-right"></i></button>

                                    <button class="btn" @click="activeStep = 0">
                                        <i class="fa-solid fa-arrow-left"></i>
                                        Назад
                                    </button>
                                </div>
                            </div>
                            <div class="form__content-item" v-show="activeStep === 2">

                                <form class="form__form-block" @submit.prevent="validateForm">
                                    <!-- <div class="form__form-alert" v-if="phoneError || nameError">Заполните
                                        обязательные
                                        поля<br>(Телефон)</div> -->

                                    <div class="base-input">
                                        <input :class="{ 'is-invalid': nameError }" type="text" name="name"
                                            placeholder="Имя" v-model="nameValue" autocomplete="off" v-maska="name"
                                            class="form-input">
                                    </div>

                                    <div class="base-input">
                                        <input :class="{ 'is-invalid': phoneError }" type="tel" name="contactPhone"
                                            placeholder="+7 (___) ___-__-__" autocomplete="off" v-maska="options"
                                            v-model="phoneValue" class="form-input">
                                    </div>

                                    <FormPieceCheck @formChecked="returnEmit" :appType="2" />

                                    <button type="submit" class="form__form-submit" :disabled="!formChecked"
                                        :class="{ 'send': formSend }">
                                        {{ formSend ? 'Заявка отправлена!' : 'Оставить заявку' }}
                                    </button>
                                </form>

                                <div class="item__controls">
                                    <button class="btn" @click="activeStep = 1">
                                        <i class="fa-solid fa-arrow-left"></i>
                                        Назад
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page__text">
                    <PieceBenefitsCredit />
                    <!-- <div class="page__text-content"
                        v-html="appStore?.newSeo[$route.name]?.text_content ? removeTrash(appStore.newSeo[$route.name].text_content) : null">
                    </div> -->
                    <PieceTradeText/>
                </div>
            </div>
        </div>

        <Teleport to="body">
            <div v-show="creditStore.isOpen">
                <ModalCarChoiceNew :selectedCategory="creditStore.category" @closeModal="creditStore.modalShow()"
                    @choiceCar="choiceCar($event)" v-if="creditStore.category == 'new'" />
            </div>
        </Teleport>
    </section>

</template>

<style scoped lang="scss">

.form-input{
    border-radius: 5px;
    font-size: 13px;
    padding: 20px;
}
.page {
    .page__content {
        .page__form {

            .form__form {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                border: none;
                
                .form__steps-wrapper {
                    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.1);
                    border-radius: 12px;
                    padding:  20px; // ✅ исправлено
                    background: #fff;
                    width: 100%;
                    margin-bottom: 30px;

                    .form__steps {
                    width: 100%;
                    position: relative;
                    padding: 0 20px;
                    margin-bottom: 50px;

                    &-list {
                        position: relative;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin: 0;
                        padding: 0;
                        list-style: none;
                        gap: 15px;
                        z-index: 2;
                    }

                    &-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        position: relative;
                        min-height: 20px; // 🧩 чтобы подписи влезали

                        &--active {
                        .form__steps-item__number {
                            background: var(--color-c);
                            transition: 0.3s;
                        }

                        .form__steps-item__text {
                            color: var(--main-black);
                            transition: 0.3s;
                        }
                        }
                    }


                        &-item__number {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            background: #dbdbdb;
                            font-size: 20px;
                            font-weight: 700;
                            color: white;
                            transition: 0.3s;
                        }

                        &-item__text {
                            font-size: var(--small-size);
                            text-align: center;
                            position: absolute;
                            width: 90px;
                            top: 45px;
                            color: #dbdbdb;

                        }

                        &-progress {
                            position: absolute;
                            top: 50%;
                            left: 0;
                            width: 84%;
                            height: 3px;
                            background-color: #dbdbdb;
                            transform: translateY(-50%);
                            z-index: 0;
                            border-radius: 10px;
                            overflow: hidden;
                            left: calc(40px / 2); // половина ширины кружка слева
                            right: calc(40px / 2); // половина ширины кружка справа
                            &--filled {
                                background-image: linear-gradient(to right, var(--color-c), var(--color-c));
                                background-size: 100% 100%;
                                background-repeat: no-repeat;
                                width: 10%;
                                transition: width 0.3s ease-in-out;
                                height: 100%;

                            }
                            @media screen and (max-width: 1200px) {
                                width: 91%;
                            }
                            @media screen and (max-width: 570px) {
                                width: 84%;
                            }
                        }
                    }
                }

                .form__content {
                    width: 100%;
                    height: 100%;
                    padding: 20px;
                    border-radius: 8px;
                    border: 1px solid #D2122B;
                    .form__content-item {
                        animation: fadeIn 0.3s ease-in-out;
                        min-height: 150px;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        gap: 15px;
                        
                        .form__form-block {
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                            position: relative;
                            
                            .form__form-submit {
                                border-radius: var(--border-small-radius);
                                padding: 15px;
                                background: var(--color-c);
                                color: var(--bg-light);
                                font-weight: bold;
                                transition: 0.3s;
                                // border: 3px solid var(--main-color);

                                &:hover {
                                    background: var(--bg-light);
                                    transition: 0.3s;
                                    color: var(--main-color);
                                }
                            }
                        }


                        .item__controls {
                            width: 100%;
                            display: flex;
                            justify-content: center; // ✅ Центрируем
                            margin-top: 20px;
                            align-items: center;

                            .btn {
                                justify-content: space-between;
                                display: flex;
                                align-items: center;
                                background: #D2122B;
                                max-height: 35px;
                                color: white;
                                border: none;
                                padding: 14px 20px;
                                width: 100%;         // ✅ На всю ширину родителя
                                max-width: 100%;
                                text-align: center;
                                border-radius: 8px;
                                font-size: 13px;
                                font-weight: 600;
                                cursor: pointer;
                                transition: background 0.3s;

                                &:hover {
                                background: #a30f20;
                                }

                                i {
                                margin-left: 8px;
                                }
                            }
                        }

                    }
                }
            }
        }
    }
}


.car__choice {
    .car-select {
        .car-select__wrapper {
            display: flex;
            flex-direction: column;
            gap: 15px;
            justify-content: center;
            align-items: center;

            padding: 30px;
            border-radius: var(--border-radius);
            border: var(--border);

            cursor: pointer;
            transition: 0.3s;

            &:hover {
                opacity: 0.7;
                transition: 0.3s;
            }

            .car-select__title {
                text-align: center;
            }

            .car-select__image {
                img {
                    width: 100%;
                    height: 100%;
                    filter: grayscale(100%);
                }
            }
        }
    }

    .car-show {
        .car-show__wrapper {
            display: grid;
            grid-template-columns: 2fr 3fr;
            gap: 10px;
            overflow: hidden;
            border-radius: var(--border-small-radius);
            border: var(--border);
            cursor: pointer;

            @media screen and (max-width: 768px) {
                grid-template-columns: 1fr;
            }

            .car-show__content {
                padding: 20px 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 10px;

                @media screen and (max-width: 768px) {
                    padding: 0 10px 10px 10px;
                }

                .car-show__title {
                    font-size: 18px;
                    font-weight: 600;
                }

                .car-show__price {
                    display: flex;
                    align-items: end;
                    gap: 15px;
                    flex-wrap: wrap;

                    @media screen and (max-width: 768px) {
                        gap: 5px;
                    }

                    .block {
                        display: flex;
                        flex-direction: column;
                    }

                    .old {
                        text-decoration: line-through;
                        color: var(--grey);
                    }

                    .current {
                        font-weight: bold;
                        font-size: 18px;
                        line-height: normal;
                        color: var(--color-c);
                        @media screen and (max-width:1200px) {
                            font-size: 26px;
                        }
                    }

                    .credit {
                        color: var(--green);
                        font-size: var(--standart-size);
                        border: 1px solid var(--green);
                        padding: 5px;
                        border-radius: var(--border-small-radius);
                    }
                }
            }

            .car-show__image {
                padding: 30px;
                background: #f6f6f6;
                min-width: 250px;

                @media screen and (max-width: 768px) {
                    padding: 15px;
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }

            .car-show__image.used {
                padding: 0;

                @media screen and (max-width: 768px) {
                    padding: 0;
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }

        .car-show__select {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: var(--border-small-radius);
            border: var(--border);
            transition: 0.3s;
            width: fit-content;
            font-size: var(--standart-size);

            &:hover {
                opacity: 0.7;
                transition: 0.3s;
            }
        }
    }
}
</style>