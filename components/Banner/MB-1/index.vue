<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

function getBrandImage(url) {
    return appStore.brands.find(brand => brand.url_brand == url)?.logo
}
</script>

<template>
    <section class="model-banner section">
        <div class="container">
            <div class="model-banner__wrapper">
                <div class="model-banner__body">
                    <div class="model-banner__text">
                        <div class="model-banner__title">
                            <img :src="`${getBrandImage($route.params.brand)}`" alt="car"
                                class="model-banner__title-img">
                            <span>Получите ваше персональное предложение на
                                <b>{{ $route.params.brand.toUpperCase().replaceAll('_', ' ') }} {{
                                    $route.params.model.toUpperCase().replaceAll('_', ' ') }}</b>
                            </span>
                        </div>
                        <div class="model-banner__form">
                            <FormMB1 />
                        </div>
                    </div>
                    <div class="model-banner__image">
                        <img :src="`/images/brands/${$route.params.brand}/${$route.params.model}.png`" alt="car">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
.model-banner {
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    padding: 0;
    background: #FAFAFA;
}

.model-banner__body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;

    @media screen and (max-width: 900px) {
        display: flex;
        flex-direction: column-reverse;
        gap: 0;
    }

    .model-banner__image {
        margin-right: -200px;
        max-height: 550px;

        @media screen and (max-width: 900px) {
            margin-right: -20px;
            margin-left: -20px;
            max-height: fit-content;
            ;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .model-banner__text {
        width: 100%;
        padding: 40px 0;
        display: flex;
        flex-direction: column;
        gap: 30px;

        @media screen and (max-width: 900px) {
            padding: 20px 0;
        }

        .model-banner__title {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: start;

            span {
                font-size: 34px;
                line-height: normal;

                @media screen and (max-width: 1200px) {
                    font-size: var(--extra-big-size);
                }

                @media screen and (max-width: 900px) {
                    font-size: var(--big-size);
                }
            }

            .model-banner__title-img {
                height: 80px;
                width: auto;
                object-fit: contain;

                @media screen and (max-width: 900px) {
                    height: 40px;
                }
            }
        }
    }
}
</style>