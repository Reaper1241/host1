<script setup>
import { useNewCarStore } from '/stores/NewCarStore.js'

const carStore = useNewCarStore()

const car = ref([]);
car.value = carStore.car
let modification = car.value.modification

</script>

<template>
  <section class="mod">
    <div class="container">
        <div class="mod-info__content">
            <h2>Технические характеристики</h2>
            <div class="mod-info__machine-diagram">
                <div class="machine-diagram__item machine-diagram__item1">
                    <div class="machine-diagram__img">
                        <!-- {% include 'svg/machine-diagram/car1.svg' %} -->
                        <SvgCarDiaggram1/> 
                        <div
                            class="machine-diagram__attr machine-diagram__attr-clearance"
                        >
                            <span>{{ modification.clearance }}</span>
                        </div>
                    </div>
                    <div class="machine-diagram__attr machine-diagram__attr-width">
                        <span>{{ modification.width }}</span>
                    </div>
                </div>
                <div class="machine-diagram__item machine-diagram__item2">
                    <div class="machine-diagram__img">
                        <!-- {% include 'svg/machine-diagram/car2.svg' %} -->
                        <SvgCarDiaggram2/> 

                        <div class="machine-diagram__wheelbase-box">
                            <div
                                class="machine-diagram__attr machine-diagram__attr-wheelbase"
                            >
                                <span> {{ modification.wheel_base }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="machine-diagram__attr machine-diagram__attr-height">
                        <span>{{ modification.height }}</span>
                    </div>

                    <div class="machine-diagram__attr machine-diagram__attr-long">
                        <span>{{ modification.length }}</span>
                    </div>
                </div>
            </div>
            <div class="mod-info__table">
                <ul class="mod-info__list">
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">Длина, мм</p>
                        <p class="mod-info__value">
                          {{ modification.length }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">Ширина, мм</p>
                        <p class="mod-info__value">
                          {{ modification.width }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">Высота, мм</p>
                        <p class="mod-info__value">
                          {{ modification.height }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">Колесная база, мм</p>
                        <p class="mod-info__value">
                          {{ modification.wheel_base }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">
                            Объем багажного отделения, л
                        </p>
                        <p class="mod-info__value">
                          {{ modification.trunk_capacity }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">Объем топливного бака, л</p>
                        <p class="mod-info__value">
                          {{ modification.fuel_tank_capacity }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">Объем двигателя, л</p>
                        <p class="mod-info__value">
                          {{ modification.engine_size }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">
                            Рабочий объем двигателя, см3
                        </p>
                        <p class="mod-info__value">
                          {{ modification.displacement }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">Коробка передач</p>
                        <p class="mod-info__value">
                          {{ modification.transmission }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">Количество передач</p>
                        <p class="mod-info__value">
                          {{ modification.number_of_gears }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">Тип привода</p>
                        <p class="mod-info__value">
                          {{ modification.drive }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">Мощность, л.с</p>
                        <p class="mod-info__value">
                          {{ modification.power }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">
                            Расход топлива в городе, л/100 км
                        </p>
                        <p class="mod-info__value">
                          {{ modification.consumption_city }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">
                            Расход топлива на трассе, л/100 км
                        </p>
                        <p class="mod-info__value">
                          {{ modification.consumption_highway }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">
                            Смешанный расход топлива, л/100 км
                        </p>
                        <p class="mod-info__value">
                          {{ modification.consumption_combine }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">
                            Разгон от 0 до 100 км/ч, сек.
                        </p>
                        <p class="mod-info__value">
                          {{ modification.from_0_to_100 }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">
                            Максимальная скорость, км/ч
                        </p>
                        <p class="mod-info__value">
                          {{ modification.max_speed }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">Клиренс, мм</p>
                        <p class="mod-info__value">
                          {{ modification.clearance }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">Снаряженная масса, кг</p>
                        <p class="mod-info__value">
                          {{ modification.curb_weight }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">Максимальная масса, кг</p>
                        <p class="mod-info__value">
                          {{ modification.max_weight }}
                        </p>
                    </li>
                    <li class="mod-info__item">
                        <p class="mod-info__title-mini">Тип двигателя</p>
                        <p class="mod-info__value">
                          {{ modification.fuel }}
                        </p>
                    </li>
                </ul>
            </div>
        </div>

    </div>
  </section>
    
</template>

<style lang="scss" scoped>
.mod{
  margin-bottom: 40px;
  @media screen and (max-width:570px) {
    margin-bottom: 20px;
  }
}
.mod-info__machine-diagram {
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 20px;
}

.machine-diagram__item {
  display: grid;
  grid-template-rows: auto auto;
  gap: 10px;
  padding: 10px;
}

.machine-diagram__item2 {
  grid-template-columns: auto auto;
}

.machine-diagram__img {
  position: relative;
}

.machine-diagram__img svg {
  height: 150px;
}

.machine-diagram__img svg .st0 {
  fill: #8d939b;
}

.machine-diagram__img .machine-diagram__attr {
  position: absolute;
  bottom: 5px;
  width: 100%;
  padding: 0 25%;
}

.machine-diagram__img .machine-diagram__attr-wheelbase {
  position: relative;
  bottom: 0;
  width: auto;
  padding: 0;
  z-index: 2;
}

.machine-diagram__img .machine-diagram__attr-wheelbase:after {
  left: 0;
}

.machine-diagram__img .machine-diagram__attr-wheelbase:before {
  right: 0;
}

.machine-diagram__attr {
  position: relative;
  text-align: center;
  z-index: 2;
}

.machine-diagram__attr:after,
.machine-diagram__attr:before {
  content: "";
  width: 0;
  height: 1px;
  top: 6px;
  position: absolute;
  border: 3px solid transparent;
}

.machine-diagram__attr:after {
  left: -3px;
  border-right: 7px solid #c8c8c8;
}

.machine-diagram__attr:before {
  right: -3px;
  border-left: 7px solid #c8c8c8;
}

.machine-diagram__attr span {
  background: #f6f7f7;
  padding: 0 10px;
  font-size: 14px;
}

.machine-diagram__attr span:after {
  content: "";
  position: absolute;
  z-index: -2;
  height: 1px;
  top: 9px;
  left: 3px;
  right: 3px;
  background: #c8c8c8;
}

.machine-diagram__attr-height {
  display: -ms-flexbox;
  display: flex;
}

.machine-diagram__attr-height span {
  margin: auto;
}

.machine-diagram__attr-clearance:after,
.machine-diagram__attr-clearance:before,
.machine-diagram__attr-clearance span:after {
  display: none;
}

.machine-diagram__wheelbase-box {
  position: absolute;
  bottom: 5px;
  width: 100%;
  padding: 0 25%;
}

.machine-diagram__attr-height:after {
  transform: rotate(-90deg);
  top: auto;
  bottom: 0;
  left: 18px;
}

.machine-diagram__attr-height:before {
  transform: rotate(272deg);
  left: 18px;
  top: auto;
}

.machine-diagram__attr-height span:after {
  height: 100%;
  width: 1px;
  left: 22px;
  top: 0;
}

.content-island__value {
  color: #8f8f8f;
  text-align: right;
}

.mod-info__table {
  overflow: auto;
  width: 100%;
  background: #fff;
  padding: 10px;
  box-shadow: 0 0 32px #00000014;
}

.mod-info__list {
  column-count: 3;
  column-gap: 0;
}

.mod-info__item {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  transition: background 0.1s ease-in-out 0s;
  font-size: 14px;
}

.mod-info__item:not(.specifications-table__header):hover {
  background: #ffffff75;
}

@media screen and (max-width: 1000px) {
  .mod-info__machine-diagram {
    -ms-flex-pack: justify;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 767px) {
  .machine-diagram__island {
    width: 100%;
  }
  .mod-info__list {
    columns: 1;
  }
}

@media screen and (max-width: 570px) {  
  .mod-info__machine-diagram {
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-line-pack: center;
    align-content: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .machine-diagram__item1 svg {
    height: 150px;
  }

  .machine-diagram__item2 svg {
    height: 90px;
  }
}
.mod-info__content{
  h2{
    font-size: 16px;
  }
}
</style>