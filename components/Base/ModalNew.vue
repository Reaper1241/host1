<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()
import { useRoute } from 'vue-router';
const $route = useRoute();


const emits = defineEmits(['closeModal']);

const props = defineProps({
    modalType: String,
    car: Object,
    class: String,
    modalTitle: String,
    modalSubTitle: String,
    showModal: Boolean,
    callback: Function,
    appType: Number
})

</script>

<template>
   
    <div class="modal modal__credit" @click.self="emits('closeModal'), car ? yandexEcommerce('remove', car) : null">
        <div class="modal__dialog" :class="car && appType == 2 ? '__car' : ''">
            <div class="modal__content">
                <button class="modal__close-credit modal__close" type="button"
                    @click="emits('closeModal'), car ? yandexEcommerce('remove', car) : null">
                    <!-- <span class="close__text">Закрыть</span> -->
                </button>
                <div class="modal__car" v-if="car ">
                    <div class="modal__photo-wrapper" v-if="appType == 2">

                        <img class="modal__photo"
                            :src="`${car.images[0].url ? car.images[0].url  : '/src/static/img/no_image.webp'}`"
                            :alt="'Заявка на кредит' + car.brand + ' ' + car.model + ' ' + car.modification" v-if="car && car.images.length">

                            <img class="modal__photo preview" :src="car?.preview" alt="Модальное окно"
                            v-else-if="car && car.preview">


                        <img class="modal__photo" src="/assets/img/modalDefault.webp" alt="Модальное окно" v-else>

                        <div class="stickers" v-if="car">
                            <div class="sticker sale">
                                До {{ getSaleDate() }}: от {{ car.min_price ?
                                    makeSpaces(car.min_price) :
                                    makeSpaces(car.price - car.sale) }} руб.
                            </div>
                            <div class="sticker">
                                от {{ makeSpaces(appStore.calcMonthPrice(car)) }} руб/мес.
                            </div>
                            <div class="sticker credit">
                                Доступен автокредит
                            </div>
                        </div>
                    </div>

                    <div class="pop__left" v-else>
                        <div class="pop__title">
                            <p>
                                Получите лучшее предложение <br />
                                по кредиту на <span class="pop__car-name">{{car.brand + ' ' + car.model}}</span>
                            </p>
                        </div>
                        <div class="pop-text">
                            <ul>
                                <li class="pop-text__item">
                                    Ставка по кредиту от {{ appStore.creditPercent }}% годовых
                                </li>
                                <li class="pop-text__item">
                                    Достаточно предоставить 2 документа для одобрения
                                </li>
                                <li class="pop-text__item">
                                    Предвариательное решение онлайн за 30 минут
                                </li>
                                <li class="pop-text__item">
                                    Одобрение 98%, широкая линейка кредитных программ
                                </li>
                                <li class="pop-text__item">21 банк на выбор</li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div class="modal__form">
                    <h2 class="modal__title" v-if="modalTitle">{{ modalTitle }}</h2>
                    <h3 class="modal__subtitle" v-if="modalSubTitle">{{ modalSubTitle }}</h3>
                    <FormModalCredit :car="car" :appType="appType" @formSend="emits('closeModal')"
                        v-if="car && appType == 2" />
                    <FormModal :car="car" :appType="appType" @formSend="emits('closeModal')" v-else-if="$route.path !='/taxi'" />
                    <FormModal :car="car" :appType="appType" @formSend="emits('closeModal')" v-else />

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal__content {
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-direction: column; // для мобилок — вертикально
  }
}

.modal__car,
.modal__form {
  flex: 1 1 20%;
  min-width: 0; // чтобы не ломался flex на больших картинках
  display: flex;
  flex-direction: column;
  justify-content: center;
}


.button-buy {
    color: var(--bg-light);
    background: var(--green);
    height: 100%;

//    border-radius: var(--border-small-radius);
    font-weight: bold;
    border: 3px solid var(-green);
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 14px;

    .button__icon {
        margin-right: 10px;
    }
}

.button-buy.callback {
    background: linear-gradient(90deg, #8D171C 0%, #EC2830 100%);
}

.button {
    display: grid;
    grid-template-columns: 1fr max-content;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        .button-buy {
            opacity: 0.7;
            transition: 0.3s;
        }
    }

    .button-price {
        padding: 15px 15px;
        border-bottom: 2px solid var(--border-color);
        border-top: 2px solid var(--border-color);
        border-left: 2px solid var(--border-color);
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (max-width: 400px) {
            padding: 15px 10px;
        }
    }
}

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
    position: relative;
    overflow: hidden;
}

.row__credit-btn {
    padding: 9px 5px;
    max-width: 256px;
    width: 100%;
    background: var(--orange);
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

.modal__month-price {
    text-align: center;
    margin-top: 5px;
}
.modal__car{
    background-color: #555555cb;

}
.pop__left {
  padding: 30px;
  background-color: transparent;
}
.pop__left .pop__title {
  border: none;
  color: #fff;
  background: transparent;
}
.pop-text{
    background: transparent;
}
.pop-text__item {
  margin-bottom: 10px;
  position: relative;
  padding-left: 20px;
  color: #e6e6e6;
  text-align: justify;
  background: transparent;
}

.pop-text__item:before {
  content: "✔";
  display: block;
  width: 20px;
  height: 20px;
//   background: url(../img/icon/check.svg);
  background-size: cover;
  position: absolute;
  top: 0;
  left: -5px;
  background: transparent;

}

</style>