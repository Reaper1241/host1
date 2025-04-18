<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();
const isOpen = ref(false)


let showBurger = ref(false);
function toggleBurger() {
    showBurger.value = !showBurger.value
    if (showBurger.value) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}
let showBrands = ref(false)

function toggleBrands() {
    showBrands.value = !showBrands.value
    if (showBrands.value) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}

function modalShow() {
    isOpen.value = !isOpen.value
    appStore.modalShown = !appStore.modalShown
}

const windowWidth = ref(1024)

onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})

watch($route, () => showBurger.value = false)
watch($route, () => showBrands.value = false)

const app_type= 6
const modal_title="Оставьте заявку и мы перезвоним Вам в течение 30 минут!"
</script>

<template>
    <header class="header">
      <div class="header__logo">
        <div class="container">
          <div class="header__all">
            <div class="header__address-phone">
              <template v-if="windowWidth >= 768">
                <a class="header__address" href="/contact/">
                  <img src="/public/icons/icon-point.svg" alt="" />
                  <p>{{ appStore.address }}</p>
                </a>
                <a
                  class="header__address phone"
                  @click="modalShow(), car ? yandexEcommerce('add', car) : null"
                >
                  <img src="/public/icons/icon-phone.svg" class="phone" alt="" />
                  <p class="number__phone">{{ appStore.phone }}</p>
                </a>
              </template>
  
              <!-- ✅ выводим flex-блок с кнопкой и иконками ТОЛЬКО на мобилке -->
              <template v-else>
                <div class="mob container">
                  <div class="flex">
                    <div class="brands">
                      <SvgCar @click="toggleBrands(); showBurger = false" />
                    </div>
                    <a class="phone__mob" :href="`tel:+${appStore.clearPhone}`">
                      <SvgPhone class="phone__svg" />
                    </a>
                    <BaseButtonModal
                      :btn-label="`Заказать звонок`"
                      :app-type="1"
                      :modal-title="modal_title"
                    />
                  </div>
  
                  <div
                    class="header__menu mobile-menu"
                    @click="toggleBurger(); showBrands = false"
                    :class="{ active: showBurger }"
                  >
                    <i class="fa-solid fa-bars"></i>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Боковые меню -->
      <Teleport to="body">
        <div
          class="mobile-menu__overlay"
          :class="{ active: showBurger, scrolled2: isScrolled }"
        >
          <div class="mobile-menu__overlay-content">
            <PieceNavbar class="burger" />
          </div>
        </div>
      </Teleport>
  
      <Teleport to="body">
        <div
          class="mobile-menu__overlay"
          :class="{ active: showBrands, scrolled2: isScrolled }"
        >
          <BrandsChoice class="mob" />
        </div>
      </Teleport>
  
      <Teleport to="body">
        <div v-if="isOpen">
          <BaseModalNew
            :modalTitle="modal_title"
            :appType="app_type"
            :car="car"
            @closeModal="modalShow()"
            class="taxi"
          />
        </div>
      </Teleport>
    </header>
  
    <!-- Навигация -->
    <div class="header__wrap" :class="{ scrolled: isScrolled }">
      <nav class="header__navbar container">
        <PieceNavbar />
      </nav>
    </div>
</template>
  
