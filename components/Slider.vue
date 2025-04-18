<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const currentSlide = ref(0)

const sliders = ref([
    {
        id: 1,
        title: `РАСПРОДАЖА`,
        image: 'images/slider/slider-new1.png',
        imageMobile: 'images/slider/new_year-host_mob2.jpg',
        subtitle: 'остатков 2024 г.',
        link: '/cars',
    },
    // {
    //     id: 1,
    //     title: `Новые автомобили<br>KAIYI <span>в наличии</span>`,
    //     image: 'images/slider/new_year_hostauto.png',
    //     imageMobile: 'images/slider/new_year_hostauto_mobile.png',
    //     subtitle: 'Уникальное предложение',
    //     link: '/credit',
    // },
    {
        id: 2,
        title: `АВТОКРЕДИТ ОТ 4,9%.`,
        image: 'images/slider/slider-new2.png',
        imageMobile: 'images/slider/credit-host_mob.png',
        subtitle: 'Дополнительная скидка<br> до 300 000 ₽.',
        link: '/credit',
    },
    {
        id: 3,
        title: `СКИДКА 10%`,
        image: 'images/slider/slider-new3.png',
        imageMobile: 'images/slider/sale-host_mob.png',
        subtitle: 'По госпрограмме',
        link: '/goscredit',
    },
    {
        id: 4,
        title: `TRADE-IN`,
        image: 'images/slider/slider-new4.png',
        imageMobile: 'images/slider/trade-host_mob.png',
        subtitle: 'с дополнительной выгодой<br> до 250 000 ₽',
        link: '/trade',
    },
    {
        id: 5,
        title: `HYUNDAI SOLARIS<br> <span>от 899 000 ₽</span>`,
        image: 'images/slider/slider-new5.png',
        imageMobile: 'images/slider/solaris-host_mob.png',
        subtitle: '<ul><li>100 л.с.</li> <li>разгон 12.9 сек</li> <li>расход 6.4 л.</li></ul>',
        link: '/cars/hyundai/solaris',
    },
    {
        id: 6,
        title: `GEELY COOLRAY NEW<br> <span>от 1 115 000 ₽</span>`,
        image: 'images/slider/slider-new6.png',
        imageMobile: 'images/slider/coolray-host_mob.png',
        subtitle: '<ul><li>100 л.с.</li> <li>разгон 12.2 сек.</li> <li>расход 5.7 л/100км.</li></ul>',
        link: '/cars/geely/coolray_new',
    },
])

let autoplayInterval = null

onMounted(() => {
  autoplayInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % sliders.value.length
  }, 5000) // 3 секунды
})

onBeforeUnmount(() => {
  clearInterval(autoplayInterval)
})

const carouselRef = ref()

function prevSlide() {
  carouselRef.value?.prev()
}

function nextSlide() {
  carouselRef.value?.next()
}
</script>

<template>
    <section class="slider section" id="home-slider">
        <div class="slider-wrapper">
            <button class="custom-arrow prev" @click="prevSlide">
                <img src="/Component 68.jpg" alt="Назад" />
            </button>
            <Carousel 
                id="gallery" 
                :items-to-show="1" 
                :wrap-around="true" 
                v-model="currentSlide" 
                :mouseDrag="true"
                ref="carouselRef"
            >
                <Slide v-for="slide in sliders" :key="slide.id">
                    <div class="carousel__item">
                        <div class="slide"> 
                            <NuxtLink :to="slide.link" class="slider__button-link">
                                <div class="slider__image">
                                    <img :src="`/${slide.image}`" :alt="`${slide.title}`" class="image" />
                                    <img :src="`/${slide.imageMobile}`" :alt="`${slide.title}`" class="image mobile" />
                                </div>
                                <div class="text__banner">
                                    <h2 v-html="slide.title"></h2>
                                    <p v-html="slide.subtitle"></p>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </Slide>


                <template #addons class="addons">
                    <Pagination />
                    <!-- <Navigation />   -->
                </template>
            </Carousel>
            <button class="custom-arrow next" @click="nextSlide">
                <img src="/Component 68.jpg" alt="Вперёд" />
            </button>
        </div>
        
    </section>
</template>

<style scoped lang="scss">
.section{
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0;
}
.slider-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1390px;
    padding: 0 10px;
    box-sizing: border-box;
    gap: 10px;
    @media screen and (max-width: 768px) {
        max-width: 100%;
        gap: 6px;
    }

    @media screen and (max-width: 500px) {
        padding: 0 20px;
    }
}   



