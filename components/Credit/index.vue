<script setup>
/* Form Check */
const car = ref('');
function returnEmit(value) {
    car.value = value
}
/* Form Check */

import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

import { useCreditStore } from "/stores/CreditStore.js";
const creditStore = useCreditStore();

creditStore.carNew = null

let active = ref(false)

const banks = appStore.banks

</script>

<template>

    <section class="page section">
        <div class="container">
            <div class="page__content">
                <div class="page__form">
                    <div class="form__form" >
                        <ClientOnly>
                            <FormCredit @showCar="returnEmit"></FormCredit>
                        </ClientOnly>
                    </div>
                </div>
                <div class="page__text">
                    <PieceBenefitsCredit />
                    <div class="car__choice">
                        <div class="car-show" v-if="creditStore.carNew && creditStore.category == 'new'">
                            <div class="car-show__wrapper">
                                <div class="car-show__image">
                                    <img
                                        :src="`${creditStore.carNew.images[0]?.url ? creditStore.carNew.images[0].url : '/src/static/img/no_image.webp'}`">
                                </div>
                                <div class="car-show__content">
                                    <div class="car-show__title">
                                        {{ cleanUpTitle(creditStore.carNew.brand, creditStore.carNew.model,
                                            creditStore.carNew.modification, creditStore.carNew.complectation) }}
                                    </div>
                                    <div class="car-show__price">
                                        <div class="block">
                                            <span class="old">
                                                от {{ makeSpaces(creditStore.carNew.price) }} ₽
                                            </span>
                                            <span class="current">
                                                от
                                                {{ makeSpaces(creditStore.carNew.price - creditStore.carNew?.sale)
                                                }}
                                                ₽
                                            </span>
                                        </div>
                                        <!-- <span class="credit">
                                          
                                            от {{ creditStore.carNew.monthlyPayment }} ₽/мес.
                                        </span> -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </div> 
                    <PieceCreditText  :active="creditStore.carNew"/>
                    
                    <!-- <div class="page__text-content"
                        v-html="appStore?.usedSeo[$route.name]?.text_content ? removeTrash(appStore.usedSeo[$route.name].text_content) : null">
                    </div> -->
                </div>
                
            </div>
            <!-- <ul class="banks">
                <li v-for="bank in banks">
                    <img :src="bank.image"/>
                </li>
            </ul> -->
        </div>

        <Teleport to="body">
            <div v-show="creditStore.isOpen">
                <ModalCarChoiceNew :selectedCategory="creditStore.category" @closeModal="creditStore.modalShow()"
                    @choiceCar="choiceCar($event)" v-if="creditStore.category == 'new'" />

                <!-- <ModalCarChoiceUsed :selectedCategory="creditStore.category" @closeModal="creditStore.modalShow()"
                    @choiceCar="choiceCar($event)" v-if="creditStore.category == 'used'" /> -->
            </div>
        </Teleport>
    </section>

</template>

<style scoped lang="scss">
.form__form{
    border-radius: 8px;
}
.container{
    margin-bottom: 20px;
}
.car {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
    background: var(--light-grey);
    border-radius: var(--border-radius);
    overflow: hidden;
    .car__info {
        padding: 10px 20px;

        h2 {
            color: var(--main-black);
            font-size: 18px;
            text-align: center;
        }

        .car__list {
            margin-top: 20px;
            list-style: none;
            padding-left: 0;

            li {
                align-items: center;
                display: flex;
                justify-content: space-between;
            }
        }

        .car__sale {
            display: flex;
            justify-content: center;
            align-items: center;

            .car__sale-block {
                padding: 15px 20px;
                font-size: 18px;
                background: #36B555;
                border-radius: var(--border-radius);
                font-weight: bold;
                color: white;
            }
        }

        .car__price {
            margin: 10px 0;
            display: flex;
            gap: 5px;
            align-items: center;
            justify-content: center;

            @media screen and (max-width: 400px) {
                flex-direction: column;
            }

            .car__price-old {
                text-decoration: line-through;
            }

            .car__price-current {
                font-size: var(--big-size);
                font-weight: bold;

                span {
                    font-weight: inherit;
                    font-size: 26px;
                    color: var(--main-color);
                }
            }
        }
    }

    .car__img {
        display: flex;
        justify-content: center;

        img {
            max-width: 100%;
        }
    }
}

.car__choice {
    margin-bottom: 10px;
    .car-select {
        .car-select__wrapper {
            display: flex;
            flex-direction: column;
            gap: 15px;
            justify-content: center;
            align-items: center;

            padding: 50px 30px;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);

            cursor: pointer;
            transition: 0.3s;

            &:hover {
                opacity: 0.7;
                transition: 0.3s;
            }

            .car-select__title {
                text-align: center;
            }

            .car-select__image {
                img {
                    filter: grayscale(100%);
                }
            }
        }
    }

    .car-show {
        .car-show__wrapper {
            display: grid;
            grid-template-columns: 2fr 3fr;
            gap: 10px;
            overflow: hidden;
        //    border-radius: var(--border-small-radius);
            box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            border-radius: 8px;
            background: white;
            @media screen and (max-width: 768px) {
                grid-template-columns: 1fr;
            }

            .car-show__content {
                padding: 20px 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 10px;

                .car-show__title {
                    font-size: 18px;
                    font-weight: 600;
                }

                .car-show__price {
                    display: flex;
                    align-items: end;
                    gap: 15px;
                    flex-wrap: wrap;

                    @media screen and (max-width: 768px) {
                        gap: 5px;
                    }

                    .block {
                        display: flex;
                        flex-direction: column;
                    }

                    .old {
                        text-decoration: line-through;
                        color: var(--grey);
                    }

                    .current {
                        font-weight: bold;
                        font-size: 26px;
                        line-height: normal;
                        color: var(--color-c);
                    }

                    .credit {
                        color: var(--green);
                        font-size: var(--standart-size);
                        border: 1px solid var(--green);
                        padding: 5px;
                    //    border-radius: var(--border-small-radius);
                    }
                }
            }

            .car-show__image {
                padding: 30px;
                background: #f6f6f6;
                min-width: 250px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
        }
    }
}
.page{
    padding: 0;
    .container{
        @media screen and (max-width:767px) {
            padding: 0 10px;
        }
    }
}

.banks{
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        gap: 10px;
        margin-bottom: 10px;
        justify-content: space-between;

        li{
            width: 10%;

            @media screen and (max-width:767px) {
                width: 20%;
            }

            @media screen and (max-width:420px) {
                width: 30%;
            }

            img{
                width: 100%;
                height: 50px;
                object-fit: contain;
            }
        }
    }
</style>