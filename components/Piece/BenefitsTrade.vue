<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()
</script>

<template>
    <div class="benefits">
        <div class="benefits__header">
            <BaseTitle title="Преимущества по кредиту" />
        </div>

        <div class="benefits__body">
            <div class="benefits__list">
                <div class="benefit b1">
                    <div class="benefit__text">
                        <div class="benefit-title">Выгода до 250 000 ₽</div>
                        <div class="benefit-subitle">Надежная гарантия от
                            салона</div>
                    </div>
                    <div class="benefit__img">
                        <img src="/images/benefit1.png" alt="Выгода до 250 000 ₽">
                    </div>
                </div>
                <div class="benefit b2">
                    <div class="benefit__text">
                        <div class="benefit-title">Оцениваем по рынку</div>
                        <div class="benefit-subitle">В отличие от других мы не занижаем</div>
                    </div>
                    <div class="benefit__img">
                        <img src="/images/benefit2.png" alt="Оцениваем по рынку">
                    </div>
                </div>
                <div class="benefit b3">
                    <div class="benefit__text">
                        <div class="benefit-title">Trade-In как взнос</div>
                        <div class="benefit-subitle">Это поможет Вам купить авто дешевле</div>
                    </div>
                    <div class="benefit__img">
                        <img src="/images/benefit3.png" alt="Trade-In как взнос">
                    </div>
                </div>
                <div class="benefit b4">
                    <div class="benefit__text">
                        <div class="benefit-title">По 2 документам</div>
                        <div class="benefit-subitle">Быстрое оформление без долгого ожидания</div>
                    </div>
                    <div class="benefit__img">
                        <img src="/images/benefit4.png" alt="По 2 документам">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.benefits {
    padding: 20px 0;
}

.benefits__list {
    display: grid;
    grid-template-columns: auto auto;
    gap: 15px;
    align-items: center;
    justify-content: start;


    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }

    .benefit {
        gap: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: center;
        align-items: center;
        background: #E9F6EB;
        padding: 15px;
        border-radius: 15px;
        position: relative;
        overflow: hidden;
        gap: 15px;


        .benefit__text {
            display: flex;
            flex-direction: column;
            gap: 5px;

            .benefit-title {
                font-size: var(--small-size);
                color: var(--main-color);
                font-weight: bold;
            }

            .benefit-subitle {
                font-size: 10px;
                color: var(--main-color);
            }
        }

        .benefit__img {
            height: 100%;
            display: flex;
            justify-content: end;
            align-items: center;

            img {
                z-index: 10;
                position: relative;
            }

            &::after {
                content: "";
                background: #D3ECD8;
                position: absolute;
                width: 90px;
                height: 100px;
                right: -20px;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 100%;
            }
        }
    }

    .b2 {
        background: #EDE7FF;

        .benefit__img {
            &::after {
                background: #D8D3EC;
            }
        }
    }

    .b3 {
        background: #FED0D0;

        .benefit__img {
            &::after {
                background: #FBA4A4;
            }
        }
    }

    .b4 {
        background: #D3DAFF;

        .benefit__img {
            &::after {
                background: #B8C1EE;
            }
        }
    }
}
</style>