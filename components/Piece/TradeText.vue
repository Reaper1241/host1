<template>
    <div class="content__text content__section">
        <h2>Trade-In – это выгодно и удобно</h2>
        <p class="chapter">
            Trade-In – это услуга взаимообмена на основе условий акции.
            Благодаря данной услуге решается несколько возможных проблем:
        </p>
        <div class="chapter">
            <ul>
                <li>
                    У Вас недостаточно средств для того, чтобы внести
                    первоначальный взнос. Поскольку без первого взноса
                    вероятность одобрения кредита банком крайне мала, Вы
                    можете сдать свой автомобиль в качестве первоначального
                    взноса.
                </li>
                <li>
                    Вам не стоит беспокоиться о том, что Вы можете
                    «продешевить». Оценка автомобиля происходит согласно
                    средней рыночной цене, в чем можно легко убедиться,
                    проверив стоимость данного авто на различных площадках.
                </li>
                <li>
                    Экономия времени. Мы предоставим Вам бесплатную
                    диагностику автомобиля, которая длится не более часа,
                    после чего сразу же оформляется сделка и совершается
                    выплата.
                </li>
                <li>
                    Прозрачная процедура. Вы в любой момент можете проверить
                    всю юридическую документацию, «подводных камней» нет.
                </li>
            </ul>
        </div>

        <p class="chapter">
            Для того, чтобы получить дополнительную скидку за
            использования данной услуги, необходимо соблюсти следующие
            условия акции:
        </p>
        <div class="chapter">
            <ol>
                <li>У Вас имеется паспорт транспортного средства.</li>
                <li>
                    В нашем автосалоне Вы приобретаете новую модель, при этом
                    оформляя на нее автокредит.
                </li>
            </ol>
        </div>
        <p class="chapter">
            Автосалон «Host-Auto» оставляет за собой право регулировать
            сроки проведения акции и изменять модельный ряд, который под
            нее попадает. Следите за новостями на сайте.
        </p>
    </div>

</template>

<style lang="scss" scoped>
    .content__section {
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 8px ;
    }

    .content__text {
        box-shadow: var(--shadow-s2);
        background-color: #fff;
        // border: 1px solid #ccc;
        box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.15);

        h2{
        line-height: 17px;
        color: black;
        }
    }


.chapter {
  margin-bottom: 10px;
  font-size: 14px;
  ul{
    list-style: none;
  }

}
.chapter:last-child {
  margin: 0;
}
.chapter ul li {
  position: relative;
  margin-bottom: 5px;
  padding: 0 0 0 20px;
}
.chapter ul li:last-child {
  margin-bottom: 0;
}
.chapter ul li:after {
  content: '\25CF';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  color: var(--color-d);
}
.chapter ol {
  counter-reset: a;
}
.chapter ol li {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 5px;
}
.chapter ol li:before {
  counter-increment: a;
  content: counter(a) ".";
  color: var(--color-d);
  display: block;
  padding-right: 10px;
}
</style>