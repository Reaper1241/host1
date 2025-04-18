<script setup>
import { useIdle, useTimestamp } from '@vueuse/core'

import { useRoute } from 'vue-router'
const $route = useRoute()

import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const isOpen = ref(false);
const modalSuccess = ref(false);
const shown = ref(false);

const { idle, lastActive } = useIdle(55000) // Афк модалка появится через 55 секунд useIdle(55000) /
const now = useTimestamp({ interval: 1000 })
const idledFor = computed(() => Math.floor((now.value - lastActive.value) / 1000))

function modalShow() {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'auto'
    }
}

watch(idle, (idle) => {
    if (idle && !shown.value && appStore.firstCar && !appStore.modalShown) {
        shown.value = true
        modalShow()
    }
})
</script>

<template>
    <div class="modal modal__credit" v-if="isOpen" @click.self="modalShow()">
        <div class="modal__dialog" v-if="!modalSuccess">
            <div class="modal__content">
                <h2 class="modal__title">Сомневаетесь в выборе? Оставьте заявку! Проконсультируем и подберем для вас
                    идеальный автомобиль!</h2>
                <button class="modal__close-credit modal__close" type="button" @click="modalShow()"></button>

                <h3 class="modal__text">
                    Купить новую <span>{{ appStore.firstCar.brand.toUpperCase() }} {{ appStore.firstCar.model ?
                        appStore.firstCar.model.toUpperCase()
                        :
                        appStore.firstCar.model_name.toUpperCase() }}</span><br> в кредит от <span>{{
                            makeSpaces(appStore.calcMonthPrice(appStore.firstCar))
                        }}</span> руб./мес.</h3>

                <img class="modal__foto"
                    :src="`${appStore.firstCar.images[0]?.url ? appStore.firstCar.images[0].url : '/assets/img/no_image.webp'}`"
                    alt="заявка на кредит" width="190">

                <p class="modal__text">До
                    <span class="sale-date">{{ getSaleDate() }}</span>
                    <br>
                    от <span>
                        {{ appStore.firstCar.min_price ? makeSpaces(appStore.firstCar.min_price -
                            appStore.firstCar.sale) :
                            makeSpaces(appStore.firstCar.price - appStore.firstCar.sale) }}
                    </span>
                    руб.
                </p>
                <FormModal :carInfo="appStore.firstCar" :formType="2" />

            </div>
        </div>

        <div class="modal__dialog" v-else>
            <div class="modal__content">
                <h2 class="success-title"> Ваша заявка успешно отправлена! </h2>
                <p class="success-text">Спасибо за заявку, наши специалисты свяжутся с вами в течение 30 минут.</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card__btn {
    font-weight: 700;
    font-size: var(--standart-size);
    line-height: 16px;
    border-radius: 6px;
    width: 100%;
    height: 40px;
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
}

.credit__button {
    background: var(--yellow);
}

.row__credit-btn {
    padding: 9px 5px;
    max-width: 256px;
    width: 100%;
    background: var(--main-color);
    border-radius: 4px;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;

    @media screen and (max-width: 767px) {
        display: none;
        position: absolute;
        left: 0;
        opacity: 0;
        max-width: calc(100% - 40px);
        height: 100%;
    }
}

.modal__dialog {
    .modal__content {
        .modal__title {
            color: var(--main-black);
            font-weight: 700;
            font-size: var(--big-size);
            line-height: normal;
            margin: 10px 0;
            padding-top: 8px;
            width: auto;
            text-align: center;
        }

        .modal__text {
            font-weight: 500;
            font-size: var(--big-size);
            line-height: 26px;
            color: var(--main-black);

            span {
                font-weight: 700;
                color: var(--main-color);
            }
        }
    }
}
</style>