<script setup>
const currentSlide = ref(0)
const props = defineProps(['images'])
const breakpoints = {
    0: {
        itemsToShow: 1,
    },
    1150: {
        itemsToShow: 1,
    },
}

function slideTo(index) {
    currentSlide.value = index
}

</script>

<template>
    <div class="special__slider" v-if="props.images.length">
        <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide" :mouseDrag="false"
            :breakpoints="breakpoints">
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
                <Pagination/>
                <Navigation />
            </template>
        </Carousel>
    </div>
    <div v-else class="special__slider">
        <img src="/assets/img/no_image.webp" alt="car" style="width: 100%;">
    </div>
</template>

<style scoped lang="scss">
.thumbnails li {
    margin: 10px;
}

.carousel__item {
    width: 100%;
   max-height: 450px;
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