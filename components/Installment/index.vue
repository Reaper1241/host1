<script setup>
import { apiNew } from "@/constants/";
import  SvgStar  from '@/components/Svg/Star.vue';
import { useAppStore } from '@/stores/AppStore.js'
const appStore = useAppStore()

import { options,  apiForm, name } from "@/constants/";

import { vMaska } from "maska/vue"

const newBrands = computed(() => appStore.newBrands);

const selectedBrand = ref(0);
const brand_car = ref([])

const modelsList = ref([]);
const selectedModel = ref(0)
const model_car = ref([])

const modList = ref([])
const selectedCom = ref(0)


/* Form Check */
const formChecked = ref(true);
function returnEmit(value) {
    formChecked.value = value
}
/* Form Check */


function getBrand(brandId){
    fetch(`${apiNew}brands/brand/${brandId}`).then(res => res.json()).then(data =>{
        brand_car.value = data;
    })
}

function getModels(brandId) {
    fetch(`${apiNew}models/${brandId}`).then(res => res.json()).then(data => {
        modelsList.value = data;
    });
}

function getModel(modelId) {
    fetch(`${apiNew}models/model/${modelId}`)
        .then(res => res.json())
        .then(data => {
            modList.value = data.modifications;
            model_car.value = data
        });
}

const complectation = computed(() => {
  const result = [];
let i = 0;
  if (modList.value && Array.isArray(modList.value)) {

    modList.value.forEach((modification, modIndex) => {
        let j = 0;
      if (modification && modification.car_complectations && Array.isArray(modification.car_complectations)) {

        modification.car_complectations.forEach((complectation, compIndex) => {

          const modificationStr = modification.modification || '';
          const complectationStr = complectation.complectation || '';
          const priceStr = complectation.min_price ? (complectation.min_price).toString() : '';
          const price = complectation.min_price ? (complectation.min_price) : '';

          result.push({
            id: price, 
            name: `${modificationStr}/${complectationStr}/${priceStr}`,
            mod: i,
            com: j
          });
          j++;
        });
        i++;
      } 
    });
    i++;
  }
  return result;
});


const formSend = ref(false)

const phoneValue = ref('')
const phoneError = ref(false)

const nameValue = ref('')
const nameError = ref(false)

const brandError = ref(false)
const modelError = ref(false)
const comError = ref(false)


