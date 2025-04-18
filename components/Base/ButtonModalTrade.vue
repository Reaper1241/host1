<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const isOpen = ref(false)

const props = defineProps({
    car: {
        type: Object,
        default: null,
    },
    btnLabel: {
        type: String,
        default: '',
    },
    appType: {
        type: Number,
        default: 3,
    },
    modalTitle: {
        type: String,
        default: 'Купить в кредит',
    },
    btnIcon: {
        type: String,
        default: '',
    },
    btnClass: {
        type: String,
        default: '',
    },
    btnMobileIcon: {
        type: String,
        default: '',
    }
})

function modalShow() {
    isOpen.value = !isOpen.value
    appStore.modalShown = !appStore.modalShown
}


</script>

<template>
    <BaseButton class="button-modal" :icon="btnIcon" :label="btnLabel" :class="btnClass" :mobileIcon="btnMobileIcon"
        @click="modalShow(), car ? yandexEcommerce('add', car) : null"  />
    <Teleport to="body">
        <div v-if="isOpen">
            <BaseModalTrade :modalTitle="modalTitle" :appType="appType" :car="car" @closeModal="modalShow()" />
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
.trade{
    width: 217px;
    background-color: var(--color-d);
    color: #fff;
    border: none;
    padding: 12px 20px;
    font-size: 14px;
    text-transform: uppercase;

    @media screen and (max-width: 767px){
            width: 100%;
        }
}
</style>