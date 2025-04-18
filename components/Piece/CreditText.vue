<script setup>
    import { useAppStore } from '/stores/AppStore.js'
    const appStore = useAppStore()

      const props = defineProps({
        active:Boolean
      })
</script>

<template>
    <section>
        <div class="content__text content__section content__section--hiden" v-show="!active">
            <h2>
                Автокредит от {{ appStore.creditPercent }}% без первоначального взноса
            </h2>
            <p class="chapter">
                В нашем автосалоне Вы получите одобрение автокредита с
                вероятностью 96%. Почему такая высокая вероятность? Причина
                заключается в том, что наш сервис сотрудничает сразу с
                несколькими банками, у каждого из которых свои принципы, свои
                условия кредитования. За счет широкого выбора условий
                автокредита, мы сумеем подобрать для Вас именно то
                предложение, которое в полной мере будет отвечать Вашим
                возможностям и требованиям. Мы работаем уже более 10 лет, и за
                этот срок успели помочь оформить кредит более чем двум тысячам
                клиентам.
            </p>
            <p class="chapter">
                Благодаря тому, что наш автосалон сотрудничает с рядом банков,
                мы готовы сделать предложение по автокредиту на самых выгодных
                условиях. По льготной программе процентная ставка начинается
                от {{ appStore.creditPercent }}%, что является уникальными условиями
                кредитования на российском рынке. Стоит отметить, что комиссий
                или каких-то штрафов за досрочное погашение не предусмотрено,
                поскольку оно только приветствуется.
            </p>
            <p class="chapter">
                На данной странице находится удобная программа –
                «Калькулятор-автокредит». С помощью нее Вы можете посчитать
                онлайн примерную стоимость авто при оформлении кредита, а
                также, заполнив небольшую форму, отправить заявку на
                автокредит онлайн. И уже через 30 минут Вам перезвонит
                специалист кредитного отдела, чтобы предоставить Вам
                бесплатную консультацию.
            </p>
        </div>
        
        <div class="content__text content__section">
            <div class="chapter">
                <h2>Преимущества</h2>
                <ul>
                    <li>
                        Первоначальный взнос необязателен. Мы можем выплатить его
                        за Вас.
                    </li>
                    <li>
                        Достаточно высокая максимальная сумма. Вы можете взять до
                        5 млн рублей.
                    </li>
                    <li>
                        Большой срок кредитования. Можно погашать автокредит на
                        протяжении 7 лет.
                    </li>
                    <li>
                        Отсутствуют какие-либо штрафы или комиссии за досрочную
                        выплату кредита.
                    </li>
                    <li>
                        Предлагаются лояльные программы с максимально низкой
                        процентной ставкой – от {{ appStore.creditPercent }}%.
                    </li>
                </ul>
            </div>
        </div>
        
    </section>
 
</template>

<style lang="scss" scoped>

    .content__text {
        box-shadow: var(--shadow-s2);
        background-color: #fff;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
         h2 {
            line-height: 17px;
            font-size: 16px;
            color: black;
            margin-bottom: 10px;
        }

        .chapter {
            margin-bottom: 10px;
            font-size: 14px;
            padding: 0;
            ul{
                list-style: none;
                li{
                    position: relative;
                    padding-left: 20px;
                    // margin-bottom: 5px;
                    font-size: 14px;

                    &::after {
                        content: '\25CF';
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 9px;
                        color: #000;
                    }
                }
            }
        }
    }
    .content__section {
        padding: 15px;
        margin-bottom: 20px;
    }
    .active{
        .content__section--hiden{
            display: none;
        }
    }

    
</style>