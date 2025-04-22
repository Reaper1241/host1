<script setup>
import { dataSale } from '~/constants';

import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

import { useRoute } from 'vue-router'
const $route = useRoute()

function getBannerClass() {
    const mediaQuery = window.matchMedia('(max-width: 540px)')
    return mediaQuery.matches ? `${$route.params.brand}-mob` : $route.params.brand
}
</script>

<template>
    <ClientOnly>

            <section>
                <div class="container">
                    <div class="banner">
                        <div class="banner__text">
                            <h3>
								Купить новый авто под такси в Москве							</h3>
                                <p>
                                    Льготный автокредит от {{appStore.creditPercent}}%
                                </p>
                            <div class="text">
                                <p>Скидки до 300 000 ₽</p>
                                <p>Акция действует до {{ dataSale() }} !</p>
                            </div>
                        </div>
                        <div class="banner__form">
                            <h2>Кредит от 4.9%</h2>
                            <FormModal />
                        </div>
                    </div>
                    <div class="page__text">
                        <PieceBenefitsCredit />
                    </div>
                </div>
                
                
            </section>

    </ClientOnly>
</template>

<style lang="scss" scoped>

.banner{
    margin: 0 auto;
    color: white;
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #D2122B;
    @media screen and (max-width:767px) {
        display: block;
        border: none;
        border-radius: 0;
    }

    .banner__text{
        background-image: linear-gradient(-90deg, #89898970 0%, #505051ad 80%), url('/assets/img/taxi2.png');
        width: 120%;
        display: flex;
        flex-direction: column;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -ms-flex-align: start;
        align-items: flex-start; 
        padding: 25px;
        background-position: center;
        background-size: cover;
        @media screen and (max-width: 767px) {
            width: 100%;
            height: 220px; // ✅ чтобы был как на скриншоте
            padding: 20px;
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
            @media screen and (max-width:570px) {
                width: 85%;
            }
        }
        p,
        .text{
            font-size: 25px;
            line-height: 35px;
            margin-top: auto;
            background: transparent;
            @media screen and (max-width:767px) {
                font-size: 14px;
                line-height: normal;
            }
        }
    }
    .banner__form{
        width: auto;
        padding: 20px;
        box-shadow: 0 0 1px 0 #0000000a, 3px 1px 7px 0 #0d234340;
        h2{
            font-size: 16px;
            color: black;
            margin-bottom: 10px;
            width: 92%;	
            padding-bottom: 10px;					
        }
        @media screen and (max-width:767px) {
            width: 100%;
            border: 1px solid #D2122B;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px; // <<< ключевая строка
        }
    }
    
}
.page__text{
    padding-top: 40px;
}
</style>