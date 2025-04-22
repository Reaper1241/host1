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
    <section class="contact">
        <div class="container">
            <div class="contact__content">
                <div class="contact__map">
                    <div class="contact__map-wrapper">
                        <div class="contact__map-data">
                            <div class="contact__map-data-item">
                                <div class="item__icon"><i class="fa-solid fa-clock"></i></div>
                                <div class="item__text">
                                    <p>
                                        Часы работы:
                                    </p>
                                    <p>
                                        {{ appStore.workingHours }}
                                    </p>

                                </div>

                            </div>
                            <div class="contact__map-data-item">
                                <div class="item__icon"> <i class="fa-solid fa-phone"></i></div>
                                <div class="item__text">
                                    <p>
                                        Телефон:
                                    </p>
                                    <a @click="modalShow(), car ? yandexEcommerce('add', car) : null" class="phone__button">
                                        {{ appStore.phone }}
                                    </a>
                                    <a :href="`tel:+${appStore.clearPhone}`" class="mobile">
                                        {{ appStore.phone }}
                                    </a>
                                </div>
                            </div>
                            <div class="contact__map-data-item">
                                <div class="item__icon"><i class="fa-solid fa-location-dot"></i></div>
                                <div class="item__text">
                                    <p>
                                        Адрес:
                                    </p>
                                    <p>
                                        {{ appStore.address }}
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div class="contact__map-map">
                            <iframe :src="`${appStore.yandexMap}`" width="100%" height="400" frameborder="0"
                                title="yandex карта"></iframe>
                        </div>
                    </div>
                </div>
                <!-- <div class="contact__form">
                     <div class="contact__form-title">Остались вопросы?</div>
                    <div class="contact__form-subtitle">Оставьте заявку и наш специалист свяжется с вами</div> 
<FormContact /> 
                </div> -->
            </div>
        </div>
        <Teleport to="body">
        <div v-if="isOpen">
            <BaseModalNew :modalTitle="modal_title" :appType="app_type" :car="car" @closeModal="modalShow()" class="taxi"/>
        </div>
    </Teleport>
    </section>

</template>

<style scoped lang="scss">


.contact__map-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 30px;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
}


section.contact {
    padding-bottom: 40px;

    .contact__content {
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 30px;

        @media screen and (max-width: 1200px) {
            grid-template-columns: 1fr;
        }

        .contact__map {
            display: flex;
            flex-direction: column;
            .contact__map-map {
            flex: 1 1 70%;
            height: 400px;
            @media screen and (max-width: 1200px) {
                margin-bottom: 200px;
            }
            @media screen and (max-width: 1000px) {
                margin-bottom: 200px;
                min-height: 400px;
            }
            

            iframe {
                width: 230%;
                height: 100%;
                border: none;
                border-radius: 8px;
                @media screen and (max-width: 1200px) {
                    width: 100%;
                    height: 150%;
                }
            }
            
        }

            .contact__map-data {
                flex: 1 1 50%;
                padding: 30px 30px 30px 40px;
                border-left: 3px solid #d02029; // красный бордер
                display: flex;
                flex-direction: column;
                justify-content: center;

                @media screen and (max-width:1000px) {
                    display: block;
                    border-left: 3px solid #d02029; // красный бордер
                }

                .contact__map-data-item {
                    display: flex;
                    gap: 15px;
                    align-items: center;
                    margin-bottom: 20px;
                    font-size: 16px;

                }
            }
        }

        .contact__form {
            background: white;
            box-shadow: var(--box-shadow);

            padding: 30px;
            display: flex;
            flex-direction: column;
            border-radius: var(--border-radius);

            justify-content: center;

            @media screen and (max-width: 1200px) {
                max-width: 600px;
                align-self: center;
                justify-self: center;
            }


            .contact__form-title {
                text-align: center;
                font-weight: bold;
                font-size: 18px;
                line-height: normal;
            }

            .contact__form-subtitle {
                text-align: center;
                font-size: var(--standart-size);
                line-height: normal;
                padding: 5px 0 20px 0;
            }


        }
    }
}

.fa-solid {
    font-size: 35px;
}

.item__text {
    font-size: 14px;
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