.slider {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1260px; 
    margin: 0 auto;    
    position: relative;
    
    @media screen and (min-width: 768px) {
        padding-top: 0;
    }

        .slider__image {
            width: 100%;
            height: 100%;
            position: relative;
            margin: 0 auto;
            border-radius: 12px;
            overflow: hidden;
            &:before {
                background: linear-gradient(90deg, rgba(0, 0, 0, .55), rgba(0, 0, 0, .35) 29%, transparent 53%);
                bottom: 0;
                content: "";
                left: 0;
                pointer-events: none;
                position: absolute;
                right: 0;
                top: 0;
                z-index: 0;
                width: 100%;
                height: 100%;
                // @media screen and (max-width: 568px) {
                //     display: none;
                // }
            }
            @media screen and (max-width: 570px){
                border-radius: 0;
                overflow: visible;
                margin: 0;
            }
            .image {

                width: 100%;
                height: auto;
                object-fit: cover;
                border-radius: 12px;
                display: block;

                

                @media screen and (max-width: 568px) {
                    display: none;
                    border-radius: 0;
                }
            }

            .mobile {
                display: none;

                @media screen and (max-width: 568px) {
                    display: block;
                }
            }
        }

        @media screen and (max-width: 768px) {
            flex-direction: column-reverse;
            gap: 20px;
        }

        .slider__text {
            position: absolute;
            top: 50%;
            left: 0;
            background: white;
            transform: translateY(-50%);
            border-top-right-radius: 15px;
            border-bottom-right-radius: 15px;
            padding: 35px 35px 35px 100px;
            overflow: hidden;
            font-size: var(--big-size);
            text-align: start;
            max-width: 500px;

            display: flex;
            flex-direction: column;
            gap: 30px;
            align-items: start;

            @media screen and (min-width: 768px) {
                box-shadow: var(--box-shadow);
            }

            @media screen and (max-width: 768px) {
                position: relative;
                top: auto;
                left: auto;
                transform: none;
                padding: 0 20px;
                max-width: none;
                gap: 15px;
            }

            .slider__subtitle {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;

                img {
                    width: 150px;
                }

                @media screen and (max-width: 768px) {
                    display: none;
                }
            }

            .slider__button {
                @media screen and (max-width: 768px) {
                    width: 100%;
                }

                .slider__button-link {
                    padding: 20px 30px;
                    border-radius: 30px;
                    background: var(--linear-button);
                    color: white;
                    text-align: center;

                    @media screen and (max-width: 768px) {
                        width: 100%;
                    }
                }
            }
        }

        .slider__left {
            @media (max-width: 768px) {
                margin: 0 20px;
            }

            .slider__title {
                font-size: 36px;
                line-height: normal;
                text-transform: uppercase;
                font-weight: 900;
                color: var(--main-black);
                margin-top: 20px;

                @media screen and (max-width: 540px) {
                    font-size: 26px;
                }

                @media screen and (max-width: 350px) {
                    font-size: 22px;
                }
            }

            .slider__subtitle {
                font-size: var(--medium-size);
                line-height: normal;

                @media screen and (max-width: 768px) {
                    display: none;
                }
            }

            .slider__list {
                padding: 30px 0;

                .slider__item {
                    font-size: var(--medium-size);
                    padding: 5px 0;

                    @media screen and (max-width: 540px) {
                        font-size: var(--standart-size);
                    }

                    &:before {
                        content: '';
                        display: inline-block;
                        width: 15px;
                        height: 15px;
                        background-image: url('/assets/svg/good.svg');
                        background-repeat: no-repeat;
                        background-position: center;
                        margin-right: 10px;
                    }
                }
            }
        }

        .slider__right {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;

            @media screen and (max-width: 1000px) {
                flex-direction: column-reverse;
            }

            .slider__right-image {
                display: flex;
                justify-content: center;
                width: 100%;

                img {
                    object-fit: сontain;
                }
            }

            .slider__right-form {
                background: transparent;
                display: flex;
                align-items: center;
                justify-content: end;

                .form__title {
                    display: none;

                    @media screen and (max-width: 1000px) {
                        font-weight: normal;
                        display: block;
                        font-size: 18px;
                    }
                }

                @media screen and (max-width: 1000px) {
                    margin-top: 0;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }

                @media screen and (max-width: 800px) {
                    margin-top: 0;
                }
            }
        }
    
}
.custom-arrow {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    padding: 0;
    z-index: 10;
    cursor: pointer;
    @media screen and (max-width: 570px) {
        display: none;
    }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;


  }

  &.prev {
    left: -60px;

    img {
      transform: rotate(180deg);           // ✅ Поворачиваем только изображение
      transform-origin: center center;
    }

    @media screen and (max-width: 768px) {
      left: -30px;
    }
  }

  &.next {
    right: -60px;

    @media screen and (max-width: 768px) {
      right: -30px;
    }
  }
}
.carousel__item {
  width: 100%;
  padding: 0;
  margin: 0;
  .slide {
    width: 100%;
    margin: 0;
    padding: 0;
    a.slider__button-link {
      width: 100%;

      .slider__image.image {
        object-fit: cover;
      }
    }
  }
}
.carousel__pagination {
    position: relative;
    z-index: 10;
    margin: -15px 0 0;
    @media screen and (max-width:570px) {
        display: none;
    }
}

.carousel__viewport {
  overflow: hidden; // ⛔️ скроет обрезки других слайдов
}

.text__banner{
    position: absolute;
    top: 10%;
    left: 4%;
    text-align: left;
    color: #fff;
    @media screen and (max-width:568px){
        // background: #0000002e;
        // padding: 7px;
        // border-radius: 7px;
        // bottom: 15%;
        // top: auto;

    }
    h2{
        font-weight: 700;
        font-size: 50px;
        @media screen and (max-width:1200px) {
            font-size: 30px;
        }
        @media screen and (max-width:900px) {
            font-size: 20px;
        }
        :deep(span){
            font-size: 40px;
            font-weight: 600;
            @media screen and (max-width:1200px) {
                font-size: 24px;
            }
            @media screen and (max-width:900px) {
                font-size: 18px;
            }
        }
    }
    p{
        background: transparent;
        font-size: 26px;
        font-weight: 600;
        margin-bottom: 10px;
        @media screen and (max-width:900px) {
            font-size: 16px;
        }
        @media screen and (max-width:570px) {
            font-size: 14px;
        }
    }

    :deep(ul){
        list-style: disc;
        margin-left: 10px;
        margin-top: 20px;
        @media screen and (max-width:710px) {
            margin-top: 10px;
        }
        @media screen and (max-width:660px) {
            margin-top: 5px;
        }
    }

    :deep(li){
        background: transparent;
        font-size: 26px;
        font-weight: 400;
        margin-bottom: 10px;
        margin-left: 20px;
        @media screen and (max-width:900px) {
            font-size: 16px;
            margin-bottom: 5px;
        }
        
        @media screen and (max-width:570px) {
            font-size: 14px;
        }
    }
}

</style>