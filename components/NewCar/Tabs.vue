<script setup>
import { useRoute } from 'vue-router';
import { useCarStore } from '/stores/CarStore.js'

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore()

const carStore = useCarStore()

let activeTab = ref(0)
const $route = useRoute();
let car = ref([]);
car.value = carStore.car

watch(() => carStore.car, (currentData, prevData) => {
    car.value = currentData
})

</script>

<template>
    <section class="car-tabs">

        <div class="car-tabs__head">
            <div class="container">
                <ul class="car-tabs__list">
                    <li class="car-tabs__item" :class="{ 'active': activeTab == 0 }" @click="activeTab = 0">
                        Описание
                    </li>
                    <li class="car-tabs__item" :class="{ 'active': activeTab === 1 }" @click="activeTab = 1"
                        v-if="false">
                        Комплектация
                    </li>
                </ul>
            </div>
        </div>

        <div class="container car-tabs__content">
            <div class="car-info">
                <div class="car-tabs__content-item" v-if="activeTab == 0">
                    <div class="car-tabs__content-text">
                        <div class="Option-section__content">
                            <p class="important">ТОЛЬКО ДО
                                <span id="data_sale">
                                    {{ getSaleDate().toUpperCase() }}
                                </span>!
                                СКИДКИ ДО 200 000 РУБ ПРИ ПОКУПКЕ
                                В
                                КРЕДИТ
                                + ЗИМНЯЯ
                                РЕЗИНА В
                                ПОДАРОК!
                            </p>
                            <br>
                            <p>Данный автомобиль можно приобрести в кредит от ведущих банков страны. </p>
                            <br>
                            <p>Минимальный комплект документов для подачи заявки на кредит: </p>
                            <ul>
                                <li>паспорт РФ </li>
                                <li>водительское удостоверение </li>
                            </ul>
                            <p>Рассмотрение анкеты в кратчайшие сроки (в течение 30 мин).</p>
                            <br>
                            <p>АВТОКРЕДИТ ДЛЯ ВСЕХ РЕГИОНОВ РФ! </p>
                            <ul>
                                <li>Первоначальный взнос от 0%; </li>
                                <li>Процентная ставка по кредиту от {{ appStore.creditPercent }}% годовых </li>
                                <li>Срок кредита – от 6 мес. до 8 лет; </li>
                                <li>КАСКО не обязательно!</li>
                            </ul>
                            <br>
                            <p>Принимаются дистанционные заявки на рассмотрение кредита по телефону! Выдача автомобиля в
                                день
                                обращения, независимо от формы оплаты (безналичный расчет, кредит, наличный расчет,
                                оплата по
                                банковской карте).</p>
                            <br>
                            <p>Наши услуги: </p>
                            <ul>
                                <li>Срочный выкуп вашего автомобиля </li>
                                <li>Выкуп кредитных а/м </li>
                                <li>Trade-in </li>
                                <li>Комиссионная продажа на ваших условиях</li>
                                <li>Кредитование (более 30 Банков) кредит 99% одобрения</li>
                                <li>Страхование КАСКО, ОСАГО</li>
                                <li>Дополнительное оборудование</li>
                                <li>Запасные части</li>
                            </ul>
                            <br>
                            <p>Ждём Вас каждый день, с 9:00 до 20:00. Звоните или приезжайте - Мы
                                обязательно
                                договоримся.</p>
                        </div>
                    </div>
                </div>
                <div class="car-tabs__content-item" v-if="activeTab == 1 && false">
                    <div class="car-tabs__content-text">
                        <ul class="Option-section__Equipment-list">
                            <li class="Equipment-item">Система рулевого управления с гидроусилителем</li>
                            <li class="Equipment-item">Рулевая колонка, регулируемая по вылету и углу наклона</li>
                            <li class="Equipment-item">Кожаная отделка рулевого колеса</li>
                            <li class="Equipment-item">Аудиосистема с AM/FM, проигрывателем CD/MP3, монохромным дисплеем
                                3.5″, 6 динамиками, дистанционным управлением на руле и USB</li>
                            <li class="Equipment-item">Наружные зеркала с электроприводом регулировки, корпуса окрашены
                                в цвет кузова</li>
                            <li class="Equipment-item">Регулировка высоты сиденья водителя</li>
                            <li class="Equipment-item">Датчики дождя и света</li>
                            <li class="Equipment-item">Задние электростеклоподъемники</li>
                            <li class="Equipment-item">Боковые зеркала заднего вида с электроприводом складывания</li>
                            <li class="Equipment-item">Обогрев лобового стекла</li>
                            <li class="Equipment-item">Обогрев боковых зеркал</li>
                            <li class="Equipment-item">Электрообогрев передних сидений</li>
                            <li class="Equipment-item">Климат-контроль двухзонный</li>
                            <li class="Equipment-item">Программируемый предпусковой топливный обогреватель</li>
                            <li class="Equipment-item">Система SYNC c Bluetooth и голосовым управлением на русском языке
                            </li>
                            <li class="Equipment-item">Аудиоподготовка - антенна, заглушка на центральной консоли</li>
                            <li class="Equipment-item">Фронтальные подушки безопасности водителя и переднего пассажира
                            </li>
                            <li class="Equipment-item">Isofix - крепления для безопасных детских кресел на заднем ряду
                                сидений</li>
                            <li class="Equipment-item">Боковые шторки безопасности</li>
                            <li class="Equipment-item">Подушки безопасности боковые передние</li>
                            <li class="Equipment-item">Антиблокировочная система тормозов (ABS)</li>
                            <li class="Equipment-item">Система электронного распределения тормозных усилий (EBD)</li>
                            <li class="Equipment-item">Система курсовой устойчивости (ESP)</li>
                            <li class="Equipment-item">Датчики парковки сзади</li>
                            <li class="Equipment-item">Задний спойлер в цвет кузова</li>
                            <li class="Equipment-item">Окраска кузова Race Red/Blazer Blue</li>
                            <li class="Equipment-item">Дверные ручки в цвет кузова</li>
                            <li class="Equipment-item">16" 7x2-спицевые стальные диски с декоративными колпаками</li>
                            <li class="Equipment-item">Серебристые рейлинги на крыше</li>
                            <li class="Equipment-item">Окраска кузова Frozen White</li>
                            <li class="Equipment-item">Окраска кузова металлик</li>
                            <li class="Equipment-item">Увеличенный задний спойлер</li>
                            <li class="Equipment-item">16" легкосплавные колесные диски "мини-ST"</li>
                            <li class="Equipment-item">Передние противотуманные фары</li>
                            <li class="Equipment-item">Регулировка яркости щитка приборов</li>
                            <li class="Equipment-item">Ткань Lux, цвет Сharcoal Black</li>
                            <li class="Equipment-item">Автоматически затемняющееся внутреннее зеркало заднего вида</li>
                            <li class="Equipment-item">Запасное колесо полноразмерное</li>
                            <li class="Equipment-item">Фирменная система дозаправки Ford Easy Fuel без использования
                                крышки заливной горловины</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="car-tabs__form">
                <FormCar :car="car" />
            </div>
        </div>


    </section>
