<template>
    <div class="contain" id="cover">
        <Slider />
        <div class="background">
            <img src="../../assets/background(1).jpg" />
            <div class="background-bg"></div>
        </div>
        <div id="sliderInit" class="title">
            <div class="title-privatni">Tvůj privátní</div>
            <div class="title-wellness">Wellness</div>
            <svg>
                <use xlink:href="#rezervace" />
            </svg>
        </div>
        <Menu />
    </div>
</template>

<script>
import Menu from "./Menu.vue";
import Slider from "./Slider.vue";

export default {
    name: "Background",
    components: {
        Menu,
        Slider,
    },
};
</script>

<style lang="scss" scoped>
.contain {
    position: relative;
    margin: 0 auto;
    width: 100%;
    .background {
        position: relative;
        width: 100%;
        img {
            width: 100%;
            filter: blur(7px);
            max-height: 750px;
        }
        &-bg {
            top: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            background: #472173;
            opacity: 0.5;
            mix-blend-mode: multiply;
        }
    }
    .title {
        z-index: 50;
        position: absolute;
        margin: 0 auto;
        width: 970px;
        top: calc(50% - 366px / 2);
        left: calc(50% - 970px / 2);
        &:hover {
            cursor: pointer;
        }
        &-privatni {
            position: relative;
            width: 405px;
            font-family: "Indie Flower", cursive;
            font-size: 80px;
            line-height: 117px;
            color: #c7b6da;
        }
        &-wellness {
            position: relative;
            top: -46px;
            width: 100%;
            font-size: 250px;
            line-height: 294px;
            font-family: "Italiana", serif;
            color: white;
            z-index: 100;
        }
        svg {
            position: absolute;
            width: 140px;
            height: 140px;
            right: 0px;
            top: 79px;
        }
    }
}
</style>