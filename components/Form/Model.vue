<script setup>
import { options, name, apiForm } from "@/constants/";

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import axios from 'axios'
import Brand from "~/pages/cars/[brand].vue";


const props = defineProps({
    model: {
        type: Object,
        default: {}
    },
    modification: {
        type: Object,
        default: {}
    },
});

const formChecked = ref(true);
const nameValue = ref('');
const phoneValue = ref('');
const colorId = ref(0);
const selectedIndex = ref(0); // Индекс выбранного элемента
const selectedModId = ref(0);
const selectedComId = ref(0);
const currentPrice = computed(()=>newStore.model.modifications[selectedModId.value].car_complectations[selectedComId.value].price ) 
const currentDiff = computed(()=> currentPrice.value - modelSale.value)

const formSend = ref(false)

const phoneError = ref(false)

const nameError = ref(false)


function validateForm() {
    let clearPhone = phoneValue.value.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');


    if (clearPhone.length == 11) {
        
        const formValues = {
        phone: clearPhone,
        name: nameValue.value,
    }
    const appType = 2
    const car = {
        price: currentDiff.value,
        model: props.model.model, 
        brand: props.model.brand
    };
    


    if (clearPhone.length == 11) {
        postForm(formValues, appType, car);

        }
}
}


function returnEmit(value) {
    formChecked.value = value
}

watch(() => props.modification, () => {
    selectedComplectationId.value = props.modification.car_complectations[0];
}, { deep: true })

const modelSale = computed(() => props.model.sale);

const complectation = computed(() => {
  const result = [];
  let i = 0
    newStore.model.modifications.forEach(modification => {
        
       
        let j = 0
        modification.car_complectations.forEach(complectation => {
          const modificationStr = modification.modification || '';
          const complectationStr = complectation.complectation || '';
          const priceStr = complectation.price ? complectation.price-props.model.sale.toString() : '';
          
          result.push({
            name: `${modificationStr}/${complectationStr}/${priceStr}`,
            modId:i,
            comId: j
          });
          j++
          
        });
      i++
    });

  
  return result;
});


watch(selectedIndex, (newIndex) => {
  if (newIndex >= 0 && newIndex <= complectation.value.length) { // Проверка на валидность индекса
    const selectedComplectation = complectation.value[newIndex]; // Обращаемся по индексу
    selectedModId.value = selectedComplectation.modId;
    selectedComId.value = selectedComplectation.comId;
  } else {
    selectedModId.value = null;
    selectedComId.value = null;
  }
});


 


</script>

<template>
    <div class="model__finance">
        <div class="finance__form">
            <!-- <BaseSelect :label="'Комплектация'" :options="complectation" :modelValue="0" v-model="selectedComplectationId"/> -->
            <label class="filter__body-select">
                <select v-model.number="selectedIndex">
                    <option value="0">Комплектация</option>
                    <option v-for="(com,index) in complectation" :value="index">
                         {{ com.name }} 
                    </option>
                </select>
            </label>

            <label class="filter__body-select">
                <select v-model="colorId">
                    <option value="0">Цвет</option>
                    <option v-for="(color,index) in newStore.model.colored_galleries" :value="index">
                         {{ color.color.color }} 
                    </option>
                </select>
            </label>
            <div class="finance__image">
                <img :src="newStore.model.colored_galleries[colorId].url" alt="" width="245" height="125">
            </div>
            <div class="conditions-credit__row conditions-credit__row--border">
                <div class="conditions-rate">
                    <p>Ставка {{ appStore.creditPercent }}%</p>
                </div>
                <div class="conditions-benefit">
                    <p>
                        Ваша выгода до {{ makeSpaces(modelSale)  }} руб
                    </p>
                </div>
            </div>
            <div class="conditions-credit__row">
                <span class="conditions-credit__label">
                    Цена со скидкой от 
                </span>
                <span class="conditions-credit__value conditions-credit__value-price"
                    data-value="">
                    {{ makeSpaces(currentDiff) }} руб
                </span>
            </div>
            <div class="conditions-credit__row">
                <span class="conditions-credit__label">
                    Ежемесячный платеж от 
                </span>
                <span class="conditions-credit__value conditions-credit__value-payment">
                    {{ makeSpaces(appStore.calcMonthPriceModel(modelSale,currentPrice)) }} руб/мес
                </span>
            </div>
            <div class="form__block">
            <form action="#" class="form__form-content" @submit.prevent="validateForm">
                <div class="form__div">
                    <BaseInput :label="'ФИО'" :placeholder="'ФИО'" v-model="nameValue" :class="'form-input'"
                        :maska="name" />

                    <BaseInput :label="'Телефон'" :placeholder="'Номер телефона'" v-model="phoneValue"  :class="'form-input'"
                        :maska="options" />

                    <FormPieceCheck @formChecked="returnEmit" />

                    <BaseButton :label="'Оставить заявку'" :disabled="!formChecked" type="submit" />
                </div>
            </form>
        </div>
        </div>
        <div class="finance_information">
            <div class="finance__content">
                <p class="finance__simple-text">
                    <strong>Finance</strong> – это демократичная система
                    автокредитования, за счет которой на автомобили данной марки
                    устанавливается лояльная ценовая политика. Лояльность выражается
                    в том, что автосалон устанавливает дополнительную скидку на
                    каждую модель данного бренда. Но это еще не все, также Вы можете
                    рассчитывать на:
                </p>
                <ul class="finance__text-list">
                    <li class="finance__text-item">
                        <h3>Низкая процентная ставка</h3>
                        <p>
                            Благодаря данной программе мы предлагаем автокредитование на
                            выгодных условиях. Процентная ставка стартует от {{ appStore.creditPercent }}%, что является лучшим предложением на российском рынке.
                            Также мы гарантируем Вам минимальные ежемесячные платежи,
                            благодаря чему снижается общая стоимость владения
                            автомобилем.
                        </p>
                    </li>
                    <li class="finance__text-item">
                        <h3>Бесплатная консультация</h3>
                        <p>
                            На данном сайте мы разместили удобную опцию, благодаря
                            которой можно рассчитать примерную стоимость автомобиля при
                            оформлении автокредита, а также оставить заявку на любую
                            модель. После этого Вам в течение 30 минут позвонит
                            специалист кредитного отдела, чтобы предоставить полную
                            консультацию.
                        </p>
                    </li>
                    <li class="finance__text-item">
                        <h3>Первоначальный взнос не нужен</h3>
                        <p>
                            Для того, чтобы банк одобрил кредит, необходим первый взнос.
                            Мы идем клиентам навстречу, и предлагаем взять сумму
                            первоначального взноса в рассрочку (без процентов). Это
                            делает кредитование доступным для 96% процентов клиентов
                            нашего автосалона.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>


