<script setup>
import Slider from './Slider.vue';
import { apiNew } from '~/constants';
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const props = defineProps(['car'])
const car = computed(() => props.car)
// const brand = findBrand(car.value.url_brand, appStore.newBrands)
// const brand_value = await useFetch(`${apiNew}brands/brand/${brand}`)
console.log(car);

const selectedImage = ref(0);


</script>

<template>
    <div class="car c-1" :class="{ 'current-car': car.id == $route.params.car }">
        <div class="car__img">
            <div class="car__sticker">
                <img src="public/Component 76.jpg" class="car__sticker-img">
                <p>В наличии</p>
            </div>
            <div class="car__slider" ref="sliderOverflow" >
                <div class="car__slider-wrapper" v-if="car.images.length">
                        <div class="slider__overflow" >
                            <div class="slider__overflow-list">
                                <div class="slider__overflow-item" v-for="(slide, index) in car.images.slice(0, 10)"
                                    :key="index" :style="{ width: 100 / 10 + '%', height: '100%' }"
                                    @mouseenter="selectedImage = index" @mouseleave="selectedImage = 0"
                                    :class="{ 'active': selectedImage === index }" />
                            </div>
                        </div>
                    <div class="slider__item">
                        <img :src="car.images[selectedImage].url" alt="car">
                    </div>
                </div>
                <div class="car__slider-wrapper" v-else>
                    <div class="slider__item second">
                        <img :src="`${car.preview}`" alt="car">
                    </div>
                </div>
                <div class="car__slider-wrapper mobile" v-if="car.images.length">
                     <Slider :carInfo="car" />
                </div>
                <div class="car__slider-wrapper mobile" v-else>
                    <img :src="`${car.preview}`" alt="car">
                </div>
            </div>
            <div class="car__stickers">
                <div class="sticker available">В наличии</div>
            </div>
        </div>
        <NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}/${car.id}`">

           <!-- <p class="title__car">
                <span class="special-item__name-car">{{ car.brand }} {{ car.model }}</span>
                <span class="special-item__price-value">от {{ makeSpaces(car.price - car.sale) }} ₽</span>
            </p>  -->
        <div class="car__title">
            <p class="car__name">{{ car.brand }} {{ car.model }}</p>
        </div>
        <div class="car__price">
            <p class="price__new">от <span>{{ makeSpaces(car.price - car.sale) }} ₽</span></p>
            <p class="price__old">{{ makeSpaces(car.price) }} ₽</p>
        </div>
        <div class="car__charcteristics">
            <div class="mod__com">
                <p class="mod">{{ car.modification }}</p>
                <p>{{ car.complectation }}</p>
            </div>
            <p class="garanty">Гарантия {{ getYear(car.warranty_year) }}</p>
        </div>


    </NuxtLink>

        <div class="car__controls">
            <BaseButtonModal :car="car" :btn-label="`Купить в кредит от ${makeSpaces(appStore.calcMonthPriceModel(car.sale,car.price))  } руб/мес`" :app-type="2"
                :modal-title="`Купить в кредит  ${cleanUpTitle(car.url_brand, car.url_model)}`" :btn-class="`classic`" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.car {
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
  //   border-radius: 20px;;
    transition: 0.3s;
    position: relative;
    background: white;
    // padding: 15px;
    gap: 10px;
    max-width: 280px;
    // margin: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    @media screen and (max-width: 620px) {
        max-width: 400px;
        margin: 0 auto;
    }
    @media screen and (max-width: 400px) {
        // padding: 10px;
        gap: 10px;
    }

    &:hover {
        box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1); 
        transition: 0.3s;
    }

    .car__title{
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        padding: 10px 15px;
        justify-content: space-between;
        font-size: 16px;

        .car__name{
            max-height: 19px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            white-space: nowrap;
            font-weight: 700;
        }
    }

    .car__price{
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        padding: 0 15px;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .price__new{
            font-size: 18px;
            font-weight: 700;
            color: #D2122B;

            span{
                color: #D2122B;
                font-weight: 700;
            }
        }
        .price__old{
            font-size: 16px;
            font-weight: 600;
            text-decoration: line-through;
        }
    }

    .car__more-link {
        padding: 15px;
        background: var(--main-color);
        border: 1px solid var(--main-color);
        color: white;
        text-align: center;
        width: auto;
        transition: 0.3s;

        &:hover {
            background: transparent;
            transition: 0.3s;
            color: var(--main-color);
        }
    }


    .car__controls {
        width: 100%;
        padding: 10px;
    }

    .car__img {
        position: relative;
        width: 100%;
        // border-radius: 10px;
        overflow: hidden;
        height: max-content;
        padding: 0 0;
        
        .car__sticker{
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            position: absolute;
            top: 5%;
            right: 3%;
            z-index: 2;
            background: #fff;
            color: black;
            border-radius: 25px;
            font-size: 12px;
            padding: 2px 7px;
            .car__sticker-img{
                max-width: 15px;
                max-height: 15px;
            }
            @media screen and (max-width:1000px) {
                top: 10%;
            }
            @media screen and (max-width:767px) {
                top: 3%;
            }
        }

        .car__slider {
            .car__slider-wrapper {
                overflow: hidden;
                display: flex;
                position: relative;
                height: auto;

                @media screen and (max-width: 768px) {
                    display: none;
                    height: auto;
                }

                .slider__overflow {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    background: transparent;

                    .slider__overflow-list {
                        display: flex;
                        width: 100%;
                        height: 100%;
                        background: transparent;

                        .slider__overflow-item {
                            background: transparent;
                        }

                        .active {
                            border-bottom: 5px solid var(--main-color);
                        }
                    }
                }
            }

            .car__slider-wrapper.mobile {
                display: none;

                @media screen and (max-width: 768px) {
                    display: block;
                }
            }
        }

        .car__stickers {
            display: none;
            position: absolute;
            z-index: 10;
            top: 1px;
            left: 1px;
            background: transparent;

            .sticker {
                border-radius: 10px;
                background: white;
                text-align: center;
                z-index: 1;
                padding: 6px 8px;
                font-size: var(--small-size);
                line-height: normal;
            }

            .available {
                background: var(--green);
                color: white;
            }
        }

        img {
            width: 100%;
            height: 190px;
            object-fit: contain;
        }

    }
    .car__charcteristics{
        display: flex;
        justify-content: space-between;
        padding: 0 15px 0 15px;
        flex-wrap: nowrap;
        align-items: center;

        .garanty{
            width: 25%;
            font-size: 14px;
            color: var(--color-c);

            @media screen and (max-width:570px) {
                width: 18%;
            }
            @media screen and (max-width:400px) {
                width: 20%;
            }
        }
        .mod{
            max-height: 19px;
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: block;
            // padding: 0 10px 0 0;
        }
    }
}

.recent {
    display: none;
    position: absolute;
    left: 15px;
    top: 15px;
    background: white;
    text-align: center;
    z-index: 100;
    padding: 8px 12px;
    border-radius: var(--border-radius);
}

.car__text {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.btn__car{
    @media screen and (max-width:1000px) {
        padding: 12px 0;
    }
}

.current-car {
    display: none;
}
.mod__com{
    text-align: left;
    width: 70%;
}
</style>