function validateForm() {

    let clearPhone = phoneValue.value.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');
    const formValues = {
        phone: clearPhone,
        name: nameValue.value,
    }
    const appType = 2
    

    if (clearPhone.length == 11 && nameValue.value !=0 && selectedBrand.value !=0 && selectedModel.value !=0 && selectedCom.value !=0) {
        // postForm(formValues, appType, car);
    }else{

        
        if (clearPhone.length < 11 && nameValue.value == 0 && selectedBrand.value == 0 && selectedCom.value == 0 && selectedModel.value == 0 ) {
            phoneError.value = true
            nameError.value = true
            brandError.value = true
            brandError.value = true
            modelError.value = true            
            comError.value = true

            setTimeout(() => {
                phoneError.value = false
                nameError.value = false
                brandError.value = false
                modelError.value = false            
                comError.value = false
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
            if ( selectedBrand.value ==0) {
                brandError.value = true
                setTimeout(() => {
                    brandError.value = false
                }, 3000)
            }
            if ( selectedModel.value ==0) {
                modelError.value = true
                setTimeout(() => {
                    modelError.value = false
                }, 3000)
            }if ( selectedCom.value ==0) {
                comError.value = true
                setTimeout(() => {
                    comError.value = false
                }, 3000)
            }
        }
    }
}

const car = computed(() => {
        const test ={
            brand : brand_car.value.brand,
            model : model_car.value.model,
            price : complectation[selectedCom-1].id
        }
        return test
    })


</script>


<template>
    
  <div class="container">
    <div class="box">
        <div class="form"  >
            <form @submit.prevent="validateForm">
                <p class="title">Выберите автомобиль</p>
                <select name="" id="" :class="{ 'is-invalid': brandError }" v-model="selectedBrand" @change="getModels(selectedBrand), selectedModel = 0, getBrand(selectedBrand)" class="form__el">
                    <option value="0">Марка</option>
                    <option v-for="brand_value in newBrands" :value="`${brand_value.id}`" >{{brand_value.brand}}</option>
                </select>
                <select :class="{ 'is-invalid': modelError }" :disabled="selectedBrand == 0" v-model="selectedModel" @change="getModel(selectedModel),selectedCom=0" class="form__el">
                    <option value="0">Модель</option>
                    <option v-for="model in modelsList" :value="`${model.id}`">{{ model.model }}</option>
                </select>
                <select :class="{ 'is-invalid': comError }" :disabled="selectedModel == 0" class="form__el" v-model="selectedCom">
                    <option value="0">Комплектация1</option>
                    <option  v-for="(com,index) in complectation" :value="index+1">{{ com.name }}</option>
                </select>
                <p class="title">Ваши данные</p>
                <div class="base-input">
                    <input :class="{ 'is-invalid': nameError }" type="text" name="name" placeholder="Имя"
                        v-model="nameValue" autocomplete="off" v-maska="name" class="form-input">
                </div>

                <div class="base-input">
                    <input :class="{ 'is-invalid': phoneError }" type="tel" name="contactPhone"
                        placeholder="+7 (___) ___-__-__" autocomplete="off" v-maska="options" v-model="phoneValue"
                        class="form-input">
                </div>

                <FormPieceCheck @formChecked="returnEmit" :appType="2" />

                <button type="submit" class="form__form-submit" :disabled="!formChecked" :class="{ 'send': formSend }">
                    {{ formSend ? 'Заявка отправлена!' : 'Оставить заявку' }}
                </button>
                <p class="form-text">
                    <SvgStar/>
                    Кредит предоставляется только гражданам РФ						
                </p>
            </form>
        </div>
        <div class="content">
            <PieceBenefitsCredit/>
            <div class="car__choice">
                <div class="car-show" v-if="selectedModel != 0">
                     <div class="car-show__wrapper">
                      <div class="car-show__image">
                            <img
                                :src="`${model_car.preview ? model_car.preview : '/src/static/img/no_image.webp'}`">
                        </div>
                        <div class="car-show__content">
                            <div class="car-show__title">
                                {{ cleanUpTitle(model_car.brand, model_car.model ) }}
                            </div>
                            <div class="car-show__price">
                                <div class="block">
                                    <span class="old">
                                        {{ console.log(complectation[selectedCom-1], model_car.modifications[complectation[selectedCom-1].mod], model_car)
                                         }}
                                        от {{ makeSpaces(model_car.modifications[complectation[selectedCom-1].mod].car_complectations[complectation[selectedCom-1].com].price) }} ₽
                                    </span>
                                    <span class="current">
                                        от
                                        {{ makeSpaces(model_car.min_price)
                                        }}
                                        ₽
                                    </span>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>

                
            </div> 
        </div>
    </div>
    
  </div>
    


</template>

<style lang="scss" scoped>
.box{
    display: flex;
    .content{
        width: 70%;
    }
}
.form {
    width: 410px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    padding: 20px;
    background-color: #fbfbfb;
    margin-right: 20px;
    border: 1px solid var(--color-c);

    .form__el {
        display: block;
        width: 100%;
        margin-bottom: 10px;
        min-width: 100px;
        background: linear-gradient(45deg, transparent 50%, var(--color-d) 0), linear-gradient(135deg, var(--color-d) 50%, transparent 0), linear-gradient(90deg, transparent, transparent);
        background-position: calc(100% - 11px) calc(1em + 0px), calc(100% - 6px) calc(1em + 0px), 100% 0;
        background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
        background-repeat: no-repeat;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        color: black;
        padding: 7px 15px;
        border: 1px solid #ccc;
        position: relative;
        z-index: 1;
        font-size: inherit;
    }
    .title{
        display: block;
        width: 100%;
        margin-bottom: 10px;
        color: #4e4e51;
        font-size: 14px;
        font-weight: 700;
    }
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
  .form__form-submit {
        //    border-radius: var(--border-small-radius);
            padding: 10px 15px;
            background: var( --color-c);
            color: var(--bg-light);
            font-weight: bold;
            transition: 0.3s;
            width: 100%;
            // border: 3px solid var(--main-color);

            &:hover {
                background: var(--bg-light);
                transition: 0.3s;
                color: var(--main-color);
            }
        }

        .car-show {
        .car-show__wrapper {
            display: grid;
            grid-template-columns: 2fr 3fr;
            gap: 10px;
            overflow: hidden;
        //    border-radius: var(--border-small-radius);
            box-shadow: var(--box-shadow);
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
                        font-size: 26px;
                        line-height: normal;
                        color: var(--color-c);
                    }

                    .credit {
                        color: var(--green);
                        font-size: var(--standart-size);
                        border: 1px solid var(--green);
                        padding: 5px;
                    //    border-radius: var(--border-small-radius);
                    }
                }
            }

            .car-show__image {
                padding: 30px;
                background: #f6f6f6;
                min-width: 250px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
        }
    }
</style>