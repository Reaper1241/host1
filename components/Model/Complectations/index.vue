<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
import { dataSale } from '~/constants';
import Title from '~/components/Base/Title.vue';
const appStore = useAppStore();

const show = ref([])
const toggleDescription = (index) =>{
    show.value[index] = !show.value[index]
}
const modList = computed(() => newStore.model.modifications.filter((mod) => mod.car_complectations.length))
const tradeSwitch = ref(true)
const creditSwitch = ref(true)
const salonSwitch = ref(true)

const currentModel = computed(() => newStore.model)

const tradeSale = computed(() => currentModel.value.sale * appStore.tradeCalcPercent)
const creditSale = computed(() => currentModel.value.sale * appStore.creditCalcPercent)
const salonSale = computed(() => currentModel.value.sale * appStore.salonCalcPercent)

const totalSale = computed(() => {
    let total = 0;
    if (tradeSwitch.value) total += tradeSale.value
    if (creditSwitch.value) total += creditSale.value
    if (salonSwitch.value) total += salonSale.value
    newStore.modelSale = total
    return total
})

const car = newStore.model 
console.log(car);


const isOpen = ref(false)

function modalShow() {
    isOpen.value = !isOpen.value
    appStore.modalShown = !appStore.modalShown
}

const content = ref()

const infoTrade = ref({title:`Выгодная программа Trade-In`, content:`<p>Условие акции: необходимо предоставить ПТС. </p>
    <p>Данная акция действует в отношении приобретения только новых автомобилей. Дополнительная скидка предоставляется
        только на те авто, на которые распространяется акция, при этом необходимо воспользоваться услугой
        автокредитования. </p>
    <p>Дополнительная скидка представляет собой снижение отпускной цены на машину в момент сделки. Эта акция ограничена
        только количеством автомобилей, находящихся в наличии и проходящих по ней. </p>
    <p>Наш автосалон имеет право отказать в предоставлении скидки участнику акции в том случае, если он не отвечает
        условиям акции. </p>
    <p>Также автосалон «Host-Auto» оставляет за собой право регулировать сроки проведения акции и изменять модельный
        ряд, который под нее попадает. Следите за новостями на сайте. Все акции и их условия публикуются здесь. </p>`})

const infoCredit = ref({title:`Автокредит без первоначального взноса от ${appStore.creditPercent}%`, content:`<p>В нашем автосалоне одобрение автокредита получают 98% клиентов. Как это возможно? Дело в том, что мы сотрудничаем
        не с одним, а сразу с рядом банков, которые предлагают свои услуги на различных условиях. Благодаря чему у нас
        систематизирован индивидуальный подход: для каждого клиента найдем банк, который будет в полной мере
        удовлетворять условиями кредитования обе стороны. За 10 лет мы одобрили кредит более двум тысячам клиентам, так
        как стараемся помочь каждому!</p>
    <p>Благодаря тому, что мы сотрудничаем с обилием банков, мы способны делать самые выгодные предложения своим
        клиентам по автокредиту. По особым льготным условиям процентная ставка на любое авто может составлять ${appStore.creditPercent}%, что
        является уникальным предложением по российскому рынку. Приятным бонусом будет и то, что досрочное погашение
        только приветствуется: никаких штрафов или непонятных комиссий.</p>
    <p>В целях экономии Вашего времени мы разместили на данной странице онлайн-форму, выполняющей функцию калькулятора.
        Помимо того, что эта программа посчитает точную стоимость какого-либо автомобиля на тех или иных условиях
        кредитования, также она предлагает подать заявку на автокредит онлайн. Заполнив небольшую форму, Вы сделаете
        официальный запрос на автокредит, и узнаете о решении уже через 30 минут!</p>`})

const infoGos = ref({title:`Госпрограмма`, content:`<p>Госпрограмма заключается в том, что государство субсидирует часть стоимости авто, таким образом влияя на его цену
        в момент сделки. Данная скидка достигается только путем соблюдения условий данной программы. </p>
    <p>Общие условия для всех участников программы:</p>
    <ul>
        <li>Автомобиль стоит не более 1 500 000 рублей.</li>
        <li>Вы не вносите первоначальный взнос</li>
        <li>Вы не имеете других автокредитов</li>
    </ul>
    <ul class="type">
        <li>
            <h3>Госпрограмма «Семейный автомобиль» </h3>
            <p>В Вашей семье есть, как минимум, один несовершеннолетний ребенок, что Вы можете подтвердить официальными
                документами. </p>
        </li>
        <li>
            <h3>Госпрограмма «Первый автомобиль»</h3>
            <p>Вы не имели ранее какой-либо автомобиль и не оформляли какой-либо автокредит</p>
        </li>
        <li>
            <h3>Госпрограмма «Для медработников»</h3>
            <p>Вы являетесь работником государственной системы здравоохранения и можете подтвердить это официальными
                документами. </p>
        </li>
    </ul>`})
