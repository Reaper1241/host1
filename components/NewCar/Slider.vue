<script setup>

import  SvgStrelka  from '@/components/Svg/Strelka.vue';
const props = defineProps(['images'])
const breakpoints = {
    0: {
        itemsToShow: 1,
    },
    1150: {
        itemsToShow: 1,
    },
}
const carousel = ref(null)
function slideTo(index) {
    currentSlide.value = index
}

</script>

<template>
    <div class="special__slider" v-if="props.images.length">
        <Carousel  id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide" :mouseDrag="false"
            :breakpoints="breakpoints" ref="carousel">
            <Slide v-for="(slide, index) in props.images" :key="index">
                <div class="carousel__item">
                    <div class="slide">
                        <a data-fancybox="gallery" :href="`${slide.url}`">
                            <img :src="`${slide.url}`" alt="car" style="width: 100%;">
                        </a>
                    </div>
                </div>
            </Slide>

            <template #addons>
                <Pagination />
                <!-- кастомные кнопки -->
                <div class="custom-nav">
                    <button class="custom-nav__btn" @click="$refs.carousel.prev()">
                        <SvgStrelka class="custom-nav__arrow custom-nav__prev"/>
                    </button>
                    <button class="custom-nav__btn" @click="$refs.carousel.next()">
                        <SvgStrelka class="custom-nav__arrow custom-nav__next flipped"/>
                    </button>
                </div>
            </template>
        </Carousel>
    </div>
    <div v-else class="special__slider">
        <img src="/assets/img/no_image.webp" alt="car" style="width: 100%;">
    </div>
</template>

<style scoped lang="scss">
.custom-nav {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 45%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  padding: 0 30px;
  z-index: 100;
    
  @media screen and (max-width: 1000px) {
    padding: 0 40px;
  }

  @media screen and (max-width: 767px) {
    padding: 0 20px;
  }
}

.custom-nav__arrow {
  width: 36px;
  height: 36px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
    // transform: scale(1.1);
  }

  svg {
    width: 100%;
    height: 100%;
    display: block;
    fill: #000; // или можно использовать currentColor
  }
}
.custom-nav__prev{
    transform: scaleX(-1);
}

.custom-nav__next.flipped {
  transform: scaleX(1); // отзеркаливаем вторую стрелку
}



.carousel__item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    border-radius: 10px; 
}
.thumbnails li {
    margin: 10px;
}

.carousel__item {
    width: 100%;
    max-height: 450px;
    border-radius: 10px !important; /* Добавьте это */
    overflow: hidden; /* Это важно, чтобы скругление работало */
}

.special__slider {
    width: 100%;
    max-height: 500px;
    padding-bottom: 30px;
    gap: 10px;
    overflow: hidden;
    padding: 0;
    
    @media screen and (max-width: 1150px) {
        position: relative;
        display: block;
    }

    #thumbnails {
        @media screen and (min-width: 1150px) {
            display: none;
        }
    }

    .carousel__custom-thumbnails {
        position: relative;
        max-height: 500px;
        overflow: hidden;

        .carousel__custom-thumbnails-list {
            display: grid;
            gap: 10px;

            transition: transform 0.3s ease-in-out;

            @media screen and (max-width: 1150px) {
                display: none;
            }


            .carousel__item {
                cursor: pointer;
                list-style: none;
                padding: 0;
                margin: 0;
            //    border-radius: var(--border-small-radius);
                overflow: hidden;
                opacity: 0.5;
            }

            .carousel__item.active {
                opacity: 1;
            }
        }

        .carousel__custom-thumbnails-controls {
            position: absolute;
            top: -10px;

            .controls__prev {
                background: var(--main-color);
                width: 30px;
                height: 30px;
                border-radius: 100%;
                color: white;
            }
        }
    }
}

.carousel__pages {
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: #3b3b3bc4;
    padding: 4px 8px;
    color: white;
    border-radius: 15px;
    font-size: var(--standart-size);

    @media screen and (max-width: 1150px) {
        display: flex;
    }
}

.carousel__pagination {
    flex-wrap: wrap;
}
.carousel__navigation{
    width: 40%;
    height: 20px;
}


</style>