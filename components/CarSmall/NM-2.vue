<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const props = defineProps(['car'])
let car = computed(() => props.car)
let price = car.value.min_price + car.value.min_sale;

</script>

<template>
    <div class="car">
        <NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}`" class="car__text">
            <div class="car__img">
                <img :src="car?.taxi" :alt="car.model" v-if="car.preview.length ">
                <img src="/assets/img/no_image.webp" :alt="car.model" v-else>
            </div>
            <div class="car__title">
                <div class="car__name">
                    <p class="model__full-name">{{ car.brand }} {{ car.model }}</p>
                </div>
                <div class="count">
                    <!-- <span>{{ car.cars_count }}</span> в наличии  -->         
                    <img src="public/Component 76.jpg" class="car__sticker-img">
                    <p>В наличии</p>
                </div>
            </div>
        </NuxtLink>

        

        <div class="car__price">
            <div class="car__price-wrapper">
                <p class="car__price-current">от {{ makeSpaces(car.min_price) }} ₽</p>
                <del class="car__price-old">{{ makeSpaces(car.min_price + car.min_sale) }} ₽</del>
            </div>
        </div>
        <div class="car__charcteristics">
            <div class="mod__com">
                <p class="mod">{{ car.modification }}</p>
                <p>{{ car.complectation }}</p>
            </div>
            <p class="garanty">Гарантия {{ getYear(car.warranty_year) }}</p>
        </div>

        <div class="car__controls">
            <BaseButtonModal :car="car" :btn-label="`Купить в кредит от ${makeSpaces(appStore.calcMonthPriceModel(car.sale,car.price))  } руб/мес`" :app-type="2"
                :modal-title="`Купить в кредит  ${cleanUpTitle(car.url_brand, car.url_model)}`" :btn-class="`classic`" />
        </div>

    </div>
</template>

<style scoped lang="scss">
.car {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid #e6e6e6;
    // max-width: 280px;
//    border-radius: var(--border-small-radius);
    transition: 0.3s;
    position: relative;
    background: white;
    // padding: 5px;
    // gap: 20px;

    @media screen and (max-width: 400px) {
        padding: 0;
        // gap: 10px;
    }


    &:hover {
        box-shadow: var(--box-shadow);
        transition: 0.3s;
    }

    // .car__title {
    //     font-size: var(--big-size);
    //     font-weight: bold;
    //     line-height: normal;

    //     span {
    //         color: #8E8D92;
    //         font-weight: inherit;
    //     }
    // }
    .car__charcteristics{
        display: flex;
        justify-content: space-between;
        padding: 0 15px 0 15px;
        flex-wrap: nowrap;
        align-items: center;
        padding: 15px 10px;
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
    .car__more-link {
        padding: 15px;
        background: var(--main-color);
        border: 1px solid var(--main-color);
        color: white;
        text-align: center;
    //    border-radius: var(--border-small-radius);
        width: auto;
        transition: 0.3s;

        &:hover {
            background: transparent;
            transition: 0.3s;
            color: var(--main-color);
        }
    }

    .car__price {
        padding: 10px 15px;
        background: #fff;
        .car__price-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;

        }
        
        @media screen and (max-width:1000px) {
            display: block;
        }
        @media screen and (max-width:767px) {
            display: flex;
        }

        del{
            color: #878787;
            font-size: 14px;
        }

        .car__price-month {
            font-weight: 700;
            font-size: 14px;
            color: var(--color-c);

            // @media screen and (max-width: 400px) {
            //     font-size: 12px;
            // }
        }

        .car__price-current {
            font-size: 16px;
            color: #d60000;
            font-weight: 700;
            margin: 0;
        }
        .car__price-old {
            font-size: 16px;
            color: black;
            text-decoration: line-through;
            font-weight: 400;
            margin-left: 5px;
        }
    }

    .car__controls {
        width: 95%;
        margin: 0 auto;
        padding-bottom: 10px;
        a{
            background: var(--color-c);
            border: none;
        }
    }

    .car__img {
        position: relative;
        width: 100%;
        border-radius: 15px;
        overflow: hidden;
        height: 200px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            padding: 15px 15px 0 15px;

        }

    }
    .car__title{
        margin-bottom: 0;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: end;
        align-items: flex-end;
        padding-bottom: 5px;
        text-transform: uppercase;
        justify-content: space-between;

       
        .car__name{
            max-width: 165px;
            font-size: 14px;
            color: #000;

            p{
                padding-left: 15px;
                font-weight: 700 !important;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .count{
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

.taxi{
    .car__controls{

            a{
                // background: #fec000;
                color: #000;
            }

    }
    
}
</style>