</script>



<template>
   {{console.log(car)}}

    <section class="complectations section" >
        <div class="container">
            <div class="complectations__wrapper">
              <!--   <div class="complectations__header section__header">
                    <BaseSectionTitle :title="`Доступные комплектации`" />

                    <div class="model-card__mod-choice">
                        <label class="model-card__mod-select">
                            <select v-model="newStore.modification">
                                <option v-for="(option, index) in modList" :key="option.id" :value="option.id">
                                    {{ option.modification }}
                                </option>
                            </select>
                        </label>
                    </div>

                </div> -->
                <div class="complectations__body">
                    <div class="complectations-calculator">
                        <div class="complectations-calculator__item trade" :class="{ 'active': tradeSwitch }" @click="tradeSwitch = !tradeSwitch">
                            <div class="complectations-calculator__title">
                                <div class="services-img__bg" ></div>
                                <div class="services__check-icon"></div>
                                <p>Trade-IN</p>
                                 <!-- <div class="switch">
                                     <input type="checkbox" id="switch" :checked="tradeSwitch"
                                        @change="tradeSwitch = !tradeSwitch" /> 
                                    <label for="switch"></label>
                                </div>  -->
                            </div>
                            <!-- <div class="complectations-calculator__text" :class="{ 'active': tradeSwitch }"> -->
                               
                                <div class="money">
                                    <p>{{ makeSpaces(tradeSale) }} руб</p>
                                    <button class="services-sale__icon-i" 
                                    @click.stop="modalShow(), content = infoTrade">
                                        <!-- <SvgInfo/> -->
                                    </button>
                                    <Teleport to="body">
                                        <div v-if="isOpen">
                                            <BaseModalInfo :content="content" @closeModal="modalShow()"/>
                                        </div>
                                    </Teleport>
                                </div>
                               

                            <!-- </div> -->
                        </div>

                        <div class="complectations-calculator__item credit" :class="{ 'active': creditSwitch }" @click="creditSwitch = !creditSwitch">
                            <div class="complectations-calculator__title">
                                <div class="services-img__bg" ></div>
                                <div class="services__check-icon"></div>
                                <p>Кредит</p>
                            </div>
                            <div class="money">
                                <p> {{ makeSpaces(creditSale) }} руб</p>
                                <button class="services-sale__icon-i" 
                                    @click.stop="modalShow(), content = infoCredit">
                                        <!-- <SvgInfo/> -->
                                    </button>
                                    <Teleport to="body">
                                        <div v-if="isOpen">
                                            <BaseModalInfo :content="content" @closeModal="modalShow()"/>
                                        </div>
                                    </Teleport>
                            </div>
                        </div>

                        <div class="complectations-calculator__item salon" :class="{ 'active': salonSwitch }" @click="salonSwitch = !salonSwitch">
                            <div class="complectations-calculator__title">
                                <div class="services-img__bg" ></div>
                                <div class="services__check-icon"></div>
                                <p>От автосалона</p>
                            </div>
                            <div class="money">
                                <p>{{ makeSpaces(salonSale) }} руб</p>
                            </div>
                        </div>

                        <div class="complectations-calculator__item total">
                            <p class="text2">Общая выгода до <span>{{  dataSale() }}</span></p>

                            <div class="complectations-calculator__text_total">
                                <p class="text">Максимальная выгода при покупке до <span>{{  dataSale() }}</span></p>
                                <p class="complectations-calculator__money">
                                     {{ makeSpaces(totalSale) }} руб
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="about-table">
                        <!-- <span>Цены актуальны на {{new Date().toLocaleDateString() }}</span> -->
                        <div class="about-table__box" v-for="mod in modList">
                            <div class="about-table__row about-table__header">
                                <div class="about-table__row-inner">
                                    <div class="about-table__cell about-table__name-mod">
                                         {{ mod.modification }}
                                    </div>
                                    <div class="about-table__cell about-table__existence">
                                        В наличии
                                    </div>
                                    <div class="about-table__cell about-table__price-old">
                                        Розничная цена
                                    </div>
                                    <div class="about-table__cell about-table__price-value">
                                    Цена со скидкой
                                    </div>
                                    <div
                                        class="about-table__cell about-table__button-group"
                                    ></div>
                                </div>
                            </div>
                            <div class="about-table__row about-table__body" v-for="com in mod.car_complectations">
                                <div class="about-table__row-inner"  >
                                    <div class="about-table__cell about-table__name-com" @click="toggleDescription(com.id)">
                                        <div class="name-com__arrow">
                                            <SvgArrowDown/>
                                        </div>
                                        {{ com.complectation }} 
                                    </div>
                                    <div class="about-table__cell about-table__existence" @click="toggleDescription(com.id)">
                                        {{ com.cars_count }}
                                    </div>
                                    <div class="about-table__cell about-table__price-old" @click="toggleDescription(com.id)">
                                        <del>{{ makeSpaces(com.price) }} руб</del>
                                    </div>
                                    <div
                                        class="about-table__cell about-table__price-value" @click="toggleDescription(com.id)"
                                        data-num=""
                                    >
                                          {{ makeSpaces(com.price - totalSale) }}  руб
                                    </div>
                                    <div class="about-table__cell about-table__button-group">
                                        <BaseButtonModal class="border__credit" :car="{ price: com.price, sale: totalSale, images: newStore.model.galleries, model: $route.params.model, brand: $route.params.brand }" :btn-label="'Купить в кредит '" :app-type="2"
                                        :modal-title="`Купить в кредит ${cleanUpTitle()}`" :btn-class="`classic`"/>
                                    </div>
                                </div>
                                <div class="about-table__description" :class="{'open': show[com.id]}">
                                    <ul class="about-table__description-list">
                                        <li class="description-list__item" v-if="com.safety">
                                            <h3 class="description-list__title">Безопасность</h3>
                                            <ul class="description-list__inner" v-html="com.safety">
                                                
                                            </ul>
                                        </li>
                                        <li class="description-list__item" v-if="com.exterior">
                                            <h3 class="description-list__title">Экстерьер</h3>
                                            <ul class="description-list__inner" v-html="com.exterior">
                                            </ul>
                                        </li>
                                        <li class="description-list__item" v-if="com.interior">
                                            <h3 class="description-list__title">Интерьер</h3>
                                            <ul class="description-list__inner" v-html="com.interior">
                                            </ul>
                                        </li>
                                        <li class="description-list__item" v-if="com.comfort">
                                            <h3 class="description-list__title">Комфорт</h3>
                                            <ul class="description-list__inner" v-html="com.comfort">
                                            </ul>
                                        </li>
                                        <li class="description-list__item" v-if="com.multimedia">
                                            <h3 class="description-list__title">Мультимедиа</h3>
                                            <ul class="description-list__inner" v-html="com.multimedia">
                                                
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>


