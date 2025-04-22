<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()
</script>

<template>
<ClientOnly>


    <div class="content">
        <div class="line-icon content__section">
            <ul class="line-icon__list">
                <li class="line-icon__item">
                    <div class="line-icon__icon">
                        <SvgBank/>
                    </div>
                    <div class="line-icon__text">21 банк <br />на выбор</div>
                </li>
                <li class="line-icon__item">
                    <div class="line-icon__icon">
                        <SvgCredit/>
                    </div>
                    <div class="line-icon__text">
                        автокредит <br />от {{ appStore.creditPercent }}%
                    </div>
                </li>
                <li class="line-icon__item">
                    <div class="line-icon__icon">
                        <SvgDiscount/>
                    </div>
                    <div class="line-icon__text">
                        -10% по <br />
                        госпрограмме
                    </div>
                </li>
                <li class="line-icon__item">
                    <div class="line-icon__icon">
                        <SvgWheel/>
                    </div>
                    <div class="line-icon__text">
                        в подарок<br />зимняя резина
                    </div>
                </li>
            </ul>
        </div>
        <!--  -->
    </div>
</ClientOnly>
</template>

<style scoped lang="scss">


// .line-icon__list {
//     display: -ms-flexbox;
//     display: flex;
//     -ms-flex-pack: justify;
//     justify-content: space-between;
//     -ms-flex-align: start;
//     align-items: flex-start;
//     list-style: none;
//     .line-icon__item {
//         text-align: center;
//         transition: all 0.5s;

//         .line-icon__icon {
//             width: 45px;
//             height: 45px;
//             border-radius: 50%;
//             border: 3px solid var(--color-c);
//             display: -ms-flexbox;
//             display: flex;
//             margin: 0 auto;
//             margin-bottom: 10px;
//             transition: all 0.5s;
//             color: var(--color-c);


//             svg {
//                 fill: var(--color-c);
//                 display: block;
//                 width: 45px;
//                 height: 45px !important;
//                 margin: auto;
//                 max-width: 25px;
//                 max-height: 21px;
//             }
//         }
//     }
// }
.content{
    
    margin-bottom: 20px;
}
.line-icon {
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
}
.line-icon__list {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: start;
  align-items: flex-start;
  list-style: none !important;
  padding: 15px;

  @media screen and (max-width: 570px) {
    flex-wrap: wrap;
  }
}
.line-icon__item {
  text-align: center;
  transition: all 0.5s;

  
  @media screen and (max-width: 570px) {
    width: 50%;
  }
}
.line-icon__item path {
  fill: var(--color-c);
}
.line-icon__item .line-icon__text {
  color: black;
  font-size: 14px;
}
.line-icon__icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: -ms-flexbox;
  display: flex;
  margin: 0 auto;
  margin-bottom: 10px;
  transition: all 0.5s;
}
.line-icon__icon svg {
  display: block;
  width: 35px;
  height: 35px;
  margin: auto;
  max-width: 45px;
  max-height: 45px;
  fill: var(--color-c);
}
.line-icon__icon svg path,
.line-icon__text {
  transition: all 0.5s;
}
.line-icon__text {
  text-transform: uppercase;
  color: #adadad;
}
</style>