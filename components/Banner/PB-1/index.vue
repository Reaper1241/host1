<script setup>
import { dataSale } from '~/constants';
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

import { useNewStore } from '/stores/NewStore.js'
const newStore = useNewStore()

import { useRoute } from 'vue-router'
const $route = useRoute()

function getBannerClass() {
    const mediaQuery = window.matchMedia('(max-width: 540px)')
    return mediaQuery.matches ? `${$route.params.brand}-mob` : $route.params.brand
}

let car = {
    brand: $route.params.brand 
}

</script>

<template>
    <ClientOnly>


            <section>
                <div class="container">
                    <div class="banner">
                        <div class="banner__text" :style="`background:linear-gradient(-90deg, #89898970 0%, #505051ad 80%),
                        url(${newStore.brand.banner}) no-repeat;  `">
                            <h3><span>{{ $route.params.brand }}</span> цены и комплектации</h3>
                            <div class="text">
                                <p>Скидки до {{ makeSpaces(newStore.brand.max_sale) }} ₽ </p>
                                <p>Акция действует до {{ dataSale() }}!</p>
                            </div>
                            
                            <!-- <img :src="`${newStore.brand.banner}`" alt=""> -->
                        </div>
                        <div class="models__list">
                            <BaseTitle class="models__title" :title="`Каталог моделей ${$route.params.brand.toUpperCase()}:`" />
                            <NuxtLink :to="`/cars/${model.url_brand}/${model.url_model}`" v-for="model in newStore.models" class="vue__link">
                                <div class="cars__main">
                                    <div class="cars__links">
                                        {{ model.model }}
                                    </div> 
                                    <div class="car__price-month">
                                        от {{ makeSpaces(appStore.calcMonthPriceModel(car.min_sale, car.min_price+car.min_sale)) }} ₽
                                        <img class="car__price-icon" src="public/red_arrow_down.jpeg" alt="icon">
                                    </div>
                                </div>
                            </NuxtLink>
                        </div>
                        <div class="banner__form">
                            <h2>Кредит от 4.9%</h2>
                            <FormModal :car="car" :app-type="2"/>
                        </div>
                    </div>
                </div>
                
                
            </section>

    </ClientOnly>
</template>

<style lang="scss" scoped>
.container{
    @media screen and (max-width:570px) {
        
    width: 100%;
    max-width: 100%;
    padding: 0;
    }
}
.cars__main{
    display: flex;
    font-size: 12px;
    align-items: center;
    justify-content: space-between;
}

.banner{
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin: 0 auto;
    color: white;
    display: flex;
    margin-bottom: 40px;
    @media screen and (max-width:767px) {
        display: block;
    }
    @media screen and (max-width:570px) {
        padding-bottom: 10px;
        background: #f8f8f8;
        border-radius: 0;
    }
    .banner__text{
        // background-color: red;
        background-size: cover !important;
        background-position: 50% !important;
        width: 80%;
        display: flex;
        flex-direction: column;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -ms-flex-align: start;
        align-items: flex-start; 
        padding: 15px;


        @media screen and (max-width:767px) {
            width: 100%;
            height: 175px;
        }
        @media screen and (max-width:570px) {
            padding: 15px 10px;
        }

        h3{
            font-size: 35px;
            color: white;

            @media screen and (max-width:1000px) {
                font-size: 30px;
            }
            @media screen and (max-width:767px) {
                font-size: 20px;
            }
            @media (max-width: 570px) {
                max-width: 410px;
                padding: 10px 10px;
                width: 100%;
                margin: 0 auto;
            }
            @media screen and (max-width:410px) {
                padding: 10px 0;
            }
            @media screen and (max-width:377px) {
                font-size: 16px;
            }


            span{
                text-transform: uppercase;
                font-size: 35px;
                font-weight: 700;
                @media screen and (max-width:1000px) {
                    font-size: 30px;
                }
                @media screen and (max-width:767px) {
                    font-size: 20px;
                }
                
                @media screen and (max-width:377px) {
                    font-size: 16px;
                }
            }
        }
        .text{
            font-size: 25px;
            line-height: 35px;
            margin-top: auto;
            background: transparent;
            font-weight: 900;
            @media screen and (max-width:767px) {
                font-size: 18px;
            }
            @media (max-width: 570px) {
                max-width: 410px;
                padding: 10px 10px;
                width: 100%;
                margin: 0 auto;
                margin-top: auto;
            }
            @media screen and (max-width:410px) {
                padding: 10px 0;
            }
            @media screen and (max-width:377px) {
                font-size: 14px;
            }
        }
    }
    .banner__form{
        width: auto;
        padding: 20px;
        box-shadow: 0 0 1px 0 #0000000a, 3px 1px 7px 0 #0d234340;
        
        @media (max-width: 570px) {
            max-width: 410px;
            padding: 10px 10px;
            margin: auto;
            border-radius: 8px;
            border: 1px solid #D2122B;
        }

        h2{
            font-size: 16px;
            color: #000000;
            margin-bottom: 10px;

            @media (max-width: 767px) {
                font-size: 15px;
            }				
        }
    }
    
}
form{
    @media (max-width: 570px) {
        margin-top: 0;
        gap: 0;
    }
    
}

.models__list{
    display: none;
    max-width: 410px;
            padding: 10px 10px;
            margin: auto;
            margin-bottom: 20px;

    @media screen and (max-width:570px) {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: space-between;
        color: #D2122B;
    }

    a{
        width: 47%;
        padding: 7px;
        font-size: 18px;
        font-weight: 500;
        // box-shadow: 0 0 1px 0 #0000000a, 3px 1px 7px 0 #0d234340;


    }
}
.car__price-month{
    display: flex;
    align-items: center;
}
.car__price-icon{
    height: 16px;
}

.cars__links{
    color: black;
}

.vue__link{
    border-radius: 5px;
    border: 1px solid #D2122B;
    text-decoration: none;
}

.models__title{
    color: black;
    
}
</style>