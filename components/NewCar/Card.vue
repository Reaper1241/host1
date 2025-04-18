<script setup>
import { useNewCarStore } from '/stores/NewCarStore.js'
import { useAppStore } from '/stores/AppStore.js';

const appStore = useAppStore();
const carStore = useNewCarStore()

const car = ref([]);
car.value = carStore.car

onMounted(() => {
    yandexEcommerce('detail', car.value);
})

const sale = ref(car.value.sale);

/*
viewed(car.value)

function viewed(car) {
    if (!appStore.checkViewed(car)) appStore.addViewed(car)
}

yandexEcommerce('detail', car.value);


function favorite(car) {
    appStore.checkFavorite(car) ? appStore.removeFavorite(car) : appStore.addFavorite(car)
}

function comparison(car) {
    appStore.checkComparison(car) ? appStore.removeComparison(car) : appStore.addComparison(car)
}
    */

watch(() => carStore.car, (currentData) => {
    car.value = currentData
    // viewed(car.value)
})

function updateSale(value) {
    sale.value = value
}
carStore.galleries.unshift({ url: car.value.preview });

</script>

<template>
    <section class="car-card section container">

        <div class="slider">
            <NewCarSlider :images="car.images.length ? car.images : carStore.galleries" :class="car.images.length ? '' : 'second'"></NewCarSlider>
        </div>

        <div class="car-info__content-island">
            <div class="content-island">
                <div class="content-island__row car-info__title">
                    <h1>
                        {{ car.brand }} {{ car.model }} {{ car.modification.modification }} {{ car.complectation.complectation}} {{ car.color }} ({{ car.id }})
                    </h1>
                </div>
                <div class="content-island__row car-info__price-box">
                    <div class="car-info__price">
                        <del class="car-info__price-old"
                            >{{ makeSpaces(car.price) }} руб</del
                        >
                        <p class="car-info__price-value">
                            {{ makeSpaces(car.price-sale)  }} руб
                        </p>
                    </div>
                    <div class="box-offer">
                        <p>
                            Ваша выгода<br />до {{ makeSpaces(sale)  }}
                            руб
                        </p>
                    </div>
                </div>
                <div class="content-island__row">
                    <p class="content-island__title">Цвет</p>
                    <p class="content-island__value">{{ car.color }}</p>
                </div>
                <div class="content-island__row">
                    <p class="content-island__title">Статус</p>
                    <p class="content-island__value">В наличии</p>
                </div>
                <div class="content-island__row">
                    <p class="content-island__title">Модификация</p>
                    <p class="content-island__value">{{ car.modification.modification}}</p>
                </div>
                <div class="content-island__row">
                    <p class="content-island__title">Комплектация</p>
                    <p class="content-island__value">{{ car.complectation.complectation}}</p>
                </div>
                <div class="content-island__row">
                    <p class="content-island__title">Гарантия</p>
                    <p class="content-island__value">
                        5 лет, или 150 000 км.
                    </p>
                </div>
                <div class="content-island__row car-info__car-attr">
                    <ul class="car-attr">
                        <li class="car-attr__item">
                            <div class="car-attr__icon">
                                <SvgEngine/>
                            </div>
                            <div class="car-attr__value">{{ car.modification.power }} л.с</div>
                        </li>
                        <li class="car-attr__item">
                            <div class="car-attr__icon">
                                <SvgClock/>
                            </div>
                            <div class="car-attr__value">
                                {{ car.modification.consumption_combine }} л/100 км
                            </div>
                        </li>
                        <li class="car-attr__item">
                            <div class="car-attr__icon">
                                <SvgSpeedometer/>
                            </div>
                            <div class="car-attr__value">{{car.modification.max_speed }} км/ч</div>
                        </li>
                        <li class="car-attr__item">
                            <div class="car-attr__icon">
                                <SvgPetrolFuel/>
                            </div>
                            <div class="car-attr__value">{{ car.modification.from_0_to_100 }} сек.</div>
                        </li>
                    </ul>
                </div>
                <div class="content-island__row car-info__button-group">
                    <!-- <a class="button">Купить в кредит %</a> -->
                    <BaseButtonModal :car="car" :btn-label="'Купить в кредит '" :app-type="2"
                    :modal-title="`Купить в кредит ${cleanUpTitle(car.url_brand, car.url_model)}`" :btn-class="`credit`"  />
                    <div class="second__button">
                        <BaseButtonModalTrade :car="car" :btn-label="'Обменять по TRADE-IN'" :app-type="8"
                        :modal-title="`Дополнительная СКИДКА 250 000 РУБ.<br/> по программе TRADE-IN`" :btn-class="`trade`" />
                    </div>
                    
                </div>
            </div>
        </div>

    </section>
</template>

<style scoped lang="scss">

.car-card{
    display: flex;
    padding: 0 10px;
    column-gap: 20px;
    margin-bottom: 40px;
    @media screen and (max-width:1000px) {
        display: block;
    }
    @media screen and (max-width:570px) {
        margin-bottom: 20px;
    }
}
.car-info__content-island {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    h1{
        font-size: 18px;
        max-width: 400px;
    }

    @media screen and (max-width:1000px) {
        width: 100%;
    }

    .content-island {
        padding: 20px;
        border: 1px solid var(--color-b);

        .content-island__row {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            font-size: 14px;

            .car-attr {
                width: 100%;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-pack: justify;
                justify-content: space-between;
                .car-attr__item{
                    
                    margin-right: 15px;
                    .car-attr__icon{
                        margin-right: 10px;
                        display: inline-block;
                        vertical-align: middle;
                        svg{
                            width: 20px;
                            height: 20px;
                            fill: #a5a5a5;
                        }
                    }
                    .car-attr__value{
                        font-size: 14px;
                        color: #8f8f8f;
                        display: inline-block;
                        vertical-align: middle;
                    }
                    
                }
            }
        }
        
        .car-info__price-box{

            .car-info__price{

                .car-info__price-old {
                    margin-bottom: 3px;
                    font-size: 14px;
                    color: #b8b8b8;
                }

                .car-info__price-value {
                    color: var(--color-c);
                    font-size: 16px;
                    font-weight: 700;
                }
                
            }

            .box-offer {
                padding: 6px 10px;
                border: 1px solid var(--color-d);
                color: var(--color-d);
                font-weight: 700;
                text-align: center;
                position: relative;
                p{
                    color: var(--color-d);
                    font-weight: 700;
                    font-size: 14px;

                }
                &::before{
                    content: "";
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: var(--color-d);
                    opacity: 0.06;
                    z-index: 0;
                }
            }
        }
        .car-info__button-group {
            padding-bottom: 0 ;
            padding-top: 10px ;
            border-bottom: none ;
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-content: space-between;
            
            .second__button{
                justify-self: end;
                @media screen and (max-width:767px) {
                    width: 100%;;
                }
            }

            @media screen and (max-width:767px) {
                display: block;
            }
        }
    }

    
    
}
.slider{
    width: 55%;
    margin: auto;
    -ms-flex-positive: 2;
    flex-grow: 2;

    @media screen and (max-width:1000px) {
        width: 100%;
    }
}



</style>
