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
                    <span class="close__text">Закрыть</span>
                </button>

                <div class="modal__form">
                    <div class="logo">
                        <BaseLogo/>
                        <div class="trade__logo">
                            <img src="/public/trade-logo.svg" alt="">
                        </div>
                    </div>
                    <h2 class="modal__title" v-if="modalTitle" v-html="modalTitle"></h2>
                    <h3 class="modal__subtitle" v-if="modalSubTitle">{{ modalSubTitle }}</h3>
                    <FormModalCredit :car="car" :appType="appType" @formSend="emits('closeModal')"
                        v-if="car && appType == 2" />
                    <FormModal :car="car" :appType="appType" @formSend="emits('closeModal')" v-if="$route.path !='/taxi'" />
                    <FormModal :car="car" :appType="appType" @formSend="emits('closeModal')" v-else class="taxi"/>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal{
    .modal__dialog{
        .modal__content{
            display: block;
            width: 50%;
        }
    }
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


.logo{
    display: flex;
    width: 87%;
    justify-content: space-between;
    .container{
        width: 80%;
        max-width: 440px;
        padding-left: 0px;
        border-right: 1px solid #ccc;
    }
    .trade__logo{
        
        img{
            width:30px ;
            height: 30px;
        }
    }
}

</style>