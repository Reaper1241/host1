<script setup>
import SectionTitle from './Base/SectionTitle.vue';
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { useRoute } from 'vue-router'
const $route = useRoute()

const brands = computed(() => appStore.brands);
const newBrands = computed(() => appStore.newBrands);
const chinaBrands = computed(() => appStore.chinaBrands);

const brandShow = ref(false);

function showAll() {
    brandShow.value = !brandShow.value;
}


const selected = ref(true);
</script>

<template>
    <section class="brands-choice section">
        <div class="container">
            <div class="brands__wrapper">
                <!-- <div class="section__header">
                    <BaseSectionTitle :title="`Выберите бренд`" />
                </div> -->


                <div class="brands__body">
                    <div v-if="selected" class="brands__item">
                        <div class="brands__row">
                            <ul class="brands__list new">
                                <li class="brand__item" v-for="brand in newBrands" v-if="$route.name != 'cars-china'"
                                :class="{ 'brand__item--show': brandShow }">
                                    <NuxtLink :to="`/cars/${brand.url_brand}`" class="brand__link"
                                        :class="{ 'active': $route.params.brandId === brand.url_brand }">
                                        <img class="brand__logo" :src="brand.logo" :alt="brand.brand" v-if="brand.logo">
                                        <div class="brand__content">
                                            <p class="brand__name">{{ brand.brand }}</p>
                                        </div>
                                        
                                    </NuxtLink>
                                </li>
                                <li class="brand__item" v-for="brand in chinaBrands.brands" v-else>
                                  
                                    <NuxtLink :to="`/cars/${brand.url_brand}`" class="brand__link"
                                        :class="{ 'active': $route.params.brandId === brand.url_brand }">
                                        <img class="brand__logo" :src="brand.logo" :alt="brand.brand" v-if="brand.logo">
                                        <div class="brand__content">
                                            <p class="brand__name">{{ brand.brand }}</p>
                                        </div>
                                        
                                    </NuxtLink>
                                </li>
                            </ul>
                            <button class="brand__list-btn" @click="showAll()" v-if="$route.name != 'cars-china'">
                            {{ brandShow ? "Скрыть" : "Показать больше" }}
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </section>
</template>

<style scoped lang="scss">
.brands-choice {
    .section__header {
        align-items: center;
        gap: 30px;

        @media (max-width: 767px) {
            gap: 10px;
        }
    }
    
}

.brands__list {
    display: -ms-grid;
  display: grid;
//   -ms-grid-columns: 10px 1fr 10px 1fr 10px 1fr 10px 1fr 10px 1fr 10px 1fr 10px 1fr;
  grid-template-columns: repeat(10, 1fr);
  text-transform: uppercase;

  @media screen and (max-width:1000px) {
    grid-template-columns: repeat(7, 1fr);

  }

  @media screen and (max-width:767px) {
    grid-template-columns: repeat(5, 1fr);

  }
  @media (max-width: 570px) {
        -ms-grid-columns: 10px 1fr 10px 1fr 10px 1fr;
        grid-template-columns: repeat(3, 1fr);
    }

}
.main{
    @media (max-width: 767px) {
            display: none;;
        }
}

.china{
    .brands__list{
        display: flex;
        flex-wrap: wrap;
        // justify-content: center;
        .brand__item{
            -ms-flex-positive: 1;
            flex-grow: 1;
            width: 11%;

            @media screen and (max-width:767px) {
                width: 30%;
            }
        }
    }
    
}
.mob{

    display: flex;
    position: absolute;
    width: 100%;
    min-height: calc(100vh - 54px);
    // left: -100%;
    overflow: auto;
    transition: all 0.4s ease;
    z-index: 100;
    .container{
        width: 100%;
        max-width: 100%;
        padding: 0;
    }
    ul{
        display: block;
        width: 100%;
        li{
            width: 100%;
        }
    }
    .brand__link{
        display: -ms-flexbox;
        display: flex;
        flex-direction: row;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        padding: 12px 15px;
        border-bottom: 1px solid #ededed;
        justify-content: left;

        img{
            margin-right: 15px;
            max-width: 45px;
            @media screen and (max-width:540px) {
                max-width: 35px;
            }
        }
    }
}
section.mob{
    padding: 0;
}
.brand__item{
    @media screen and (max-width: 570px) {
            &:nth-child(n + 25) {
                display: none;
            }
        }
}
.brand__item--show {
       

        @media screen and (max-width: 570px) {
            &:nth-child(n + 25) {
                display: block;
            }
        }

    }

    
.brand__list-btn {
    display: none;

    @media screen and (max-width: 570px) {
        display: block;  
        padding: 10px;
        color: var(--color-c);
        margin-top: 30px;
        font-weight: 600;
        font-size: 14px;
        width: 100%;
        border: 2px solid var(--color-c);
        margin-bottom: 20px;
    }
}
</style>