</template>


<style lang="scss" scoped>

.conditions-credit__value{
    color: black;
    font-weight: 700;
    font-size: 18px;
}

.form__form-content{

  margin: 20px 0 0 0;        // 🔼 внешние отступы сверху и снизу
  background: #fff;      // (по желанию, чтобы блок выделялся)

}

.form__div > * {
  margin-bottom: 10px;
}

.form__div > *:last-child {
  margin-bottom: 0;
}
.model__finance{
    display: flex;
    @media screen and (max-width:767px) {
        display: block;
    }
}
.finance__content {
    padding: 0 20px;
    display: grid;
    grid-template-rows: auto 1fr;

    @media screen and (max-width:767px) {
        padding: 0;
    }
    .finance__simple-text {
        border-radius: 8px;
        -ms-flex-positive: 1;
        flex-grow: 1;
        padding: 15px;
        background: #fff;
        box-shadow: 0 4px 8px #1211240a, 0 4px 32px #12112414;
        padding: 15px;
        margin: 27px 0 20px 0;
    }
    .finance__text-list {
        height: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        -ms-flex-pack: justify;
        justify-content: space-between;
        row-gap: 15px;

        .finance__text-item {
            border-radius: 8px;
            -ms-flex-positive: 1;
            flex-grow: 1;
            padding: 15px;
            background: #fff;
            box-shadow: 0 2px 8px #1211240a, 0 4px 32px #12112414;
            padding: 15px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

            .finance__text-item h3 {
                margin-bottom: 10px;
            }
        }
    }
}
.finance__form {
    -ms-flex: none;
    margin-bottom: 40px;
    flex: none;
    width: 440px;
    padding: 25px 25px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid var(--color-c);
    height: max-content;
    @media screen and (max-width: 767px) {
        width: 100%;
        margin: 0 auto;
        margin-bottom: 20px;
        padding: 10px;
        display: block;
        align-items: center;

    }
    .finance__el {
        width: 100%;
        margin-bottom: 10px;
    }
    .finance__image{
        margin: 0 auto;
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 20px 15px;
    }
    img{
        width: 90%;
        margin: 0 auto;
        object-fit: contain;
        @media screen and (max-width: 767px) {
           height: 125px;
            width: auto;
        }
    }
    .conditions-credit__row {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: justify;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 14px;
        color: var(--color-d);
        font-weight: 700;
        @media screen and (max-width:360px) {
            font-size: 13px;
        }
        
    }

    .conditions-credit__row--border {
        padding-bottom: 5px;
        // border-bottom: 1px solid #ccc;
        
        
    }
}


select{
    padding: 7px 15px;
    height: 45px;
    border: 1px solid #ccc;
    background: transparent;
    /* position: relative; */
    /* z-index: 1; */
    font-size: inherit;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
    min-width: 100px; 
    background: linear-gradient(45deg, transparent 50%, var(--color-d) 0), linear-gradient(135deg, var(--color-d) 50%, transparent 0), linear-gradient(90deg, transparent, transparent);
    background-position: calc(100% - 11px) calc(1em + 0px), calc(100% - 6px) calc(1em + 0px), 100% 0;
    background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
    background-repeat: no-repeat;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

</style>