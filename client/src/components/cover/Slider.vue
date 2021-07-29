<template>
    <div class="slider__wrap relative">
        <div class="block__slider relative flex content-center">
            <img class="w-100" :class="[isMd ? '' : 'h-auto']" src="../../assets/background.webp" />
            <img class="w-100" :class="[isMd ? '' : 'h-auto']" src="../../assets/background.webp" />
        </div>
        <div class="background absolute w-100 h-100"></div>
        <div class="absolute t-0 w-100 h-100 align-center flex">
            <div class="block__sliderButtons flex relative content-between align-center w-100 mx-auto">
                <div class="block__sliderButtons-nextBtn relative grid" :class="isSlider ? '' : 'invisible'">
                    <svg class="m-auto"><use href="#arrowScroll" /></svg>
                </div>
                <div class="block__sliderButtons-prevBtn relative grid" :class="isSlider ? '' : 'invisible'">
                    <svg class="m-auto"><use href="#arrowScroll" /></svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { tns } from "tiny-slider/src/tiny-slider.js";
import "tiny-slider/dist/tiny-slider.css";

export default {
    name: "Slider",
    inject: ["windowInfo"],
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
            return this.windowInfo.size * (this.$rem / parseFloat(getComputedStyle(document.documentElement).fontSize)) < this.$md ? true : false;
        },
    },
};
</script>

<style lang="scss" scoped>
.background {
    top: 0;
    background: #472173;
    opacity: 0.5;
    mix-blend-mode: multiply;
}
.block__slider {
    width: 100%;
    max-height: 46.875rem;
    img {
        filter: blur(7px);
        height: 34.375rem;
    }
}
.block__sliderButtons {
    transition: $transition;
    opacity: 0;
    height: 4.375rem;
    max-width: 81.875rem;
    &-nextBtn,
    &-prevBtn {
        width: 3.75rem;
        height: 3.75rem;
        background: $white;
        border-radius: 50%;
        transition: $transition-fast;
        z-index: 1;
        margin-left: 4.6875rem;
        svg {
            width: 2.25rem;
            height: 2.25rem;
            fill: $secondary;
        }
    }
    &-prevBtn {
        margin-right: 4.6875rem;
        transform: rotate(180deg);
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .block__slider img {
        max-height: 46.875rem;
    }
}
</style>