.about-table__box {
  margin-bottom: 35px;
  
  border-bottom: 3px solid #d1d1d1;
}

.about-table__row {
  border-bottom: 1px solid #eaeaea;
  padding: 8px;
}

.about-table__row:last-child {
  border-bottom: none;
}

.about-table__body .about-table__row-inner {
  cursor: pointer;
  transition: background 0.2s ease-in-out 0s;
}

.about-table__body .about-table__row-inner:hover {
  background: #ffffffe7;
}

.about-table__row-inner {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 5px;
}

.about-table__cell {
  -ms-flex-positive: 1;
  flex-grow: 1;
  -ms-flex-preferred-size: 15%;
  flex-basis: 15%;
  padding: 10px 0;
  text-align: center;
}

.about-table__header {
  background-color: #fff;
}

.about-table__button-group,
.about-table__name-com,
.about-table__name-mod {
  text-align: left;

}

.about-table__name-mod {
  font-size: 16px;
  font-weight: 700;
  -ms-flex-preferred-size: 30%;
  flex-basis: 30%;
  @media screen and (max-width:1000px) {
    flex-basis: 20%;
    -ms-flex-preferred-size: 20%;
  }
}

.about-table__name-com {
  vertical-align: middle;
  -ms-flex-preferred-size: 30%;
  flex-basis: 30%;
  @media screen and (max-width:1000px) {
    flex-basis: 20%;
    -ms-flex-preferred-size: 20%;
  }
}

