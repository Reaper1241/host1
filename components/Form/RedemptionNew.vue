<script setup>
import { options, numberMask, name } from "@/constants/";

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

const phoneValue = ref('')
const phoneError = ref(false)

const brandValue = ref('');
const modelValue = ref('');
const yearValue = ref('');
const milleageValue = ref('');

const brandError = ref(false);
const modelError = ref(false);
const yearError = ref(false);
const milleageError = ref(false);

const formChecked = ref(true);
function returnEmit(value) {
    formChecked.value = value
}

const nameValue = ref('')
const nameError = ref(false);

const optionsNumber = {
    number: { unsigned: true, fraction: true },
    tokensReplace: true,
}

const validateForm = () => {
    const clearPhone = phoneValue.value.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');

    const formValues = {
        phone: clearPhone,
        name: nameValue.value,
        brand: brandValue.value,
        model: modelValue.value,
        year: yearValue.value
    }

    const appType = 2

// console.log(brandValue.value);

    if (clearPhone.length == 11 && nameValue.value && brandValue.value && modelValue.value && milleageValue.value && yearValue.value) {
        postForm(formValues, appType);
    //     console.log({
    //     formValues: formValues,
    //     appType: appType,
    // })
    }else{
        if (clearPhone.length < 11 && nameValue.value == 0 && brandValue.value == 0 && modelValue.value == 0 && milleageValue.value == 0 && yearValue.value == 0) {
            phoneError.value = true
            nameError.value = true
            brandError.value = true;
            modelError.value = true;
            yearError.value = true;
            milleageError.value = true;
            setTimeout(() => {
                phoneError.value = false
                nameError.value = false
                brandError.value = false;
                modelError.value = false;
                yearError.value = false;
                milleageError.value = false;
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
            if ( brandValue.value == 0) {
                brandError.value = true
                setTimeout(() => {
                    brandError.value = false
                }, 3000)
            }
            if ( milleageValue.value == 0) {
                milleageError.value = true
                setTimeout(() => {
                    milleageError.value = false
                }, 3000)
            }
            if ( modelValue.value == 0) {
                modelError.value = true
                setTimeout(() => {
                    modelError.value = false
                }, 3000)
            }
            if ( yearValue.value == 0) {
                yearError.value = true
                setTimeout(() => {
                    yearError.value = false
                }, 3000)
            }
        }
    }
};



</script>

<template>
<form class="form__form-block" @submit.prevent="validateForm">
    <p>Данные вашего автомобиля</p>
    
    <div class="base-input">
        <input type="text" :class="{ 'is-invalid': brandError }" name="brand" placeholder="Марка" v-model="brandValue"
            autocomplete="off" class="form-input">
    </div>

    <div class="base-input">
        <input type="text" :class="{ 'is-invalid': modelError }" name="model" placeholder="Модель" v-model="modelValue"
            autocomplete="off" class="form-input">
    </div>

    <div class="base-input">
        <input type="text" :class="{ 'is-invalid':  yearError }" name="year" placeholder="Год" v-model="yearValue"
            autocomplete="on" class="form-input" v-maska="numberMask"
            @change="validateYear">
    </div>
    <div class="base-input">
        <input type="text" :class="{ 'is-invalid': milleageError }" name="milleage" placeholder="Пробег" v-model="milleageValue"
            autocomplete="off" class="form-input" v-maska="optionsNumber" maxlength="9">
    </div>
    <p>Ваши данные</p>
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



</template>

<style lang="scss" scoped>
.form__form-block{
    border-radius: 8px;
    border: 1px solid var(--color-c);
    padding: 20px;
    height: max-content;

    p{
        color: black !important;
        font-weight: 700;
        font-size: 14px;
        margin-bottom: 10px;
    }

    .form__form-submit{
        width: 100%;
        display: flex;
        justify-content: center;
        border-radius: 5px;
        height: 30px;
        align-items: center;
        border: none;
        background-color: var(--color-c);
        padding: 12px 26px;
        // text-transform: uppercase;
        text-align: center;
        color: #fff;
        transition: 0.6s;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        font-size: 12px; 
    }
}
.form-input {
  border: 1px solid #ccc;
  border-radius: 5px; // ✅ Скругление углов
  padding: 18px 18px;
  font-size: 13px;
  width: 100%;
  box-sizing: border-box;
  transition: 0.3s ease;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.05); // (опционально) лёгкая тень

  &:focus {
    outline: none;
    border-color: var(--color-c);
    box-shadow: 2px 2px 8px rgba(210, 18, 43, 0.2);
  }

  &.is-invalid {
    border-color: #D2122B;
  }
}


</style>