<script setup>
import Input from '@/components/Base/Input.vue';
import Textarea from '@/components/Base/Textarea.vue';
import FormTitle from '@/components/Base/FormTitle.vue';
import Select from '@/components/Base/Select.vue';
import  SvgStar  from '@/components/Svg/Star.vue';

import { options, apiForm, name } from "@/constants/";

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

const brand = newStore.brand

const model = newStore.model

const appType = 2; 

let comValue = ref(0);



const complectation = computed(() => {
  const result = [];
  
  if (newStore.model && newStore.model.modifications) {
    newStore.model.modifications.forEach(modification => {
      if (modification.car_complectations) {
        let j = 1
        modification.car_complectations.forEach(complectation => {
          const modificationStr = modification.modification || '';
          const complectationStr = complectation.complectation || '';
          const priceStr = complectation.price ? complectation.price-model.sale.toString() : '';
          const price = complectation.price ? complectation.price-model.sale : '';

          result.push({
            id: price, 
            name: `${modificationStr}/${complectationStr}/${priceStr}`
          });
          j++
        });
      }
    });
  }
  
  return result;
});

const formFields = shallowRef([
{
    name: 'com', component: Select, bindings: {
        label: 'Комплектация', options: complectation.value, modelValue: 0, class: 'form-select', onChange: (value) => {
            comValue.value = value
        }
    }
},
{ name: 'name', component: Input, bindings: { label: 'ФИО', placeholder: 'ФИО', modelValue: '', class: 'form-input', type: 'text', maska: name } },
{ name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: 'Номер телефона', modelValue: '', class: 'form-input', type: 'tel', maska: options } },

]);

const car = computed(() => {
  const test ={
  brand : brand.brand,
  model : model.model,
  price : comValue.value
  }
 
return test
})


</script>

<template>

  <div class="small-model__form">
    <h2>
      Лучшее предложение на покупку нового {{$route.params.brand.toUpperCase().replaceAll('_', ' ')}} {{$route.params.model.toUpperCase().replaceAll('_', ' ')}} в кредит!									
    </h2>
    <BaseForm :fields="formFields" @submit="handleFormSubmit" :submit-text="`Оставить заявку`" :appType="appType" :car="car" />
    <p class="form-text">
      <SvgStar/>
      Кредит предоставляется только гражданам РФ						
    </p>
  </div>
  <div class="buttons">
    <BaseButtonModalModel/>
    <div class="button__garanty">
       <p>
        Гарантия <br/>
        {{ brand.warranty_year ? (getYear(brand.warranty_year)) : '' }} | {{ brand.warranty_km }}
       </p> 
    </div>
  </div>


</template>


<style lang="scss"> 
.small-model__form{
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px 30px; 
  border: 1px solid var(--color-c);
  border-radius: 8px;
  box-sizing: border-box;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: center; 
  
  h2{ 
    padding: 0; 
    text-align: center;
    font-weight: 700;
    font-size: 18px; // увеличено
    margin-bottom: 20px; // убраны внешние отступы
    text-align: start;
    line-height: 1.3; 
  }

  .model{
    margin-bottom: 15px;

     input{
      max-height: 32px;
      background: white;
      height: 100%;
    }
  
    // select{
    //   padding: 7px;
    //   font-size: 16px;
    //   background-color: white !important;
    //   border: var(--border) ;
    // }
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
}
.buttons{
  width: 100%;
  .button{
    background: var(--color-c);
    text-align: center;
    color: white;
    margin: 10px 0 10px 0 ;
    min-height: 33px;
    padding: 7px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    .img{
      svg{
        width: 20px;
      height: auto;
      fill: #fff;
      }
    }
    p{
      font-weight:700 ;
      text-align: center;
      font-size: 12px;
      text-transform: uppercase;
    }
  }
  .button__garanty {
  background: white;
  text-align: center;
  color: var(--color-c);
  margin: 10px 0;
  min-height: 43px;
  padding: 7px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  border: 2px solid var(--color-c);
  cursor: pointer;
  transition: all 0.3s ease;

  p {
    color: var(--color-c);
    font-weight: 700;
    font-size: 14px;
    transition: color 0.3s ease;
  }

  &:hover {
    background: var(--color-c);
    color: white;

    p {
      color: white;
    }
  }
}

  
}


select{
    padding: 7px 15px !important;
    border: 1px solid #ccc;
    background: transparent !important;
    /* position: relative; */
    /* z-index: 1; */
    font-size: inherit;
    width: 100%;

    min-width: 100px; 
    background: linear-gradient(45deg, transparent 50%, var(--color-d) 0), linear-gradient(135deg, var(--color-d) 50%, transparent 0), linear-gradient(90deg, transparent, transparent) !important;
    background-position: calc(100% - 11px) calc(1em + 0px), calc(100% - 6px) calc(1em + 0px), 100% 0 !important;
    background-size: 5px 5px, 5px 5px, 2.5em 2.5em !important;
    background-repeat: no-repeat !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    color: black !important;

    option{
      color: black;
    }
}

label {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}
</style>