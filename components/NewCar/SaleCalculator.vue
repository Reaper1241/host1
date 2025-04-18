<script setup>
import { useNewCarStore } from '/stores/NewCarStore.js'
import { dataSale } from '~/constants';

const carStore = useNewCarStore()



import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const show = ref([])
const toggleDescription = (index) =>{
    show.value[index] = !show.value[index]
}
const tradeSwitch = ref(true)
const creditSwitch = ref(true)
const salonSwitch = ref(true)

const currentSale =  carStore.car.sale


const tradeSale = computed(() => currentSale * appStore.tradeCalcPercent)
const creditSale = computed(() => currentSale * appStore.creditCalcPercent)
const salonSale = computed(() => currentSale * appStore.salonCalcPercent)

const totalSale = computed(() => {
    let total = 0;
    if (tradeSwitch.value) total += tradeSale.value
    if (creditSwitch.value) total += creditSale.value
    if (salonSwitch.value) total += salonSale.value
    carStore.car.sale = total
    return total
})


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
    <div class="container">
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
                                <div class="text">
                                    <p>Цена Вашего авто и <br> дополнительная скидка:</p>
                                </div>
                                <div class="money">
                                    <p>{{ makeSpaces(tradeSale) }} руб</p>
                                    <button class="services-sale__icon-i" 
                                    @click.stop="modalShow(), content = infoTrade">
                                        <SvgInfo/>
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
                            <div class="text">
                                <p >Ставка от {{appStore.creditPercent}}% годовых <br> при взносе от 10%</p>
                            </div>
                            <div class="money">
                                <p>{{ makeSpaces(creditSale) }} руб</p>
                                <button class="services-sale__icon-i" 
                                    @click.stop="modalShow(), content = infoCredit">
                                        <SvgInfo/>
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
                                <p>Госпрограмма</p>
                            </div>
                            <div class="text">
                                <p >Скидка 10% по <br> госпрограммам</p>
                            </div>
                            <div class="money">
                                <p>{{ makeSpaces(salonSale) }} руб</p>
                                <button class="services-sale__icon-i" 
                                    @click.stop="modalShow(), content = infoGos">
                                        <SvgInfo/>
                                    </button>
                                    <Teleport to="body">
                                        <div v-if="isOpen">
                                            <BaseModalInfo :content="content" @closeModal="modalShow()"/>
                                        </div>
                                    </Teleport>
                            </div>
                        </div>

                        <div class="complectations-calculator__item total">
                            <div class="complectations-calculator__text_total">
                                <p class="text">Максимальная выгода при покупке до <span>{{  dataSale() }}</span></p>
                                <p class="complectations-calculator__money">
                                     {{ makeSpaces(totalSale) }} руб
                                </p>
                            </div>
                        </div>
                    </div>
    </div>
     
    
</template>

<style lang="scss" scoped>
.complectations-calculator {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;       

        @media screen and (max-width: 768px) {
            display: block;

        }
    

        .complectations-calculator__item {
            -ms-flex: 0 0 23%;
            flex: 0 0 23%;
            padding: 10px;
            background-color: #fff;
            border: 1px solid #fff;
            cursor: pointer;
            transition: background 0.3s ease-in-out 0s;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            -ms-flex-pack: justify;
            display: flex;
            justify-content: space-between; 

            
            
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
                    width: 20px;
                    &::after{
                        content: "";
                        position: absolute;
                        top: 9px;
                        left: 6px;
                        transition: 0.2s ease-out;
                        width: 12px;
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
                        width: 12px;
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
                 
                    
                    &::before {
                        content: "Общая выгода до";
                        display: inline;
                    }
                    .text{
                        display: none;
                    }
                }
                .money {
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--dark-grey);
                    margin-top: 5px;
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                }

                .text {
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
                    font-size: 18px;
                    color: var(--color-c);
                    transition: all 0.5s ease 0s;


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

            // @media screen and (max-width: 1400px) {
            //     display: flex;
            //     flex-direction: column;
            //     align-items: start;
            // }
            // @media screen and (max-width: 767px) {
            //     display: flex;
            //     flex-direction: row;
            //     justify-content: space-between;
            // }
        }

        @media screen and (max-width: 767px) {
            .trade,
            .credit,
            .salon{
                display: none;
            }
        }

        .complectations-calculator__item.active {
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
            flex-basis: 25%;
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
</style>