<script setup>
import { ref, onMounted } from 'vue';
const menuList = ref([

    {
        name: 'Автокредит',
        link: '/credit',
    },
    {
        name: 'Trade-in',
        link: '/trade',
    },
    {
        name: 'Выкуп',
        link: '/redemption',
    },
    {
        name: 'Госпрограммы',
        link: '/goscredit',
    },
    {
        name: 'Рассрочка',
        link: '/installment',
    },
    {
        name: 'Услуги',
        link: '/services',
    },
    {
        name: 'Контакты',
        link: '/contact',
    },
])
const menuCarsList = ref([

    {
        name: 'Все авто',
        link: '/cars',
    },
    {
        name: 'Китайские авто',
        link: '/cars/china',
    },
    {
        name: 'Авто для такси',
        link: '/taxi',
    },
])

const carBurger = ref(false)



</script>

<template>
  <div class="navbar-container">
    <div class="navbar-inner">
        <div class="navbar-logo">
            <BaseLogo />
            <p class="navbar-subtitle">Новые автомобили в Москве</p>
        </div>
        <ul class="navbar-list">
            <li class="navbar-item cars">
            <p class="navbar-item navbar-link" @click="carBurger = !carBurger">Автомобили</p>
            <ul class="navbar-list__cars" :class="{ 'active': carBurger }" @mouseenter="carBurger = true" @mouseleave="carBurger = false">
                <li v-for="item in menuCarsList">
                    <NuxtLink :to="item.link" class="navbar-link__cars">{{ item.name }}</NuxtLink>
                </li>
            </ul>
            </li>
            <li class="navbar-item" v-for="item in menuList">
                <NuxtLink :to="item.link" class="navbar-link">{{ item.name }}</NuxtLink>
            </li>
        </ul>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.navbar-container {
    
  background: white; // 🔲 Фон — белый
  padding: 10px 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px -4px rgba(0, 0, 0, 0.2);
  

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 30px;

    @media screen and (max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
      
    }
  }

  .navbar-logo {
    display: flex;
    flex-direction: row; 
    align-items: center; 
    gap: 10px; 
    @media screen and (max-width: 570px) {
        flex-direction: column;
        align-items: flex-start; // выравнивание по левому краю
        gap: 4px; // немного меньше отступа
    }

    .navbar-subtitle {
        font-size: 14px;
        color: #444;
        margin-top: 0;

        @media (min-width: 768px) {
        display: none;
        }
        @media (max-width: 767px) {
        display: block;
        }
        @media screen and (max-width: 570px){
            font-size: 10px;
        }
    }
}




  
}
.navbar-list {
    display: flex;
    // justify-content: end;
    // align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    @media screen and (max-width: 767px) {
        display: none; // ⛔️ Скрыть список меню на экранах до 767px
    }
    

    .navbar-item {
        .navbar-link {
            font-size: var(--standart-size);
            padding: 10px 0;
            color: black;

            // @media screen and (max-width: 1500px) {
            //     padding: 5px 8px;
            // }

            @media screen and (max-width: 767px) {
                color: black;
            }

            @media screen and (max-width: 400px) {
                font-size: var(--big-size);
            }
        }

        // &:hover .navbar-link {
        //     border-bottom:1px solid black ;

        //     @media screen and (max-width:767px) {
        //         &:first-child{
        //             border: none;
        //         }
        //     }
        // }

        // .router-link-active,
        // .navbar-link:hover {
        //     transition: 0.3s;
        //     color: white;
        // }
    }

    .cars {

        @media screen and (max-width:767px) {
            border-bottom: 1px solid black;
        }

        @media screen and (min-width:767px) {
            &:hover {
                .navbar-list__cars {
                    display: block;
                    position: absolute;
                    z-index: 100;
                    opacity: 1;
                    background: #7e7e7ede;
                    width: -webkit-max-content;
                    width: -moz-max-content;
                    width: max-content;
                    transition: all 0.3s;
                    box-shadow: 0 1px 11px 0 #414e5b33;
                    color: white;

                    li {
                        background: transparent;
                    }

                    .navbar-link__cars {
                        padding: 15px;
                        border-bottom: 1px solid #f7f7f7;


                        @media screen and (max-width:767px) {
                            border: none;
                            background: transparent;
                        }
                    }
                }
            }
        }


    }

    .navbar-list__cars {
        display: none;
    }

    .navbar-list__cars.active {

        // position: absolute;
        // background: rgba(126, 126, 126, 0.87);
        // width: -webkit-max-content;
        // width: -moz-max-content;
        // width: max-content;
        // transition: all 0.3s;
        // box-shadow: 0 1px 11px 0 #414e5b33;

        @media screen and (max-width:767px) {
            display: block;
            position: static;
            background: transparent;
            color: black;
            font-size: 14px;
            box-shadow: none;
            width: 100%;
        }

        .navbar-link__cars {
            padding: 15px;
            border-bottom: 1px solid #f7f7f7;


            @media screen and (max-width:767px) {
                border: none;
                background: transparent;
            }
        }
    }

}

.footer__menu {
    .navbar-list {
        flex-direction: column;
        align-items: start;
        justify-content: start;

        .navbar-link {
            padding: 3px 0;

            &:hover {
                color: var(--main-color);
                background: none;
            }
        }

        a.router-link-active.router-link-exact-active.navbar-link {
            background: none;
            color: var(--main-color);
        }
    }

    @media screen and (max-width: 400px) {
        .navbar-list {
            flex-direction: row;

            .navbar-link {
                padding: 8px;
                background: #F3F3F3;
                font-size: var(--standart-size);

                &:hover {
                    color: var(--main-color);
                    background: none;
                }
            }

            a.router-link-active.router-link-exact-active.navbar-link {
                background: var(--main-color);
                color: white;
            }
        }
    }
}

.navbar-list.burger {
    flex-direction: column;
    align-items: start;
    gap: 5px;

    .navbar-item {
        .navbar-link {
            color: black;
            padding: 10px
        }
    }
}

.black {
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    -ms-flex-align: start;
    align-items: flex-start;
    gap: 20px;
    padding: 15px 0;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    text-decoration: underline;

    a {
        color: #454546 !important;
    }
}
</style>