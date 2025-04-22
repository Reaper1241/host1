<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { useError } from 'nuxt/app';

const error = useError();
const hasError = computed(() => !!error.value);
</script>

<template>
    <footer class="section" v-if="!hasError">
        <div class="container">
            <div class="top__footer">
                <BaseLogo />
                <PieceContacts />
            </div>
            <PieceNavbarFooter />
            <div class="bottom__footer">
                <div class="text">
                    <p>
                        Обращаем Ваше внимание на то, что данный сайт носит исключительно
                        информационный характер и ни при каких условиях не является публичной
                        офертой, определяемой положениями статьи 437 Гражданского кодекса
                        Российской Федерации. Все цены указаны с учетом максимальной скидки на
                        авто и при условии покупки в кредит и включают в себя обязательные
                        страховые продукты, которые согласовываются и оплачиваются отдельно.
                    </p>
                    <div v-html="appStore.politics " class="politics">
                    </div>
                    <NuxtLink :to="`/politics`">Политика конфиденциальности</NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.section {
    width: 100%;
    background: #e9e9e9;
    padding: 20px 0;

    .top__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        @media screen and (max-width:570px) {
            display: block;
            padding-bottom: 70px
        }
    }

    .bottom__footer {
        padding: 10px 0;
        
        p,
        .politics {
            padding: 5px 0;
            font-size: 14px;
            color: #BDBDBD;
        }

        a {
            text-decoration: underline;
            color: var(--color-d);
        }

        @media screen and (max-width:570px) {
            padding-bottom: 50px
        }

        // @media screen and (max-width:360px) {
        //     padding-bottom: 100px
        // }
    }
}
</style>