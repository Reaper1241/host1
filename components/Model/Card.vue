<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();


import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const currentMod = computed(() => findMod(newStore.modification, newStore.model.modifications))

const modList = computed(() => newStore.model.modifications.filter((mod) => mod.car_complectations.length))


newStore.modification = modList.value[0]?.id
</script>

<template>
    <ClientOnly>
        <section class="model-card section">
            <div class="container">
                <div class="model-card__wrapper">
                    <div class="model-card__header section__header">
                        <div class="card-header__title">
                            <BaseSectionTitle class="card-section__title"
                            :title="`${$route.params.brand.toUpperCase().replaceAll('_', ' ')} ${$route.params.model.toUpperCase().replaceAll('_', ' ')} комплектации и цены`" />
                            <div class="title__price">
                                <div class="price">
                                    <p>
                                        от {{ makeSpaces(newStore.model.min_price) }}
                                        ₽
                                    </p>
                                    <div class="month__payment">
                                        <p>
                                        от {{
                                            makeSpaces(appStore.calcMonthPriceModel(newStore.model.sale,
                                                currentMod.car_complectations[0].price))
                                            }} ₽/мес
                                        </p>
                                    </div>
                                </div>
                                <del class="del__payment">
                                    от {{ makeSpaces(newStore.model.min_price + newStore.model.sale) }} ₽
                                </del>
                            </div>
                        </div>
                        <ModelPromo/>
                    </div>
                    <div class="model-card__body">
                        <div class="model__form">
                            <FormNewModel/>
                        </div>
                        <div class="color">
                            
                            <ModelColorChoice />
                        </div>
                     
                    </div>
                </div>
            </div>
        </section>
    </ClientOnly>
</template>



<style lang="scss" scoped>
.model-card {
    margin-bottom: 40px;
    padding: 0;
    .section__header{
        display: flex;
        justify-content: space-between;

        @media screen and (max-width:1000px) {
            display: block;
        }
        .promo{
            height: max-content;
        }
        .card-header__title{
            display: flex;
            flex-direction: column;
            row-gap: 10px;
            .card-section__title{
                font-size: 20px;
                font-weight: 900;

            }
            .title__price{
                display: flex;
                flex-direction: column;
                column-gap: 15px;
                .del__payment{
                    font-size: 14px;
                    color: #b8b8b8;
                }
                .price{

                    display: flex;
                    align-items: center;
                    gap: 15px;
                    p{
                        font-weight: 700;
                        font-size: 18px;
                        color: var(--color-d);
                    }
                    
                }
                @media screen and (max-width:1000px) {
                    margin-bottom: 10px;
                }
                .month__payment{
                padding: 5px 10px;
                border: 1px solid var(--color-c);
                border-radius: 6px;
                display: flex;
                align-items: center;
                background: white;
                p{
                    font-weight: 700;
                    color: #D2122B;
                    text-align: center;
                    margin: 0 auto;
                }
                
                @media screen and (max-width:1000px) {
                    margin: 10px;
                }

            }
            @media screen and (max-width:1000px) {
                display: block;
            }
            }
            
        }
    }
}

.model-card__body {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    gap: 20px;
    flex-wrap: wrap;
    @media screen and (max-width:767px) {
        flex-direction: column;
    }

    .model__form{
        width: 32%;
        max-width: 460px;
        @media screen and (max-width:1000px) {
           width: 35%;
        }
        @media screen and (max-width:767px) {
           max-width: 100%;
           width: 100%;
           margin: 0 auto;
        }
    }
    .color{
        @media screen and (max-width:1000px) {
           width: auto;
        }

        @media screen and (max-width:767px) {
            width: 100%;
            -ms-flex-order: -1;
            order: -1;
            margin-bottom: 30px;
        }
    }
}
</style>