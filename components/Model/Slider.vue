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
        <!-- <div class="special__slider container" v-if="props.images.length">
        <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide" :mouseDrag="false"
            :breakpoints="breakpoints" snapAlign="start">
            <Slide v-for="(slide, index) in props.images" :key="index">
                <div class="carousel__item">
                    <div class="slide">
                        <a data-fancybox="gallery" :href="`${slide.url}`">
                            <img :src="`${slide.url}`" alt="car">
                        </a>
                    </div>
                </div>
            </Slide>
            <template #addons>
                <Navigation class="carousel__navigation" />
                <Pagination class="carousel__pagination" />
            </template>
        </Carousel>

        <div class="carousel__pages">{{ currentSlide + 1 }} / {{ props.images.length }}</div>
    </div>

    <div class="special__slider model" v-else>
        <Carousel id="gallery" :wrap-around="false" v-model="currentSlide" :mouseDrag="false" :breakpoints="breakpoints"
            snapAlign="start">
            <Slide v-for="(slide, index) in 10" :key="index">
                <div class="carousel__item">
                    <div class="slide">
                        <a data-fancybox="gallery" :href="`/public/images/test-slide3.jpg`">
                            <img src="/public/images/test-slide3.jpg" alt="car">
                        </a>
                    </div>
                </div>
            </Slide>
            <template #addons>
                <Navigation class="carousel__navigation" />
                <Pagination class="carousel__pagination" />
            </template>
        </Carousel>


        <div class="carousel__pages">{{ currentSlide + 1 }} / {{ 10 }}</div>
    </div> -->
    <div class="container">
        <div class="foto__gallery">
            <a
                class="foto__item"
                data-fancybox="images"
                data-caption
                v-for="item in props.images"
            >
                <img :src="`${item.url}`"
                    :alt="`${$route.params.brandId} ${$route.params.modelId}`"
                        width="300"
                        height="150"
                        data-fancybox="gallery"
                    />
            </a>
        </div>
        
    </div>
    
</template>

<style scoped lang="scss">
// .carousel__pages {
//     display: none;
//     justify-content: center;
//     align-items: center;
//     position: absolute;
//     bottom: 15px;
//     left: 50%;
//     transform: translateX(-50%);
//     background: #3b3b3bc4;
//     padding: 4px 8px;
//     color: white;
//     border-radius: 15px;
//     font-size: var(--standart-size);

//     @media screen and (max-width: 1150px) {
//         display: flex;
//     }
// }

// .carousel__pagination {
//     flex-wrap: wrap;
// }

// .carousel {

//     .carousel__prev,
//     .carousel__next {
//         background: white;
//         margin: 0;
//         padding: 5px 5px;

//         svg {
//             color: var(--main-color);
//         }
//     }

//     .carousel__prev {
//         border-radius: 100%;
//         left: 20px;
//     }

//     .carousel__next {
//         border-radius: 100%;
//         right: 20px;
//     }
// }

// .special__slider {
//     .thumbnails li {
//         margin: 10px;
//     }

//     @media screen and (max-width: 1150px) {
//         position: relative;
//         display: block;
//     }

//     .carousel__custom-thumbnails {
//         transition: transform 0.3s ease-in-out;

//         @media screen and (max-width: 1150px) {
//             display: none;
//         }
//     }

//     .carousel__item {
//         cursor: pointer;
//         list-style: none;
//         padding: 0;
//         margin: 0;
//     //    border-radius: var(--border-small-radius);
//         overflow: hidden;

//         img {
//             width: 100%;
//             height: 100%;
//             object-fit: contain;
//         }
//     }
// }

.foto__gallery{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-line-pack: center;
    align-content: center;
    -ms-flex-align: center;
    align-items: center;

    .foto__item {
        display: block;
        width: 280px;
        height: 150px;
        padding: 5px;
        -ms-flex-positive: 1;
        flex-grow: 1;
        -ms-flex-negative: 1;
        flex-shrink: 1;
        -ms-flex-preferred-size: 25%;
        flex-basis: 25%;

        @media screen and (max-width:1000px) {
            -ms-flex-positive: 1;
            flex-grow: 1;
            -ms-flex-negative: 1;
            flex-shrink: 1;
            -ms-flex-preferred-size: auto;
            flex-basis: auto;
        }
        @media screen and (max-width:767px) {
            flex-basis: 50%;
        }
        @media screen and (max-width:570px) {
            flex-basis: auto;
        }
        // @media screen and (max-width:570px) {
        //     height: 200px;
        // }
    
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    
    }
}

}


</style>