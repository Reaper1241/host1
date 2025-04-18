<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

</script>

<template>
  <!-- <ClientOnly> -->
    <ul class="page-form__icon-row">
        <li class="page-form__icon-item">
            <div class="page-form__icon-img">
                <SvgBank/>
            </div>
            <div class="page-form__icon-text">21 банк на выбор</div>
        </li>
        <li class="page-form__icon-item">
            <div class="page-form__icon-img">
                <SvgCredit/>
            </div>
            <div class="page-form__icon-text">автокредит от {{ appStore.creditPercent }}%</div>
        </li>
        <li class="page-form__icon-item">
            <div class="page-form__icon-img">
                <SvgDiscount/>
            </div>
            <div class="page-form__icon-text">-10% по госпрограмме</div>
        </li>
        <li class="page-form__icon-item">
            <div class="page-form__icon-img">
                <SvgWheel/>
            </div>
            <div class="page-form__icon-text">в подарок зимняя резина</div>
        </li>
    </ul>
  <!-- </ClientOnly> -->
   

</template>

<style scoped lang="scss"> 
.page-form__icon-row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
  column-gap: 15px;
}

.page-form__icon-row {
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  row-gap: 15px;
}

.page-form__icon-img {
  width: 43px;
  height: 43px;
  padding: 8px;
  margin-right: 15px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  transition: all 0.2s ease-in-out 0s;
}

.page-form__icon-img svg {
  display: block;
  width: 100%;
  height: 100%;
  margin: auto;
  fill: var(--color-c);
}

.page-form__icon-img svg path {
  fill: var(--color-c);
  transition: all 0.2s ease-in-out 0s;
}

.page-form__icon-text {
  color: var(--color-c);
}

.page-form__icon-item {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  font-size: 16px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out 0s;
  -ms-flex-preferred-size: 49%;
  flex-basis: 49%;
}

.page-form__form-item {
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -ms-flex-positive: 1;
  flex-grow: 1;
  width: 100%;
  margin-bottom: 10px;
}

.page-form__form-item:last-child {
  margin-bottom: 0;
}

@media screen and (max-width: 1199px) {
  .page-form__icon-row {
    -ms-flex-preferred-size: 62%;
    flex-basis: 62%;
  }

  .page-form__icon-item {
    -ms-flex-preferred-size: 40%;
    flex-basis: 40%;
  }

  .car-mini__grid {
    grid-gap: 10px;
    grid-template-columns: repeat(3, auto);
  }
}

@media screen and (max-width: 1000px) {
  .page-form__icon-img {
    width: 40px;
    height: 40px;
    margin-right: 0;
  }

  .page-form__content {
    padding: 15px;
  }

  .page-form__icon-row {
    -ms-flex-preferred-size: 62%;
  }

  .page-form__icon-item {
    -ms-flex-preferred-size: 48%;
    font-size: 14px;
    -ms-flex-direction: column;
    flex-direction: column;
    row-gap: 10px;
  }

  .car-mini__item-price {
    display: block;
  }
}
@media screen and (max-width: 767px) {
  ul.page-form__icon-row {
    display: grid;
    width: 85%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-gap: 0;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
  }

  form.page-form__form {
    display: block;
  }

  .page-form__icon-text {
    text-align: center;
  }
  .page-form__icon-item{
    max-width: 200px;

  }
}
@media screen and (max-width: 570px) {
  ul.page-form__icon-row {
    width: 100%;
  }
  .page-form__icon-item {
    font-size: 14px;
    display: block;
    text-align: center;
    width: 100%;
    height: 100%;
    -ms-flex-pack: start;
    justify-content: center;
    margin: 0 auto;

  }

  .page-form__icon-img {
    margin: 0 auto 10px;
  }

  .page-form__icon-row {
    margin-bottom: 15px;
  }

  .page-form__main {
    display: block;
  }
}

.taxi{
  margin-top: 30px;

  .page-form__icon-item{
    flex-basis: 24%;
    border: 1px solid #fec000;
    border-radius: 8px;
    justify-content: center;
    flex-wrap: nowrap;

    @media screen and (max-width:1000px) {
      flex-basis: 33%;
      flex-direction: row;
    }
    @media screen and (max-width:767px) {
      flex-basis: 50%;
      border: none;
      justify-content: left;
      max-width: 300px;
    }
    svg{
      fill: black;
      max-width: 21px;
    }
    .page-form__icon-text {
      display: inline-block;
      vertical-align: middle;
      text-transform: uppercase;
      color: #69696a;
      font-weight: 700;
      font-size: 14px;
    }
  }
}
.page-form__icon-row.taxi{
  column-gap: 0 ;
  @media screen and (max-width:767px) {
    display: flex;
    width: 100%;
  }
}
</style>