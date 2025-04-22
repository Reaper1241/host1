<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

const modList = computed(() => newStore.model.modifications.filter((mod) => mod.car_complectations.length))

</script>

<template>
						<div
							class="sections-specifications about-section"
							data-IdSection="2"
						>
							<div class="specifications-table container" >
								<div 
									class="specifications-table__row specifications-table__header"
								>
									<div class="specifications-table__cell" v-for="mod in modList">
                                        {{ mod.modification }} 
                                    </div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Длина, мм
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.length }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option" >
										Ширина, мм
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.width }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Высота, мм
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.height }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Колесная база, мм
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.wheel_base }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Объем багажного отделения, л
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.trunk_capacity }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Объем топливного бака, л
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.fuel_tank_capacity }}
                                        </div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Объем двигателя, л
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.engine_size }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Рабочий объем двигателя, см3
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.displacement }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Коробка передач
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.transmission }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Количество передач
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.number_of_gears }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Тип привода
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.drive }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Мощность, л.с
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.power }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Расход топлива в городе, л/100 км
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.consumption_city }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Расход топлива на трассе, л/100 км
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.consumption_highway }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Смешанный расход топлива, л/100 км	
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.consumption_combine }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Разгон от 0 до 100 км/ч, сек.
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.from_0_to_100 }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Максимальная скорость, км/ч
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.max_speed }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Клиренс, мм
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.clearance }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Снаряженная масса, кг
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.curb_weight }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Максимальная масса, кг
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.max_weight }}
										</div>
									</div>
								</div>
								<div
									class="specifications-table__row specifications-table__body"
								>
									<div class="specifications-table__title-option">
										Тип двигателя
									</div>
									<div class="specifications-table__value">
										<div class="specifications-table__cell" v-for="mod in modList">
											{{ mod.fuel }}
										</div>
									</div>
								</div>
							</div>
						</div>

</template>

<style lang="scss">

.specifications-table {
  overflow: auto;
  width: 100%;
  background: #ffffffdc;
  padding: 10px;
  box-shadow: var(--shadow-s2);
}

.specifications-table__row {
  border-bottom: 1px solid #d9d9d9;
  padding: 10px;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  min-width: 100%;
  transition: background 0.1s ease-in-out 0s;
}

.specifications-table__row:not(.specifications-table__header):hover {
  background: #ffffff75;
}

.specifications-table__header,
.specifications-table__value {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}

.specifications-table__header {
  border-color: #2c2c2c;
}

.specifications-table__header .specifications-table__cell {
  font-weight: 700;
}

.specifications-table__title-option {
  color: #999;
  margin-bottom: 10px;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  position: sticky;
  left: 0;
}

.specifications-table__cell {
  -ms-flex: none;
  flex: none;
  -ms-flex-positive: 1;
  flex-grow: 1;
  width: 150px;
}
</style>