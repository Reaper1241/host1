<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const tradeSwitch = ref(true)
const creditSwitch = ref(true)
const salonSwitch = ref(true)

const currentModel = computed(() => newStore.model)

const tradeSale = computed(() => currentModel.value.sale * appStore.tradeCalcPercent)
const creditSale = computed(() => currentModel.value.sale * appStore.creditCalcPercent)
const salonSale = computed(() => currentModel.value.sale * appStore.salonCalcPercent)

const totalSale = computed(() => {
    let total = 0;
    if (tradeSwitch.value) total += tradeSale.value
    if (creditSwitch.value) total += creditSale.value
    if (salonSwitch.value) total += salonSale.value
    newStore.modelSale = total
    return total
})

const emit = defineEmits(['updateTotalSale'])

watch(totalSale, (newValue) => {
  emit('updateTotalSale', newValue)
})



</script>



<template>
     <div class="complectations-calculator">
                       <div class="complectations-calculator__item trade" :class="{ 'active': tradeSwitch }" @click="tradeSwitch = !tradeSwitch">
                            <div class="complectations-calculator__title">
                                <div class="icon">
                                    <i class="fa-solid fa-xmark" :class="{ 'active': !tradeSwitch }"></i>
                                    <i class="fa-solid fa-check" :class="{ 'active': tradeSwitch }"></i>
                                </div>
                                <p>Trade-IN</p>
                                 <!--  <div class="switch">
                                     <input type="checkbox" id="switch" :checked="tradeSwitch"
                                        @change="tradeSwitch = !tradeSwitch" /> 
                                    <label for="switch"></label>
                                </div> -->
                            </div>
                            <div class="complectations-calculator__text" :class="{ 'active': tradeSwitch }">
                                <span class="text">Цена Вашего авто и <br> дополнительная скидка:</span>
                                <span class="money">{{ makeSpaces(tradeSale) }} ₽</span>

                            </div>
                        </div>

                        <div class="complectations-calculator__item credit" :class="{ 'active': creditSwitch }" @click="creditSwitch = !creditSwitch">
                            <div class="complectations-calculator__title">
                                <div class="icon">
                                    <i class="fa-solid fa-xmark" :class="{ 'active': !creditSwitch }"></i>
                                    <i class="fa-solid fa-check" :class="{ 'active': creditSwitch }"></i>
                                </div>
                                <p>Кредит</p>
                            </div>
                            <div class="complectations-calculator__text" :class="{ 'active': creditSwitch }">
                                <span class="text">Ставка от % годовых <br> при взносе от 10%</span>
                                <span class="money">{{ makeSpaces(creditSale) }} ₽</span>
                            </div>
                        </div>

                        <div class="complectations-calculator__item salon" :class="{ 'active': salonSwitch }" @click="salonSwitch = !salonSwitch">
                            <div class="complectations-calculator__title">
                                <div class="icon">
                                    <i class="fa-solid fa-xmark" :class="{ 'active': !salonSwitch }"></i>
                                    <i class="fa-solid fa-check" :class="{ 'active': salonSwitch }"></i>
                                </div>
                                <p>Госпрогра11мма</p>
                            </div>
                            <div class="complectations-calculator__text" :class="{ 'active': salonSwitch }">
                                <span class="text">Скидка 10% по <br> госпрограммам</span>
                                <span class="money">{{ makeSpaces(salonSale) }} ₽</span>
                            </div>
                        </div>

                        <div class="complectations-calculator__item total"
                            :class="{ 'activeTotal': tradeSwitch || creditSwitch || salonSwitch }">
                            <div class="complectations-calculator__text">
                                <span class="text">Максимальная выгода при покупке до</span>
                                <span class="complectations-calculator__money">
                                     {{ makeSpaces(totalSale) }} 
                                </span>
                            </div>
                        </div> 
                    </div>
</template>

<style lang="scss">
 .complectations-calculator {
        display: grid;
        gap: 30px;
        align-items: center;
        grid-template-columns: 1fr 1fr 1fr 1.5fr;

        @media screen and (max-width: 1400px) {
            gap: 15px;
        }

        @media screen and (max-width: 1000px) {
            grid-template-columns: 1fr 1fr;
        }

        @media screen and (max-width: 768px) {
            grid-template-columns: 1fr 1fr;
            gap: 5px;
        }

        .complectations-calculator__item {
            display: flex;
            gap: 15px;
            align-items: start;
            padding: 15px 20px;
            // box-shadow: var(--box-shadow);
            border-radius: 10px;
            border: 1px solid #E5E5E5;
            transition: 0.3s;
            height: 100%;
            flex-wrap: wrap;
            .complectations-calculator__title{
                display: flex;
                justify-content: left;
                // width: 100%;
                text-align: left;
                .icon{
                    // text-align: center;
                    margin: 0 auto;
                    width: 20px;
                    height: 20px;
                    background: #ccc;
                    border-radius: 50%;
                    margin-right: 10px ;
                    i{
                        width: 20px;
                        height: 20px;
                        color: #EEEEEE;
                        margin: 0 auto;
                        padding: 2px;
                        display: none;
                    }
                    i.active{
                        display: block;
                    }
                }
            }

            @media screen and (max-width: 540px) {
                padding: 10px;
            }

            .complectations-calculator__text {
                display: flex;
                flex-direction: column;
                gap: 5px;

                .money {
                    font-size: var(--large-size);
                    font-weight: 500;
                    color: var(--dark-grey);
                }

                .text {
                    color: var(--dark-grey);

                    @media screen and (max-width: 768px) {
                        font-size: var(--standart-size);
                    }
                }

                .complectations-calculator__money {
                    font-weight: 700;
                    color: var(--color-c);


                    @media screen and (max-width: 768px) {
                        font-size: var(--large-size);
                    }

                    @media screen and (max-width: 540px) {
                        font-size: var(--medium-size);
                    }
                }
            }



            &:hover {
                box-shadow: var(--box-shadow);
                transition: 0.3s;
            }

            div {
                background: transparent;
            }

            @media screen and (max-width: 1400px) {
                display: flex;
                flex-direction: column;
                align-items: start;
            }
        }

        .complectations-calculator__item.active {
            border: 1px solid var(--color-c);
            .complectations-calculator__title{
                .icon{
                    background: var(--color-c);

                }
            }
            .money {
                color: var(--color-c);
            }
        }

        .complectations-calculator__item.total {
            justify-content: center;
            font-size: var(--big-size);

            .complectations-calculator__text {
                display: flex;
                gap: 5px;
                flex-wrap: wrap;
            }
        }

        .complectations-calculator__item.activeTotal {
            color: black;
            border: 1px solid var(--color-c);

            
        }
    }
</style>