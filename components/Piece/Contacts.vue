<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();


const app_type= 6
const modal_title="Оставьте заявку и мы перезвоним Вам в течение 30 минут!"

const isOpen = ref(false)

function modalShow() {
    isOpen.value = !isOpen.value
    appStore.modalShown = !appStore.modalShown
}
</script>

<template>
    <div class="contacts">

        <div class="contacts__item">
            <p>Телефон:</p>
            <a @click="modalShow(), car ? yandexEcommerce('add', car) : null" class="footer-info__text phone__button">
                {{ appStore.phone }}
            </a>
            <a :href="`tel:+${appStore.clearPhone}`"class="footer-info__text mobile" >
                {{ appStore.phone }}
            </a>
        </div>

        <div class="contacts__item">
            <p>Адрес:</p>
            <p class="footer-info__text">
                {{ appStore.address }}
            </p>
        </div>



        <div class="contacts__item">
            <p>Часы работы:</p>
            <p class="footer-info__text">
                {{ appStore.workingHours }}
            </p>
        </div>
    </div>
    <Teleport to="body">
        <div v-if="isOpen">
            <BaseModalNew :modalTitle="modal_title" :appType="app_type" :car="car" @closeModal="modalShow()" class="taxi"/>
        </div>
    </Teleport>
</template>



<style lang="scss" scoped>
.contacts {
    display: flex;
    gap: 15px;

    @media screen and (max-width:767px) {
        display: block;
        text-align: end;
    }

    .contacts__item {
        margin-bottom: 5px;

        p {
            margin-bottom: 5px;
        }

        .footer-info__text {
            color: var(--color-d);
            font-weight: 700;
            font-size: 15px;
            margin-bottom: 0px;
        }
    }

}

.contacts.burger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 15px;
    padding: 15px;
    border-radius: 30px;
    margin-top: 30px;
    background: white;
}

.phone__button{

    @media screen and (max-width:767px) {
        display: none;
    }
}

.mobile{
    display: none;

    @media screen and (max-width:767px) {
        display: block;
    }
}
</style>