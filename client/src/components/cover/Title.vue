<template>
    <Header />
    <div class="contain relative grid content-center" id="cover">
        <Slider :isSlider="isSlider" />
        <div class="absolute flex content-center w-100" :class="!isMd ? 'align-self-center' : 'title-wrap'">
            <div id="sliderInit" :class="!isMd ? 'h-p' : ''" class="relative title fit-content user-select-none relative" @click="titleClick()">
                <div class="title-privatni relative fit-content" :class="isMd ? 'mx-auto' : ''">Tvůj privátní</div>
                <div class="title-wellness relative mx-auto">Wellness</div>
                <svg class="relative" :class="!isMd ? 'absolute' : ''">
                    <use href="#rezervace" @click="isMd ? rezervaceClick() : ''" />
                </svg>
            </div>
        </div>
        <Menu />
    </div>
</template>

<script>
import Menu from "./Menu.vue";
import Slider from "./Slider.vue";
import Header from "./Header.vue";

export default {
    name: "Background",
    components: {
        Menu,
        Slider,
        Header,
    },
    inject: ["windowInfo"],
    data() {
        return {
            isSlider: false,
        };
    },
    created() {
        window.addEventListener("resize", this.hideUnhide);
    },
    methods: {
        hideUnhide() {
            if (this.isMd) {
                document.getElementById("sliderInit").classList.remove("hiddenTitle");
                document.getElementsByClassName("slider__wrap")[0].classList.remove("unHiddenForSlide");
            }
        },
        rezervaceClick() {
            window.scrollTo({
                top: document.querySelector("#book").offsetTop,
                behavior: "smooth",
            });
        },
        titleClick() {
            if (!this.isMd) {
                let sliderInit = document.getElementById("sliderInit");
                if (sliderInit.classList.contains("hiddenTitle")) {
                    sliderInit.classList.remove("hiddenTitle");
                    document.getElementsByClassName("slider__wrap")[0].classList.remove("unHiddenForSlide");
                    this.isSlider = false;
                } else {
                    sliderInit.classList.add("hiddenTitle");
                    document.getElementsByClassName("slider__wrap")[0].classList.add("unHiddenForSlide");
                    this.isSlider = true;
                }
            }
        },
    },
    computed: {
        isMd() {
            return this.windowInfo.size * (this.$rem / parseFloat(getComputedStyle(document.documentElement).fontSize)) < this.$md ? true : false;
        },
    },
};
</script>

<style lang="scss" scoped>
.title-wrap {
    bottom: 3.125rem;
}
.title {
    color: $white;
    transition: $transition;
    &-privatni {
        font-family: $indieFlower-font;
        color: $secondary;
    }
    &-wellness {
        top: 0;
        width: 100%;
        font-size: 5.3125rem;
        font-family: $italiana-font;
    }
    svg {
        width: 8.75rem;
        height: 8.75rem;
        right: 0;
        padding-top: 2.25rem;
        padding-left: 5.1875rem;
        fill: $orange;
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .title {
        width: 60.625rem;
        &:hover {
            color: rgba(255, 255, 255, 0.5);
        }
        &-privatni {
            font-size: 5rem;
            line-height: 7.3125rem;
        }
        &-wellness {
            margin-top: -2.875rem;
            width: 100%;
            font-size: 15.625rem;
        }
        svg {
            width: 8.75rem;
            height: 8.75rem;
            right: 0px;
            top: 4.9375rem;
            padding: 0;
        }
    }
}
</style>