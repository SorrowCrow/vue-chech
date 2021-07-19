<template>
    <div class="slider__wrap">
        <div class="block__slider">
            <img src="../../assets/background.webp" />
            <img src="../../assets/background.webp" />
        </div>
        <div class="background"></div>
        <div class="block__sliderButtons">
            <div class="block__sliderButtons-nextBtn" :class="isSlider ? '' : 'buttonsHidden'">
                <svg><use href="#arrowScroll" /></svg>
            </div>
            <div class="block__sliderButtons-prevBtn" :class="isSlider ? '' : 'buttonsHidden'">
                <svg><use href="#arrowScroll" /></svg>
            </div>
        </div>
    </div>
</template>

<script>
import { tns } from "tiny-slider/src/tiny-slider.js";
import "tiny-slider/dist/tiny-slider.css";

export default {
    name: "Slider",
    props: {
        isSlider: Boolean,
    },
    methods: {
        carousel() {
            tns({
                container: ".block__slider",
                items: 1,
                slideBy: "page",
                mouseDrag: true,
                center: true,
                speed: 400,
                nav: false,
                controlsContainer: ".block__sliderButtons",
            });
        },
    },
    mounted: function () {
        console.log(this.isSlider);
        this.carousel();
    },
    computed: {
        isMd() {
            return this.$mq === "md" ? true : this.$mq === "sm" ? true : false;
        },
    },
};
</script>

<style lang="scss" scoped>
.background {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: #472173;
    opacity: 0.5;
    mix-blend-mode: multiply;
}
.block__slider {
    position: relative;
    width: 100%;
    max-height: 750px;
    display: flex;
    justify-content: center;
    img {
        width: auto !important;
        filter: blur(7px);
        height: 550px;
    }
}
.block__sliderButtons {
    opacity: 0;
    position: absolute;
    bottom: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    width: 100%;
    grid-column-gap: 30px;
    .buttonsHidden {
        visibility: hidden;
    }
    &-nextBtn,
    &-prevBtn {
        position: relative;
        display: grid;
        width: 60px;
        height: 60px;
        overflow: hidden;
        margin-left: 75px;
        background: $white;
        border-radius: 50%;
        transition: 0.2s;
        z-index: 1;
        svg {
            margin: auto;
            width: 36px;
            height: 36px;
            fill: $secondary;
        }
    }
    &-prevBtn {
        margin-right: 75px;
        transform: rotate(180deg);
    }
}
@media only screen and (min-width: $background-breakpoint) {
    .background {
        height: calc(100% - 29px);
    }
    .block__slider img {
        height: auto;
        max-height: 750px;
        width: 100% !important;
    }
}
</style>