.name-com__arrow {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;

}

.name-com__arrow path {
  transition: all 0.2s ease-in-out 0s;
  fill: #aaa;
}

.name-com__arrow:hover path {
  fill: #4277b894;
}

.about-table__existence {
  -ms-flex-preferred-size: 5%;
  flex-basis: 5%;
  color: var(--color-d);
}

.about-table__price-old,
.about-table__price-value {
  -ms-flex-preferred-size: 10%;
  flex-basis: 10%;
}

.about-table__description {
  border-top: 2px solid #d1d1d1;
  padding: 10px;
  display: none;
}

.about-table__description.open {
  display: block;
}

.about-table__price-value {
  font-weight: 700;
  color: var(--color-c);
}
.description-list__item {
  margin-bottom: 10px;
}

.description-list__inner {
  columns: 3;
  column-gap: 20px;
 
 @media screen and (max-width:767px) {
    columns: 2;
 } 
 @media screen and (max-width:570px) {
    columns: 1;
 }
}

.description-list__title {
  margin-bottom: 5px;
}

.description-inner__item {
  margin-bottom: 3px;
  position: relative;
  padding-left: 15px;
}

.description-inner__item:before {
  content: "";
  display: block;
  position: absolute;
  top: 5px;
  left: 0;
  width: 3px;
  height: 3px;
  background-color: var(--color-c);
}

@media screen and (max-width: 1000px) {
  .about-table__button-group {
    -ms-flex-preferred-size: 25%;
    flex-basis: 25%;
  }
}

@media screen and (max-width: 767px) {
  .about-table__box {
    border: none;
  }

  .about-table__header {
    margin-bottom: 10px;
  }

  .about-table__row {
    border: none;
  }

  .about-table__body .about-table__row-inner {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 0;
    border: 1px solid #ccc;
    background: #fff;
  }

  .about-table__name-com {
    grid-column: 1/-1;
    font-size: 14px;
    font-weight: 700;
    border-bottom: 1px solid #ccc;
  }

  .about-table__button-group {
    grid-column: 2/-1;
  }

  .about-menu__list {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: stretch;
    align-items: stretch;
  }

  .about-menu__item {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    display: -ms-flexbox;
    display: flex;
  }

  .about-menu__item p {
    height: -webkit-min-content;
    height: -moz-min-content;
    height: min-content;
    margin: auto;
  }

  .about-table__cell {
    padding: 5px;
  }

  .about-table__header {
    background: 0 0;
    border-bottom: none;
  }

  .about-table__header .about-table__cell:not(.about-table__name-mod) {
    display: none;
  }

  .about-table__price-value {
    font-size: 14px;
  }

  .about-table__body {
    margin-bottom: 10px;
  }

  .about-table__existence:before {
    content: "в наличии ";
    display: inline;
    font-size: 14px;
    color: #6d6d6d;
  }

  .about-table__description {
    border-top: none;
    border-bottom: 1px solid #eaeaea;
  }

}

