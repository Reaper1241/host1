<script setup>
import { options,  apiForm, name, birthDateMask} from "@/constants/";
import  SvgStar  from '@/components/Svg/Star.vue';
import { vMaska } from "maska/vue"
import axios from 'axios'

import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

import { useCreditStore } from "/stores/CreditStore.js";
const creditStore = useCreditStore();

import { useRouter } from "vue-router";
const router = useRouter();

const emits = defineEmits(['showCar']);

/* Form Check */
const formChecked = ref(true);
function returnEmit(value) {
    formChecked.value = value
}
/* Form Check */

/* Time List */
const timeListOutputData = ref(0);
const carInitialFee = ref(0);
const carPrice = ref(0);

function percentListOutput(value) {
    carInitialFee.value = value
}

function timeListOutput(value) {
    if (value == 0) {
        timeListOutputData.value = 0.5 * 12
    } else {
        timeListOutputData.value = value * 12
    }
}

let monthlyPayment = computed(() => {
    if (creditStore.carNew == 0) {
        return 0
    } else {
        let i = (appStore.creditPercent / 12) / 100;
        let k = ((carPrice.value) - ((carPrice.value * carInitialFee.value) / 100));
        let num = (i * (1 + i) ** timeListOutputData.value) / (((i + 1) ** timeListOutputData.value) - 1);
        let numb = (k * num);

        return Math.floor(numb)
    }
})
/* Time List */

const formSend = ref(false)

const phoneValue = ref('')
const phoneError = ref(false)

const nameValue = ref('')
const nameError = ref(false)

const birthValue = ref('')
const birthError = ref(false)
const isMinor = ref('')

