<script setup>
import { useNewStore } from '/stores/NewStore.js'
const newStore = useNewStore()
import { options, name } from "@/constants/";

import { vMaska } from "maska/vue"


const formSend = ref(false)

const phoneValue = ref('')
const phoneError = ref(false)

const nameValue = ref('')
const nameError = ref(false)
let car = {
    brand: newStore.brand.brand
}

const validateForm = () => {
    const clearPhone = phoneValue.value.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');

    const formValues = {
        phone: clearPhone,
        name: nameValue.value,
    }

    const appType = 3



    if (clearPhone.length == 11 && nameValue.value ) {
        postForm(formValues, appType, car);
        // console.log(formValues, car, appType)
        
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
    <section>
        <div class="container" >
            <div class="form__block">
                <img :src="`${newStore.brand.banner}`" alt="">
                
                <form class="form__form-block" @submit.prevent="validateForm">
                    
                    <h2>Бесплатный автоподбор</h2>

                    <div class="base-input">
                        <label :class="{ active: nameValue }">ФИО</label>
                        <input
                            type="text"
                            v-model="nameValue"
                            class="form-input"
                            placeholder="Иванов Иван Иванович"
                        />
                    </div>

                    <div class="base-input">
                        <label :class="{ active: phoneValue }">Номер телефона</label>
                        <input
                            type="tel"
                            v-model="phoneValue"
                            class="form-input"
                            placeholder="+7(___)___-__-__"
                        />
                    </div>
    
                    <button type="submit" class="form__form-submit" 
                        :class="{ 'send': formSend }">
<<<<<<< HEAD
                        {{ formSend ? 'Заявка отправлена!' : 'Оставить заявку' }}
=======
                        {{ formSend ? 'Заявка отправлена!' : 'Остави11ть заявку' }}
>>>>>>> 0f026f39a4fce428c882cd6d8f551148273c2bc7
                    </button>
                </form>
            </div>
            
        </div>
    </section>
</template>

<style lang="scss" scoped>
section{
    margin-top: 20px;
    padding-bottom: 50px;
    @media screen and (max-width:1000px) {
        margin-top: 0;
    }
}
.form__block{
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    max-height: 582px;
    @media screen and (max-width:767px){
        position: relative;
        max-height: 400px;
        overflow: hidden;
        border-radius: 8px;
    }
    @media screen and (max-width: 570px){
        position: relative;
        height: 250px; // фиксированная высота
        max-height: unset;
        overflow: hidden;
        border-radius: 8px;
    }
    img{
        width: 100%;
        object-fit: cover;
        max-height: 282px;
        display: block;
        filter: brightness(40%);
        @media screen and (max-width:767px){
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(40%);
            display: block;
        }
    }

    .form__form-block{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 30px;
        color: white;
        gap: 20px;

        @media screen and (max-width:767px) {
            position: absolute;  // ✅ вернули
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 20px;
            background: transparent; // ✅ прозрачный фон
            color: white;
            z-index: 2;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 20px;
            border: none;
            box-shadow: none;
        }

        h2{
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        
        .base-input{
            position: relative;
            width: 25%;
            label {
                position: absolute;
                top: 0%;
                left: 12px;
                transform: translateY(-50%);
                background: rgba(51, 51, 51, 0.4);
                padding: 0 4px;
                font-size: 10px;
                color: #ebe6e6;
                pointer-events: none;
                transition: 0.2s ease;
                @media screen and (max-width:767px) {
                    color: rgb(197, 197, 197);
                    background: none;
                }
            }
            @media screen and (max-width:767px) {
                width: 100%;
            }
            .form-input{
                margin-bottom: 0;
                border: var(--border);
                border-radius: 5px;
                font-size: 12px;
                padding-left: 10px;
                color: white;
                &::placeholder {
                    font-size: 10px;
                }
                @media screen and (max-width:767px){
                    border: 1px solid #ccc;
                    color: white;
                    padding: 10px;
                    font-size: 14px;

                    &::placeholder {
                    color: #cacaca;
                    }
                }
            }
        }
        .form__form-submit{
            margin-top: 30px;
            border-radius: 5px;
            color: #fff;
            background: #D2122B;
            opacity: 1;
            width: 25%;
            font-size: 14px;
            padding: 7px 5px;
            @media screen and (max-width:767px) {
                width: 100%;
                background: #D2122B;
                color: white;
                font-size: 14px;
                padding: 10px;
                border-radius: 5px;
                margin-top: 20px;
            }
        }
    }
}



</style>