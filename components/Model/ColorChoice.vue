<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

const colors = ref(newStore.model.colored_galleries)
</script>

<template>
    <div class="model__info">
        <ModelSmallChar/>
    </div>
    <div class="model__image">
        <div class="model__img">
            <img :src="`${colors[newStore.color]?.url}`" alt="" />

        </div>

        <!-- <div class="color-choice">
            <div class="color-choice__title">
                Выбранный цвет: {{ colors[newStore.color]?.color?.color }}
            </div>

            <div class="color-choice__colors">
                <div class="color-choice__color" v-for="(color, index) in colors" :key="color.id"
                    @click="newStore.color = index" :style="{ display: color.color.hex ? `block` : `none` }"
                    :class="{ 'color-choice__color--active': newStore.color == index }">
                    <div class="color-choice__color-inner" :style="{ background: color.color.hex }" />
                </div>
            </div>
        </div> -->
        <div class="color-choice">
            <!-- <div class="color-choice__title">
                {{ colors[newStore.color]?.color?.color }}
            </div> -->
            <div class="color-choice__colors">
                <div class="color-choice__color" v-for="(color, index) in colors" :key="color.id"
                    @click="newStore.color = index" :style="{ display: color.color.hex ? `block` : `none`,background: color.color.hex }"
                    :class="{ 'color-choice__color--active': newStore.color == index }">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.model__info{
    padding-top: 20px;
}

.model__image{
    
    width: 100%;
    max-width: 550px;
    .model__img{
        width: 100%;
        margin: 0 auto;
        min-height: 300px;
        display: flex;

        @media screen and (max-width: 570px) {
            min-height: auto;
        }

        img{
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }
    
    .color-choice__title{
        margin-bottom: 5px;
        font-weight: 700;
    }

    .color-choice__colors{
        width: 110%;
        display: flex;
        overflow-x: auto;
        
        .color-choice__color{
            width: 60px;
            height: 20px;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            border: 1px solid #dedede;
            margin-right: 10px;
            cursor: pointer;
            transition: all 0.2s ease-in-out 0s;
            
        }
        @media screen and (max-width:1000px){
            width: 100%;
        }
    }
//     .color-choice__colors::-webkit-scrollbar{
//         position: absolute;
//         top: 0;
//             height: 5px;
//             background: gray;
//         }
//         .color-choice__colors::-webkit-scrollbar-thumb{
            
//             background-color: blue;    /* цвет плашки */
//   border-radius: 20px;       /* закругления плашки */
//   border: 3px solid orange;
//         }
    @media screen and (max-width:1000px) {
        max-width: 370px;
    }
    @media screen and (max-width:767px) {
        max-width: 500px;
    }
    
}
</style>