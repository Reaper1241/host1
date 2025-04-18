<script setup>
</script>

<template>
    <div class="box">
        <div class="content__text content__section">
								<h2>Рассрочка в автосалоне Host-Auto</h2>
								<p>
									Зачастую автолюбители сталкиваются с проблемой получения
									одобрения автокредита, так как 90% банков решают давать ли
									сумму кредита тому или иному лицу в зависимости от того, есть
									ли первоначальный взнос, а если есть, то в каком размере. Для
									многих клиентов затруднительно сразу же выложить 30%
									стоимости, например, за автомобиль бизнес-класса, поэтому мы
									нашли альтернативное решение этой задачи. Оно заключается в
									том, что мы предлагаем каждому клиенту взять сумму
									первоначального взноса у автосалона в рассрочку. Никаких
									комиссий и процентов. За счет данной рассрочки можно
									приобрести в кредит любой автомобиль из нашего модельного
									ряда.
								</p>
								<div class="chapter">
									<h2>Преимущества рассрочки</h2>
									<ul>
										<li>Вы погасите сразу 30% стоимости авто.</li>
										<li>Сумма выдается без процентов.</li>
										<li>Максимальная сумма рассрочки – 2 млн рублей.</li>
										<li>Нет никаких комиссий и штрафов.</li>
										<li>Погашать сумму рассрочки можно на протяжении 3 лет.</li>
									</ul>
								</div>
								<div class="chapter">
									<h2>Необходимые условия:</h2>
									<ul>
										<li>Необходимо быть гражданином РФ.</li>
										<li>
											Вам должно быть не меньше 21 года и не больше 70 лет.
										</li>
										<li>
											Предоставить такие документы, как паспорт, водительские
											права, копия трудовой книжки.
										</li>
										<li>
											Необходимо, чтобы Вы проработали не меньше 3 месяцев на
											последнем месте.
										</li>
									</ul>
								</div>
							</div>

    </div>


</template>

<style lang="scss" scoped>
.content__text {
    box-shadow: var(--shadow-s2);
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 20px;
    h2 {
        line-height: 17px;
        font-size: 16px;
        color: black;
        @media screen and (max-width: 1000px) {
            font-size: 14px;
        }
    }
    p{
        font-size: 14px;
        padding: 5px;
    }
    ul {
        margin-bottom: 10px;
        list-style: none;
        font-size: 14px;
        li {
            position: relative;
            padding:2px 0 0 20px;
            margin-bottom: 3px;
            &:after {
                content: "\2714";
                display: block;
                position: absolute;
                left: 0;
                top: 0;
                color: var(--color-d);
            }
        }
    }
    .type{
        padding: 0;
        li{
            padding: 0;
            h3{
                font-size: 14px;
            }
            &:after{
                content: '';
            }
        }
    }
}
</style>