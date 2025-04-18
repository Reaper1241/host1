<script setup>
import { useNewCarStore } from '/stores/NewCarStore.js'

const carStore = useNewCarStore()

const car = ref([]);
car.value = carStore.car
const complectation = car.value.complectation

</script>

<template>
    <section>
        <div class="container">
            <h3>
                Опции
            </h3>
            <ul class="com-info__list">
                <li class="com-info__item" v-if="complectation.safety != null">
                    <h3 class="com-info__title-mini" >Безопасность</h3>
                    <ul class="car-info__inner-list" v-html="complectation.safety">
 
                    </ul>
                </li>
                <li class="com-info__item" v-if="complectation.exterior != null">
                    <h3 class="com-info__title-mini" >Экстерьер</h3>
                    <ul class="car-info__inner-list" v-html="complectation.exterior">
                    </ul>
                </li>
                <li class="com-info__item" v-if="complectation.interior != null">
                    <h3 class="com-info__title-mini">Интерьер</h3>
                    <ul class="car-info__inner-list" v-html="complectation.interior">
                    </ul>
                </li>
                <li class="com-info__item" v-if="complectation.comfort != null">
                    <h3 class="com-info__title-mini">Комфорт</h3>
                    <ul class="car-info__inner-list" v-html="complectation.comfort">
                    </ul>
                </li>
                <li class="com-info__item" v-if="complectation.multimedia != null">
                    <h3 class="com-info__title-mini">Мультимедиа</h3>
                    <ul class="car-info__inner-list" v-html="complectation.multimedia">
                    </ul>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped lang="scss">
.com-info__item {
    margin-bottom: 10px;
}
.com-info__title-mini {
    margin-bottom: 5px;
}
h3 {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-a);
}
.car-info__inner-list {
    columns: 3;
    column-gap: 20px;

   

}

@media screen and (max-width: 1000px) {

  .car-info__content {
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .car-info__content-island {
    margin: 0;
  }

  .car-info__img-box {
    width: 700px;
    height: auto;
  }

  .car-info__img-box img {
    height: 300px;
  }
}

@media screen and (max-width: 767px) {


  .car-info__inner-list {
    columns: 1;
  }

  .car-info__img-box {
    width: 500px;
    height: auto;
  }

  .car-info__img-box img {
    height: 250px;
  }

}

@media screen and (max-width: 570px) {

  .car-info__img-box {
    width: 300px;
    height: auto;
  }

}
  .car-info__inner-list{
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




</style>