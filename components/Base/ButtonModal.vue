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
        default: 2,
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
    <div class="baseButton">
        <BaseButton class="button-modal" :icon="btnIcon" :label="btnLabel" :class="btnClass" :mobileIcon="btnMobileIcon"
            @click="modalShow(), car ? yandexEcommerce('add', car) : null"  />
        <Teleport to="body">
            <div v-if="isOpen">
                <BaseModalNew :modalTitle="modalTitle" :appType="appType" :car="car" @closeModal="modalShow()"/>
            </div>
        </Teleport>
    </div>
</template>

<style lang="scss" scoped>
    .credit{
        width: 187px;
        padding: 12px 20px;
        font-size: 14px;
        text-transform: uppercase;


        @media screen and (max-width: 767px){
            width: 100%;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
    }
</style>