</template>

<style scoped lang="scss">
.car-tabs {
    padding: 10px 0;
}

.car-tabs__head {
    padding: 20px;

    .car-tabs__list {
        display: flex;
        gap: 30px;
        flex-wrap: wrap;

        @media screen and (max-width: 1140px) {
            gap: 10px;
        }

        .car-tabs__item {
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: bold;
            transition: 0.3s;
            cursor: pointer;
            color: white;
            background: #9C9C9C;

            &:hover {
                background-color: var(--main-black);
                color: var(--bg-light);
                transition: 0.3s;
            }
        }

        .active {
            background-color: var(--main-black);
            color: var(--bg-light);
        }
    }
}

.car-tabs__content {
    padding: 40px 20px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    background: #F8F8F8;
    border-radius: 10px;

    -webkit-box-shadow: 0px 0px 15px 0px rgba(34, 60, 80, 0.15);
    -moz-box-shadow: 0px 0px 15px 0px rgba(34, 60, 80, 0.15);
    box-shadow: 0px 0px 15px 0px rgba(34, 60, 80, 0.15);

    ul {
        list-style: disc;
        padding-left: 20px;
    }

    @media screen and (max-width: 1400px) {
        grid-template-columns: 1fr;
    }

    .Option-section__Equipment-list {
        columns: 2;

        @media screen and (max-width: 540px) {
            columns: 1;
        }
    }
}

.car-tabs__content-text {
    .important {
        color: white;
        background: var(--main-color);
        border-radius: 10px;
        padding: 10px;
        max-width: 320px;
    }
}
</style>