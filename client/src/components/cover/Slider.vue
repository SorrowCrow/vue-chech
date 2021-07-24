<template>
    <div class="slider__wrap">
        <div class="block__slider relative flex content-center">
            <img src="../../assets/background.webp" />
            <img src="../../assets/background.webp" />
        </div>
        <div class="background absolute"></div>
        <div class="block__sliderButtons flex absolute content-between align-center">
            <div class="block__sliderButtons-nextBtn relative grid" :class="isSlider ? '' : 'invisible'">
                <svg class="m-auto"><use href="#arrowScroll" /></svg>
            </div>
            <div class="block__sliderButtons-prevBtn relative grid" :class="isSlider ? '' : 'invisible'">
                <svg class="m-auto"><use href="#arrowScroll" /></svg>
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
    top: 0;
    width: 100%;
    height: 100%;
    background: #472173;
    opacity: 0.5;
    mix-blend-mode: multiply;
}
.block__slider {
    width: 100%;
    max-height: 750px;
    img {
        width: auto !important;
        filter: blur(7px);
        height: 550px;
    }
}
.block__sliderButtons {
    transition: $transition;
    opacity: 0;
    bottom: 50%;
    height: 70px;
    width: 100%;
    grid-column-gap: 30px;
    &-nextBtn,
    &-prevBtn {
        width: 60px;
        height: 60px;
        margin-left: 75px;
        background: $white;
        border-radius: 50%;
        transition: 0.2s;
        z-index: 1;
        svg {
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
@media only screen and (min-width: $md-breakpoint) {
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