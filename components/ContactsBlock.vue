<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();
</script>

<template>
    <section class="contacts-block section">
        <div class="container">
            <div class="contacts-block__wrapper">
                <div class="contacts-block__header">
                    <BaseTitle :title="`Контакты автосалона ${appStore.siteName}`" />
                </div>

                <div class="contacts-block__body">
                    <div class="contacts-block__map">
                        <iframe :src="`${appStore.yandexMap}`" width="100%" height="300" frameborder="0"></iframe>
                    </div>

                    <div class="contacts-block__text">
                        <PieceContacts />

                        <div class="contacts-block__text-button">
                            <BaseButtonModal :btn-label="`Заказать звонок`" :app-type="1"
                                :modal-title="`Заказать звонок`" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
.contacts-block__body {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 30px;
    position: relative;

    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr;
    }

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column-reverse;
        gap: 10px;
    }

    .contacts-block__text {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media screen and (max-width: 1200px) {
            position: absolute;
            background: white;
            padding: 20px;
            gap: 10px;
            left: 0;
        }

        @media screen and (max-width: 768px) {
            position: relative;
            padding: 0;
        }

        .contacts-block__text-title {
            font-weight: bold;
            margin-bottom: 10px;
        }

        .contacts-block__text-button {
            margin-top: 10px;
        }
    }
}
</style>