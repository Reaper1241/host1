<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

const currentMod = computed(() => findMod(newStore.modification, newStore.model.modifications))
const selectedColor = ref(0)
const colors = ref(newStore.model.colored_galleries)
</script>

<template>
    <section class="model-сharacteristics section">
        <div class="container">
            <div class="model-сharacteristics__wrapper">
                <div class="model-сharacteristics__header section__header">
                    <BaseSectionTitle :title="`Технические характеристики`" />
                </div>
                <div class="model-сharacteristics__body">
                    <div class="model-сharacteristics__text">
                        <ul class="model-сharacteristics__params">
                            <li class="model-сharacteristics__param">
                                <span>Тип двигателя</span><span>Бензин</span>
                            </li>
                            <li class="model-сharacteristics__param">
                                <span>Объем двигателя</span><span>2.0 л</span>
                            </li>
                            <li class="model-сharacteristics__param">
                                <span>Рабочий объем двигателя</span><span>1998 см3</span>
                            </li>
                            <li class="model-сharacteristics__param">
                                <span>Мощность</span><span>226 л.с</span>
                            </li>
                            <li class="model-сharacteristics__param">
                                <span>Коробка передач</span><span>8-ст. АКПП</span>
                            </li>
                            <li class="model-сharacteristics__param">
                                <span>Количество передач</span><span>8</span>
                            </li>
                            <li class="model-сharacteristics__param">
                                <span>Тип привода</span><span>Передний</span>
                            </li>
                            <li class="model-сharacteristics__param">
                                <span>Разгон от 0 до 100 км/ч</span><span>7.3 сек</span>
                            </li>
                            <li class="model-сharacteristics__param">
                                <span>Максимальная скорость</span><span>220 км/ч</span>
                            </li>
                            <li class="model-сharacteristics__param">
                                <span>Смешанный расход топлива</span><span>8.2 л/100 км</span>
                            </li>
                            <li class="model-сharacteristics__param">
                                <span>Объем топливного бака</span><span>55 л</span>
                            </li>
                            <li class="model-сharacteristics__param">
                                <span>Объем багажного отделения</span><span>450 л</span>
                            </li>
                            <li class="model-сharacteristics__param">
                                <span>Снаряженная масса</span><span>1680 кг</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="model-dimensions__header section__header">
                    <BaseSectionTitle :title="`Габариты`" />
                </div>
                <div class="model-dimensions__body">
                    <div class="model-dimensions__image">
                        Тут будут изображения с габаритами
                    </div>
                    <div class="model-dimensions__text">
                        <ul class="model-dimensions__params">
                            <li class="model-dimensions__param">
                                <span class="title">Длина кузова</span>
                                <span class="value">4820 мм</span>
                            </li>
                            <li class="model-dimensions__param">
                                <span class="title">Ширина кузова</span>
                                <span class="value">1930 мм</span>
                            </li>
                            <li class="model-dimensions__param">
                                <span class="title">Высота кузова</span>
                                <span class="value">1710 мм</span>
                            </li>
                            <li class="model-dimensions__param">
                                <span class="title">Колесная база</span>
                                <span class="value">2820 мм</span>
                            </li>
                            <li class="model-dimensions__param">
                                <span class="title">Дорожный просвет</span>
                                <span class="value">190 мм</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.model-сharacteristics__body {
    display: grid;
    margin-bottom: 30px;

    @media screen and (max-width: 1300px) {
        grid-template-columns: 1fr;
    }

    .model-сharacteristics__text {
        .model-сharacteristics__title {
            font-weight: 600;
            font-size: 16px;
            line-height: normal;
            margin-bottom: 30px;
        }

        .model-сharacteristics__params {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 30px;
            row-gap: 20px;

            @media screen and (max-width: 1100px) {
                grid-template-columns: 1fr 1fr;
            }

            @media screen and (max-width: 768px) {
                grid-template-columns: 1fr;
                row-gap: 10px;
            }

            .model-сharacteristics__param {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid var(--border-color);
                padding-bottom: 10px;

                span {
                    font-size: var(--standart-size);

                    &:first-child {
                        color: var(--main-color);
                    }

                    @media screen and (max-width: 400px) {
                        font-size: var(--small-size);
                    }
                }
            }
        }
    }
}

.model-dimensions__body {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 30px;

    @media screen and (max-width: 1200px) {
        grid-template-columns: 2fr 1fr;
    }

    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr;
    }

    .model-dimensions__image {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px;
    }

    .model-dimensions__params {
        display: flex;
        flex-direction: column;
        gap: 15px;
        border: 1px solid var(--border-color);
        padding: 15px;

        .value {
            order: 2;
        }

        .model-dimensions__param {
            display: flex;
            justify-content: space-between;
            align-items: center;

            &:after {
                content: "";
                display: block;
                flex-grow: 1;
                height: 1px;
                background-color: #e6e8ec;
                margin: 0 8px;
                position: relative;
                top: 5px;
            }
        }
    }
}
</style>