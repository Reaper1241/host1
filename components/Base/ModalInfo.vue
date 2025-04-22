<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const emits = defineEmits(['closeModal']);

const props = defineProps({
    content:Object
})

</script>

<template>
    <div class="modal" @click.self="emits('closeModal')">
        <div class="modal__dialog" >
            <div class="modal__content">
                <!-- <button class="modal__close-credit modal__close" type="button"
                    @click="emits('closeModal')">
                    <span class="close__text">Закрыть</span>
                </button> -->
                <h2>{{ content.title }}</h2>
                <div class="text" v-html="content.content" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .modal__dialog{
        width: calc(100% - 30px);
        max-width: 700px;
        .modal__content{
            padding: 40px;
            display: block;
            h2 {
                font-size: 16px;
                color: var(--color-b);
                margin-bottom: 10px;
            }
            .text{
                :deep(p){
                    margin-bottom: 10px;
                }
                :deep(ul){
                    margin-bottom: 10px;
                     li {
                        position: relative;
                        padding-left: 20px;
                        margin-bottom: 5px;
                        &:after {
                            content: "\2714";
                            display: block;
                            position: absolute;
                            left: 0;
                            top: 0;
                            color: var(--color-d);
                        }
                    }
                }
                :deep(.type){
                    margin-bottom: 10px;
                    li{
                        padding-left: 0px;
                        &:after {
                            display: none;
                        }
                        h3{
                            margin-bottom: 5px;
                        }
                    }
                }
            }
        }
       
    }
</style>