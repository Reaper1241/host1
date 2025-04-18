<script setup>
import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue'


const props = defineProps(['item'])

const breakpoints = {
    0: {
        itemsToShow: 1.1,
        snapAlign: "start"

    },
    571: {
        itemsToShow: 2,
        snapAlign: "start"
    },
    767: {
        itemsToShow: 3,
    },
    1000: {
        itemsToShow: 4,
        snapAlign: "start"
    },
    
}

function slideTo(index) {
    currentSlide.value = index
}

const isLargeScreen = ref(true)
const windowAvailable = ref(false)

// Простая реализация debounce функции
function debounce(fn, delay) {
  let timeoutId = null
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const handleResize = () => {
  if (windowAvailable.value) {
    isLargeScreen.value = window.innerWidth <= 1000
  }
}

const debouncedHandleResize = debounce(handleResize, 100)

onMounted(() => {
  windowAvailable.value = typeof window !== 'undefined'
  if (windowAvailable.value) {
    handleResize()
    window.addEventListener('resize', debouncedHandleResize)
  }
})

onUnmounted(() => {
  if (windowAvailable.value) {
    window.removeEventListener('resize', debouncedHandleResize)
  }
})

// Реактивное отслеживание изменения доступности window
watchEffect(() => {
  if (windowAvailable.value) {
    handleResize()
  }
})
</script>



<template>
<ClientOnly>
    <Carousel id="gallery" :breakpoints="breakpoints" :wrap-around="isLargeScreen"  :mouseDrag="false">
            <Slide v-for="slide in item" :key="slide.id">
              <li class="promo__item item">
                <NuxtLink class="promo__link" :to="slide.link">
                  <div class="promo__row">
                    <div class="promo__icon">
                      <component :is="slide.image" />
                    </div>
                    <div class="promo__text">{{ slide.title }}</div>
                  </div>
                </NuxtLink>
              </li>
            </Slide>


            <template #addons class="addons">
                <!-- <Pagination /> -->
                <Navigation />
            </template>

        </Carousel>
   
     </ClientOnly>
    <!-- <li class="promo__item item">
        <a class="promo__link" href="/">
            <div class="promo__icon" >
              <img :src="item.image" :alt="item.title">
            </div>
            <div class="promo__text">{{item.title}}</div>
        </a>
    </li> -->

</template>

<style lang="scss" scoped>

.promo__item {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 8px;
    list-style: none;
    max-width: 287px;
    width: 287px;
    height: 104px;
    box-shadow: 0 2px 8px rgba(0, 0.1, 0, 0.1); // 🌟 тень
    transition: box-shadow 0.3s ease;
    margin: 10px 10px 10px 0;
    &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    @media screen and (max-width: 570px) {
      width: 100%;
      max-width: 100%;
    }
}
.promo__row {
  display: flex;
  align-items: center;
  gap: 60px;

  @media screen and (max-width: 570px) {
    gap: 8px;
  }
}
.promo__item .promo__link {
  // display: block;
  padding: 15px;
  color: var(--color-c);
  position: relative;
  text-align: left;
  @media screen and (max-width: 570px) {
      padding: 15px 35px;
    }
}

// .promo__item .promo__link:after {
//   content: "подробнее \2192";
//   display: block;
//   position: absolute;
//   top: 15px;
//   right: 15px;
// }

.promo__item .promo__text {
  font-size: 16px;
  font-weight: 600;
}

.promo__item .promo__icon {
  margin-bottom: 5px;
}

.promo__item .promo__icon svg {
  display: block;
  width: auto;
  height: 50px;
  fill: var(--color-c);
}
.promo__icon svg {
  width: 40px;
  height: auto;
  fill: var(--main-color); // или другой подходящий цвет
}


</style>