function validateForm() {

    let clearPhone = phoneValue.value.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');
    const formValues = {
        phone: clearPhone,
        name: nameValue.value,
    }
    const appType = 2
    const car = creditStore.carNew ? creditStore.carNew : "";
    const isBirthValid = validateBirthDate()
    if (clearPhone.length == 11 && nameValue.value !=0 && isBirthValid ) {
        postForm(formValues, appType, car);
    }else{
        if (clearPhone.length < 11 && nameValue.value == 0 && birthValue.value ==0) {
            phoneError.value = true
            nameError.value = true
            birthError.value = true
            setTimeout(() => {
                phoneError.value = false
                nameError.value = false
                birthError.value = false
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
            if ( isBirthValid) {
                birthError.value = true
                setTimeout(() => {
                    birthError.value = false
                }, 3000)
            }
        }
    }
}

watch(() => creditStore.carNew, (currentData) => {
    if (currentData?.price) {
        carPrice.value = currentData.price - currentData?.sale
    }
})


watch(() => creditStore.carNew, () => {
  creditStore.carNew.monthlyPayment = monthlyPayment
});

const birthErrorMessage = ref('')
const maxDate = computed(() => new Date().toISOString().split('T')[0])
function validateBirthDate() {
  if (!birthValue.value) {
    birthError.value = true
    birthErrorMessage.value = 'Пожалуйста, введите дату рождения'
    return false
  }

  const today = new Date()
  const birthDate = new Date(birthValue.value)
  
  if (birthDate > today) {
    birthError.value = true
    birthErrorMessage.value = 'Дата рождения не может быть в будущем'
    return false
  }

  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  if (age < 18) {
    birthError.value = true
    birthErrorMessage.value = 'Вам должно быть не менее 18 лет'
    return false
  }

  birthError.value = false
  birthErrorMessage.value = ''
  return true
}
</script>

<template>
    <form action="#" class="form__form-content" @submit.prevent="validateForm">
        <div class="form__form-block">
            <div class="switcher">
            </div>
        </div>

        <div class="form__form-block">
            <div class="car__choice" type="button">
                <div class="car__choice-wrapper" 
                    >
                    <div class="car-choice-row">
                        <div class="value-name">
                            {{
                            creditStore.carNew?.brand
                                ? cleanUpTitle(
                                    creditStore.carNew.brand,
                                    creditStore.carNew.model,
                                    creditStore.carNew.modification,
                                    creditStore.carNew.complectation
                                )
                                : ''
                            }}
                        </div>
                        <button
                            type="button"
                            class="car-select-button"
                            @click="creditStore.modalShow()"
                        >
                            Выбрать авто
                        </button>
                    </div>

                    <div class="value" v-if="creditStore.carNew">

                        <div class="value-block">
                            <div class="image">
                                <img
                                    :src="`${creditStore.carNew.images[0]?.url ? creditStore.carNew.images[0].url : '/src/static/img/no_image.webp'}`">
                            </div>
                            <div class="price">
                                <div class="old">
                                    от {{ makeSpaces(creditStore.carNew.price) }} ₽
                                </div>
                                <div class="current">
                                    от
                                    {{ makeSpaces(creditStore.carNew.price - creditStore.carNew?.sale) }}
                                    ₽
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="form__form-block" :class="{ 'disabled': creditStore.carNew == 0 }">
            <FormPieceRangeSliderTime @timeListOutput="timeListOutput" />
        </div>

        <div class="form__form-block" :class="{ 'disabled': creditStore.carNew == 0 }">
            <FormPieceRangeSliderPercent :carPrice="carPrice" @percentListOutput="percentListOutput" />
        </div>

        <div class="form__form-block" :class="{ 'disabled': creditStore.carNew == 0 }">
            <div class="form__credit-data">
                <div class="credit-data__item">
                    <span>Платеж от</span>
                    <span class="value"><span class="bold">{{ makeSpaces(monthlyPayment) }}₽</span>/мес.</span>
                </div>
                <div class="credit-data__item">
                    <span>Ставка от</span>
                    <span class="value">{{ appStore.creditPercent }}%</span>
                </div>
            </div>
        </div>

        <div class="form__form-block">
            

            <div class="base-input">
                <input :class="{ 'is-invalid': nameError }" type="text" name="name" placeholder="Имя"
                    v-model="nameValue" autocomplete="off" v-maska="name" class="form-input">
            </div>
            <div class="base-input">
                <input :class="{ 'is-invalid': phoneError }" type="tel" name="contactPhone"
                    placeholder="Номер телефона" autocomplete="off" v-maska="options" v-model="phoneValue"
                    class="form-input">
            </div>
            <div class="base-input">
                     <!-- <TestElm v-model="birthValue" :class="{ 'is-invalid': birthError }"/>       -->
                <input 
                    type="text"
                    placeholder="ДД.ММ.ГГГГ"
                    v-model="birthValue"
                    :class="{ 'is-invalid': birthError }"
                    v-maska="birthDateMask"
                    @blur="validateBirthDate"
                    class="form-input"
                />
                <span v-if="birthError" class="error-message">{{ birthErrorMessage }}</span>
            </div>


            <FormPieceCheck @formChecked="returnEmit" :appType="2" />

            <button type="submit" class="form__form-submit" :disabled="!formChecked || Boolean(!creditStore.carNew )" :class="{ 'send': formSend }">
                {{ formSend ? 'Заявка отправлена!' : 'Оставить заявку' }}
            </button>
            <p class="form-text">
                <SvgStar/>
                Кредит предоставляется только гражданам РФ						
            </p>
        </div>
    </form>
</template>

<style scoped lang="scss">
.form__form-content {

    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    gap: 5px;
    
    @media screen and (max-width: 767px) {
        width: none;
        max-width: 500px;
    }
    @media screen and (max-width: 570px) {
        gap: 10px;
        max-width: 300px;
    }

    .form__form-block {
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: relative;
        
        .car__choice {

            height: 100%;
            width: 100%;

        //    border-radius: var(--border-small-radius);
            transition: 0.3s;
            background: white;
            color: var(--main-black);
            cursor: pointer;
            display: flex;
            
            position: relative;
            overflow: hidden;

            .car__choice-wrapper {
                height: 100%;
                padding: 20px 0;
                transition: 0.3s;
                width: 100%;
                .value {
                    display: flex;
                    gap: 10px;
                    flex-direction: column;

                    .value-name {
                        @media screen and (max-width: 540px) {
                            font-size: var(--standart-size);
                        }
                    }

                    .value-controls {
                        .select {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 5px 10px;
                            cursor: pointer;
                            border-radius: var(--border-small-radius);
                            border: var(--border);
                            transition: 0.3s;
                            width: -moz-fit-content;
                            width: fit-content;
                            font-size: var(--small-size);
                        }
                    }

                    .value-block {
                        display: none;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;

                        @media screen and (max-width: 768px) {
                            display: grid;
                        }

                        .image {
                            max-height: 100px;

                            img {
                                max-width: 100%;
                                max-height: 100%;
                                object-fit: contain
                            }
                        }

                        .price {
                            display: flex;
                            align-items: end;
                            flex-direction: column;
                            justify-content: center;

                            .old {
                                text-decoration: line-through;
                                color: var(--grey);
                                text-align: end;

                                @media screen and (max-width: 400px) {
                                    font-size: var(--small-size);
                                }
                            }

                            .current {
                                font-weight: bold;
                                font-size: 26px;
                                line-height: normal;
                                color: var(--main-color);
                                text-align: end;

                                @media screen and (max-width: 540px) {
                                    font-size: var(--large-size);
                                }

                                @media screen and (max-width: 400px) {
                                    font-size: var(--medium-size);
                                }

                                @media screen and (max-width: 340px) {
                                    font-size: var(--standart-size);
                                }
                            }
                        }
                    }
                }
                &:hover {
                    opacity: 0.6;
                    transition: 0.3s;
                }
            }

            .car__choice-wrapper.car {
                padding: 25px 15px 15px 15px;
            }

            .title.car {
                position: absolute;
                top: 7px;
                background: transparent;
                font-size: var(--small-size);
                font-weight: bold;
            }
        }

        .form__brands-choice {
            display: inline-flex;
            gap: 5px;
            border: 2px solid var(--main-color);
            border-radius: var(--border-radius);
        }

        .form__credit-data {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin: 10px 0;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 30px;

            @media screen and (max-width: 540px) {
                align-items: center;
                gap: 5px;
            }

            @media screen and (max-width: 360px) {
                flex-direction: column;
            }

            .credit-data__item {
                text-align: start;
                font-weight: bold;

                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;

                &::after {
                    content: "";
                    display: block;
                    flex-grow: 1;
                    height: 1px;
                    background-color: #e6e8ec;
                    margin: 0 8px;
                    position: relative;
                    top: 5px;
                }

                .value {
                    order: 1;
                }

                .bold {
                    font-size: var(--big-size);
                    font-weight: bold;
                    // color: var(--main-color);
                }
            }
        }

        .form__form-submit {
        //    border-radius: var(--border-small-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 15px;
            border-radius: 5px;
            background: #D2122B;
            color: var(--bg-light);
            font-weight: 300;
            transition: 0.3s;
            font-size: 12px;
            height: 19px;
            // border: 3px solid var(--main-color);

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
            cursor: pointer;

            select {
                border: var(--border);
                min-width: 210px;
                width: 100%;
                padding: 10px 15px;
                color: #f7f7f7;
                border-radius: var(--border-radius);
                background: white;
            }

            &:after {
                content: "\f107";
                position: absolute;
                right: 10px;
                top: 25px;
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
            background: white;
            min-width: 210px;
            width: 100%;
            color: #767676;
        //    border-radius: var(--border-small-radius);
            text-align: start;
            overflow: hidden;
            padding: 15px;
            border: var(--border);

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
                    cursor: pointer;

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
    }

}

.form__form-alert {
    padding: 15px;
    background: transparent;
//    border-radius: var(--border-small-radius);
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
  .form-text {
    color: #767676;
    font-size: 14px;
    margin-top: 15px;
    display: flex;
    align-items: flex-start;
    gap: 6px; // расстояние между звездочкой и текстом
    padding-left: 0; // убираем отступ, чтобы выровнять по левому краю
    margin-left: 0;  // если вдруг был
    width: 100%; // чтобы занять всю ширину

    svg {
      width: 14px;
      height: 14px;
      fill: red;
      margin-top: 2px;
      flex-shrink: 0;
    }
  }

  .error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
  display: block;
}
.form-input {
  height: 48px; // больше высота
  font-size: 14px; // крупнее текст
  padding: 0 15px;
  border-radius: 8px; // скругление углов
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
  transition: 0.3s ease;

  &:focus {
    border-color: var(--color-c); // или свой цвет
    outline: none;
  }

  &.is-invalid {
    border-color: #D2122B;
  }
}
.is-invalid {
  border-color: #D2122B !important;
}
.car-choice-row {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
}

.value-name {
  flex: 1;
  padding: 10px 12px;
  background-color: #f3f3f3;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 38px;
    min-width: 12vw;
    width: 120%;
  @media screen and (max-width: 540px) {
    width: 100%;
  }
}

.car-select-button {
  background-color: #d2122b;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.3s;

  &:hover {
    background-color: #aa0f22;
  }
}
</style>