<style scoped lang="scss">
.header {
    position: sticky;
    top: 0;
    z-index: 11;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    transition: all 0.4s ease;
    background: transparent;
    color: white;
    width: 100%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    
    @media screen and (max-width:767px) {
        position: relative;
    }
    .header__top-bar {
        @media screen and (min-width: 768px) {
            display: none !important;
        }
    }
    

    .header__logo {
        background: #D2122B;
        height: 42px;
        display: flex;
        align-items: center;
        @media screen and (max-width:767px) {
            .container {
                width: 100%;
            }
        }
        @media screen and (max-width:767px) {

            height: 74px !important; 
        }

    }
    .header__address-phone {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-left: auto;
        color: white;

        .header__address {
            display: flex;
            align-items: center;
            color: white;

            img {
                height: 16px;
                margin: 0 5px;
                filter: brightness(0) invert(1);
            }
        }
    }


    // @media screen and (max-width: 1000px) {
    //     padding: 0;
    // }
    .header__all {
        display: flex;
        justify-content: flex-end; // ⬅️ вся информация справа
        align-items: center;
        height: 100%;
        padding-right: 20px;
        @media screen and (max-width:570px) {
            display: block;
        }

        // .mob__text{
        //     display: none;
        //     font-size: 12px;
        //     color: black;
        //     @media screen and (max-width:570px) {
        //         display: block;
        //     }
        // }

        .header__address-phone {
            display: flex;
            align-items: center;
            gap: 20px;
            color: white;
            margin-left: auto; // ✅ прижимаем весь блок вправо

            .header__address {
                display: flex;
                align-items: center;
                color: white;
                width: max-content;
                line-height: 16px;
                @media screen and (max-width:570px) {
                    display: none;
                }
                .phone {
                    @media screen and (max-width:767px) {
                        display: none;
                    }
                }

                img {
                    height: 16px;
                    margin: 0 5px;
                    filter: brightness(0) invert(1);
                }
            }
            .phone {
                    @media screen and (max-width:767px) {
                        display: none;
                    }
                }
        }
    }


    .header__menu.mobile-menu {
        display: none;

        @media screen and (max-width: 767px) {
            display: block;
            font-size: 32px;
            padding: 5px;
        }
    }
}
.mobile-call-button {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 14px;
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
    fill: white;
  }

  .divider {
    height: 20px;
    width: 1px;
    background-color: white;
    opacity: 0.6;
  }

  .label {
    white-space: nowrap;
  }
}
.mobile-menu__overlay {
    position: fixed;
    top: 105px;
    width: 100%;
    min-height: 100vh;
    background: rgba(255, 255, 255, 0.9);
    z-index: 100;
    overflow: scroll;
    flex-direction: column;
    align-items: start;
    display: flex;
    transform: translateX(-100%);
    transition: 0.5s;


    .mobile-menu__overlay-content {
        width: 100%;
        overflow-y: auto;
        padding: 20px;
        background: transparent;
        color: black;
    }
}

.mobile-menu__overlay.scrolled2 {
    @media screen and (max-width:767px) {
        top: 60px;
    }

    @media screen and (max-width:570px) {
        top: 58px;
    }
}

.mobile-menu__overlay.active {
    transform: translateX(0);

}


.mobile-menu {
    display: none;
    transition: 0.3s;
    background: transparent;
    color: white;

    @media screen and (max-width: 767px) {
        display: block;
        font-size: 32px;
        padding: 10px;
    }
}

.mobile-menu.active {
    transform: rotate(90deg);
}

.header.active {
    -webkit-box-shadow: 0 6px 6px rgb(0 0 0 / 20%);
    box-shadow: 0 6px 6px rgb(0 0 0 / 20%);
}

.modal__title {
    color: black;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(-100%);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateX(0);
    }

    to {
        opacity: 0;
        transform: translateX(-100%);
    }
}

.mob {
    padding: 0 10px;
    display: none;

    button {
        width: max-content;
    }

    @media screen and (max-width:767px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .flex {
        display: flex;
        width: max-content;
        align-items: center;
        column-gap: 15px;

        svg {
            fill: white;
        }

        .phone__mob {
            height: 100%;
            border-left: 1px solid white;
            border-right: 1px solid white;
            padding: 5px 10px;

            .phone__svg {
                width: 22px;
                height: auto;
            }
        }


    }

}

.base-button {
    background: transparent;
    width: max-content !important;
}

.number__phone {
    width: max-content;
}

.header__wrap {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  background: white;
  gap: 15px;
  position: relative;
  z-index: 101;

  @media screen and (max-width: 1000px) {
    border-radius: 0;
    padding: 5px 20px;
  }

  @media screen and (max-width: 767px) {
    padding: 0;
  }

  .header__navbar {
    padding: 0;

    @media screen and (max-width: 767px) {
      display: flex; // или block
      flex-direction: column; // для мобильной вёрстки
    }
  }
}

.scrolled {
    position: fixed;
    z-index: 11;
    width: 100%;
    height: auto;

    @media screen and (max-width: 767px) {
        top: 0;
    }

    @media screen and (max-width: 570px) {
        z-index: 110;

    }
}
@media screen and (max-width: 570px) {
  .mob {
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    .flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;

      svg {
        width: 22px;
        height: 22px;
        flex-shrink: 0;
      }

      .phone__mob {
        padding: 0 6px;
        border-left: 1px solid white;
        border-right: 1px solid white;
      }

      .base-button {
        flex-grow: 1;
        max-width: 160px;
        font-size: 13px;
        padding: 6px 8px;
        white-space: nowrap;
      }
    }

    .header__menu.mobile-menu {
      font-size: 28px;
    }
  }
}

</style>