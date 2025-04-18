<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const props = defineProps(['car'])
let car = computed(() => props.car)

function favorite(car) {
    appStore.checkFavorite(car) ? appStore.removeFavorite(car) : appStore.addFavorite(car)
}

function comparison(car) {
    appStore.checkComparison(car) ? appStore.removeComparison(car) : appStore.addComparison(car)
}

function setRecent(id) {
    setTimeout(() => {
        appStore.recentCar = id
    }, 1000)
}
</script>

<template>
    <div class="car">
        <div class="car__img" @click="yandexEcommerce('click', car), setRecent(car.id)">

            <SmallGallery :carInfo="car"></SmallGallery>

            <div class="stickers">
                <div class="sticker viewed" v-if="appStore.checkViewed(car)">Просмотрено</div>
                <div class="sticker sale" v-if="car.sale">
                    Скидка до {{ makeSpaces(car.sale) }} руб
                </div>
            </div>

        </div>

        <NuxtLink :to="`/cars-used/${car.url_brand}/${car.url_model}/${car.url_generation}/${car.id}`"
            @click="yandexEcommerce('click', car), setRecent(car.id)" class="car__text">
            <div class="car__title">
                {{ car.brand }} {{ car.model }} <span>{{ car.year }}</span>
            </div>

            <div class="car__price">
                <div class="car__price-current">
                    от {{ makeSpaces(car.price - car.sale) }} руб.
                </div>
                <div class="car__price-old" v-if="car.sale">
                    от {{ makeSpaces(car.price) }} руб.
                </div>
                <div class="car__price-month">
                    от {{ makeSpaces(appStore.calcMonthPrice(car)) }} руб/мес.
                </div>

            </div>
            <div class="car__info">
                <div class="car__info-item" v-if="car.mileage">
                    {{ makeSpaces(car.mileage) }} км.
                </div>
                <div class="car__info-item" v-if="car.owner_count_id">
                    {{ car.owner_count_id == 1 ? '1' : car.owner_count_id == 2 ? '2' : car.owner_count_id == 3 ? '3+' :
                        '0' }} вл.
                </div>
                <div class="car__info-item" v-if="car.power">
                    {{ car.power }} л.с.
                </div>
            </div>
        </NuxtLink>

        <div class="car__controls">
            <BaseButtonModal :car="car" :btn-label="'Купить в кредит'" :app-type="2"
                :modal-title="`Купить в кредит ${car.brand} ${car.model}`" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.car {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 280px;
    align-items: center;
    border-radius: var(--border-radius);
    transition: 0.3s;
    position: relative;
    background: white;
    padding: 20px;
    gap: 20px;
    max-height: 600px;

    @media screen and (max-width: 540px) {
        padding: 10px;
    }

    &:hover {
        -webkit-box-shadow: 0px 0px 25px -6px rgba(34, 60, 80, 0.3);
        -moz-box-shadow: 0px 0px 25px -6px rgba(34, 60, 80, 0.3);
        box-shadow: 0px 0px 25px -6px rgba(34, 60, 80, 0.3);
        transition: 0.3s;
    }

    .car__title {
        font-size: var(--big-size);
        font-weight: bold;
        line-height: normal;

        span {
            color: #8E8D92;
            font-weight: inherit;
        }
    }

    .car__info {
        display: flex;
        width: 100%;
        gap: 10px;
        flex-wrap: wrap;

        .car__info-item {
            color: #8E8D92;
        }
    }

    .car__promo {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 5px;
        margin-bottom: 25px;

        .car__promo-item {
            border: 2px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: 8px 12px;
            font-size: var(--standart-size);
        }

        .green {
            color: #36B555;
            border: 2px solid #36B555;
            font-weight: 600;
        }
    }

    .car__price {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;

        @media screen and (max-width: 768px) {
            flex-direction: column;
            align-items: start;
        }

        .car__price-month {
            color: var(--main-color);
            font-weight: bold;
        }

        .car__price-current {
            font-size: var(--big-size);
            font-weight: 600;
            line-height: normal;

            @media screen and (max-width: 768px) {
                font-size: 26px;
            }
        }

        .car__price-old {
            text-decoration: line-through;
            line-height: normal;
            color: var(--light-dark-color);
            font-size: 18px;

            @media screen and (max-width: 768px) {
                font-size: var(--big-size);
            }
        }
    }

    .car__controls {
        width: 100%;

        .controls__item {
            padding: 20px;
            background: #EBF0F6;
            border-radius: var(--border-radius);
            transition: 0.1s;
            cursor: pointer;
            border-radius: var(--border-radius);

            @media screen and (max-width: 400px) {
                padding: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            &:hover {
                background: var(--main-color);
                color: white;
            }
        }

        .controls__item.active {
            background: var(--main-color);
            color: white;
        }


    }

    .car__img {
        position: relative;
        height: 100%;
        width: 100%;
        border-radius: 15px;
        overflow: hidden;

        .stickers {
            display: flex;
            position: absolute;
            z-index: 100;
            left: 10px;
            top: 10px;
            gap: 10px;
            flex-wrap: wrap;
            background: transparent;
            z-index: 2;

            @media screen and (max-width: 400px) {
                left: 5px;
                top: 5px;
                gap: 5px;
            }

            .sticker {
                border-radius: var(--border-radius);
                background: white;
                text-align: center;
                z-index: 100;
                padding: 8px 12px;
                font-size: var(--small-size);

                @media screen and (max-width: 768px) {
                    font-size: 12px;
                }

                @media screen and (max-width: 400px) {
                    font-size: 10px;
                    padding: 4px 6px;
                }
            }

            .sale {
                background: var(--main-color);
                color: white;
            }
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
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
</style>