.complectations-calculator {
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;       
        @media screen and (max-width: 768px) {
            display: block;

        }
    

        .complectations-calculator__item {
            -ms-flex: 0 0 23%;
            flex: 0 0 23%;
            padding: 16px;

            background-color: #fff;
            border: 1px solid #fff;
            cursor: pointer;
            transition: background 0.3s ease-in-out 0s;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            -ms-flex-pack: justify;
            display: flex;
            justify-content: space-between; 

            @media screen and (max-width: 1199px) {
                -ms-flex: 0 0 235px;
                flex: 0 0 235px;
            }

            @media screen and (max-width: 1199px) {
                -ms-flex: 0 0 180px;
                flex: 0 0 180px;
            }
            @media screen and (max-width: 1000px) {
                -ms-flex: 0 0 165px;
                flex: 0 0 165px;
            }
            
            .text2{
                    display: none;
                }
            
            .complectations-calculator__title{
                display: flex;
                justify-content: left;
                align-items: center;
                margin-bottom: 10px;
                width: 100%;
                text-align: left;

                
                .services-img__bg {
                    display: inline-block;
                    text-transform: uppercase;
                    cursor: pointer;
                    text-align: left;
                    height: 20px;
                    line-height: 20px;
                    transition: all 0.2s;
                    border-radius: 50%; 
                }
                .services-img__bg {
                    width: 20px;
                    background: #ccc ;
                    margin-right:10px ;

                }
              

                .services__check-icon {
                    position: absolute;
                    cursor: pointer;
                    pointer-events: none;
                    height: 20px;
                    width: -2px;
                    &::after{
                        content: "";
                        position: absolute;
                        top: 9px;
                        left: 6px;
                        transition: 0.2s ease-out;
                        width: 8px;
                        height: 2px;
                        border-radius: 2px;
                        background: #fff;
                        box-shadow: 0 1px 0 #0000001a;
                        margin-left: -10%;
                        transform: rotate(-45deg);
                    }
                    &::before{
                        content: "";
                        position: absolute;
                        top: 9px;
                        left: 6px;
                        transition: 0.2s ease-out;
                        width: 8px;
                        height: 2px;
                        border-radius: 2px;
                        background: #fff;
                        box-shadow: 0 1px 0 #0000001a;
                        margin-left: -10%;
                        transform: rotate(45deg);

                    }
                }
            }
            @media screen and (max-width: 540px) {
                padding: 10px;
            }

                @media screen and (max-width:767px) {
                 
                    align-items: center;
                    
                    .text{
                        display: none;
                    }
                    .text2{
                        display: block;
                    }
                }
                .money {
                    margin-left: 30px;
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--dark-grey);
                    margin-top: 5px;
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                }

                .text,.text2 {
                    color: var(--dark-grey);
                    font-size: 14px;

                    span{
                        color: var(--color-c);
                    }
                }

                .complectations-calculator__money {
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex-pack: center;
                    justify-content: center;
                    font-weight: 700;
                    -ms-flex-align: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    padding: 3px;
                    font-size: 16px;
                    color: var(--color-c);
                    transition: all 0.5s ease 0s;

                    @media screen and (max-width: 1000px) {
                        height: 70%;
                    }
                    @media screen and (max-width: 768px) {
                        font-size: var(--large-size);
                    }

                    @media screen and (max-width: 540px) {
                        font-size: var(--medium-size);
                    }
                }
            



            &:hover {
                box-shadow: var(--box-shadow);
                transition: 0.3s;
            }

            div {
                background: transparent;
            }

        
        }

        @media screen and (max-width: 767px) {
            .trade,
            .credit,
            .salon{
                display: none;
            }
        }

        .complectations-calculator__item.active {
            border-radius: 10px;
            border: 1px solid var(--color-c);
          
            .complectations-calculator__title{
                .icon{
                    background: var(--color-c);

                }
            }
            .money {
                color: var(--color-c);
                p{
                    font-weight: 700 ;
                }
            }
            .services-img__bg {
                    background: var(--color-c) ;
                }
            .services__check-icon {
                    
                    &::after{
                        transform: translate(20%) rotate(-45deg);
                    }
                    &::before{
                        transform: translate(-30%, 100%) rotate(45deg) scaleX(0.6);
                    }
                }
        }

        .complectations-calculator__item.total {
            
            font-size: 14px;
            flex-basis: 30%;
            
            .complectations-calculator__text_total {
                display: flex;
                flex-wrap: nowrap;
                
                @media screen and (max-width:1000px) {
                    flex-wrap: wrap;
                }
            }
        }

        .complectations-calculator__item.activeTotal {
            color: black;
            border: 1px solid var(--color-c);

            
        }
    }
    

    .name-com__arrow {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        width: 14px;
        fill: #ccc;
    }


    .services-sale__icon-i {
        display: inline-block;
        margin-left: 5px;
        padding: 3px;
    }

    .services-sale__icon-i svg {
        width: 15px;
        height: 15px;
    }

    .services-sale__icon-i svg{
        fill: #ccc;
    }

    .services-sale__icon-i:hover svg {
        fill: var(--color-d);
    }

    .description-list__inner{
        :deep(li){
            margin-bottom: 3px;
            position: relative;
            padding-left: 15px;
            font-size: 14px;
            &:before{
                content: "";
                display: block;
                position: absolute;
                top: 5px;
                left: 0;
                width: 3px;
                height: 3px;
                background-color: var(--color-c);
                        }
        }
    }

.name-com__arrow svg {
  fill: #D2122B;
}
</style>