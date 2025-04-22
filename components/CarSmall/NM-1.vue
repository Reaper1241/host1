<script setup>
// import { NuxtLink } from '#build/components';
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();
import { useRoute } from 'vue-router'
const $route = useRoute()

const props = defineProps(['car'])
let car = computed(() => {
  const { id, ...rest } = props.car;
  return rest;
});
let price = car.value.min_price + car.value.min_sale;

</script>

<template>
    <div class="car">
        <NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}`" class="car__text">
            <div class="car__img">
                <img :src="car?.preview" :alt="car.model" v-if="car.preview.length  ">
                <img src="/assets/img/no_image.webp" :alt="car.model" v-else>
                <div class="count">
                    <img src="public/Component 76.jpg" class="car__sticker-img" alt="">
                    <span>{{ car.cars_count }}</span> в наличии 
                </div>
            </div>
            <div class="car__title">
                <div class="car__name">
                    <p>
                        {{ car.brand }}
                    </p>
                    <p class="model__name">
                        {{ car.model }}
                    </p>
                </div>
            </div>
        </NuxtLink>

        

        <div class="car__price">
            <div >
                <div class="car__price-current">
                    от {{ makeSpaces(car.min_price ) }} ₽
                </div>
                <del>{{ makeSpaces(car.min_price + car.min_sale) }} ₽</del>
            </div>

            <div class="car__price-month">
                от {{ makeSpaces(appStore.calcMonthPriceModel(car.min_sale, car.min_price+car.min_sale)) }} ₽/мес.
            </div>
        </div>

        <div class="car__controls" v-if="$route.name == 'brand'">
                <!-- <BaseButtonModal :car="car" :btn-label="'Купить в кредит '" :app-type="8"
                :modal-title="`Купить в кредит ${cleanUpTitle(car.url_brand, car.url_model)}`" :btn-class="`classic`" />  -->
                <NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}`" class="model__link">Подробнее</NuxtLink>
                <NuxtLink :to="{path:`/cars/${car.url_brand}/${car.url_model}`, hash:'#model__cars'}" class="model__cars">В наличии</NuxtLink>
        </div>
        <div class="car__controls" v-else>
            {{ console.log(price)
             }}
            <BaseButtonModal :car="{ price: price, sale: car.min_sale, images:'' , preview: car.preview, model: car.model, brand: car.brand }" :btn-label="'Купить в кредит '" :app-type="2"
                :modal-title="`Купить в кредит ${cleanUpTitle(car.url_brand, car.url_model)}`" :btn-class="`classic`" />
            
        </div>
    </div>
</template>

<style scoped lang="scss">

.car__more {
  display: inline-block;
  border: 1px solid #D2122B;
  border-radius: 5px;
  padding: 10px 15px;
  color: #D2122B;
  background-color: white;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
    margin: 0 10px 10px 10px;
    height: 35px;
    font-size: 13px;
  &:hover {
    background-color: #D2122B;
    color: white;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}

.car {
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    // max-width: 280px;
//    border-radius: var(--border-small-radius);
    transition: 0.3s;
    position: relative;
    background: white;
    // padding: 5px;
    // gap: 20px;
    &:hover {
        box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1); 
        transition: 0.3s;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 15px 15px 0 15px;
    }
    .count {
        position: absolute;
        bottom: 10px;
        right: 10px;
        display: flex;
        align-items: center;
        gap: 6px;
        background: white;
        padding: 4px 10px;
        border-radius: 20px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        .car__sticker-img {
            width: 15px;
            height: 15px;
            display: inline-block; // вместо block
            vertical-align: middle; // важно
            object-fit: contain; // добавим на всякий случай
            padding: 0 !important
        }

        .count-bg {
            width: 16px;
            height: 16px;
        }

        .count-text {
            display: inline-block;
            line-height: 1;
            font-size: 13px;
            font-weight: 600;
            color: #000;

            span {
                color: var(--color-d); // яркий акцент
                font-weight: 700;

            }
        }
    }

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

    .car__more-link {
        padding: 15px;
        background: var(--main-color);
        // border: 1px solid var(--main-color);
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
        width: 100%;
        align-items: center;
        padding: 10px ;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        
        // @media screen and (max-width:1000px) {
        //     display: block;
        // }
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
            color: black;

            // @media screen and (max-width: 400px) {
            //     font-size: 12px;
            // }
        }

        .car__price-current {
            font-weight: 700;
            font-size: 16px;
            color: #D2122B;
            @media screen and (max-width:767px) {
                font-size: 14px;
            }
        }
    }

    .car__controls {
        width: 93%;
        margin-bottom: 10px;
        margin-left: 11px;
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
        padding: 0 5px;
        margin-bottom: 0;
        border-bottom: 1px solid #D2122B;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: end;
        align-items: flex-end;
        padding-bottom: 5px;
        text-transform: uppercase;
        justify-content: space-between;
        min-height: 40px;

       
        .car__name{
            display: flex;
            max-width: 165px;
            font-size: 14px;
            color: #000;

            p{
                padding-left: 5px;
                font-weight: 700 !important;
            }

            .model__name{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .count{
            font-size: 14px;
            padding-right:15px ;
            span{
                color: var(--color-d);
                font-weight: 700;
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
                background: #fec000;
                color: #000;
            }

    }
    
}

.brand{
    .car__price{
        padding: 10px;
        background: none;
        align-items: flex-start;
        .car__price-current{
            color: var(--color-c);
        }

        .car__price-month{
            padding-top: 3px;
            color: #000;
        }
    }
    .car__controls{
        .model__link{
            border-radius: 5px;
            color: #fff;
            padding: 7px;
            text-align: center;
            font-weight: 700;
            margin-bottom: 3px;
            background: #D2122B;
            &:hover {
                transform: scale(1.02);
            }
        }
        .model__cars{
            margin-top: 10px;
            border-radius: 5px;
            color: #D2122B;
            padding: 7px;
            text-align: center;
            font-weight: 700;
            background: none;
            border: 1px solid var(--color-c);
            &:hover {
                background-color: #D2122B;
                color: white;
                transform: scale(1.02);
            }

            a {
                color: inherit;
                text-decoration: none;
            }
        }
      
    }
}
</style>