<template>
    <div class="contain" id="cover">
        <Slider />
        <div id="sliderInit" class="title" @click="titleClick()">
            <div class="title-privatni">Tvůj privátní</div>
            <div class="title-wellness">Wellness</div>
            <svg>
                <use href="#rezervace" @click="isMd ? rezervaceClick() : ''" />
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
                } else {
                    sliderInit.classList.add("hiddenTitle");
                    document.getElementsByClassName("slider__wrap")[0].classList.add("unHiddenForSlide");
                }
            }
        },
    },
    computed: {
        isMd() {
            return this.$mq === "md" ? true : this.$mq === "sm" ? true : false;
        },
    },
};
</script>

<style lang="scss" scoped>
.contain {
    position: relative;
    margin: 0 auto;
    width: 100%;
    overflow: hidden;
    .title {
        position: absolute;
        margin: 0 auto;
        width: fit-content;
        top: calc(50% - 334px / 2);
        left: calc(50% - 314px / 2);
        color: $white;
        transition: 0.25s;
        user-select: none;
        &-privatni {
            position: relative;
            width: fit-content;
            font-family: $indieFlower-font;
            line-height: 58px;
            color: $secondary;
            margin: 0 auto;
        }
        &-wellness {
            position: relative;
            top: 0;
            width: 100%;
            font-size: 85px;
            line-height: 100px;
            font-family: $italiana-font;
            color: inherit;
            margin: 0 auto;
        }
        svg {
            position: relative;
            width: 140px;
            height: 140px;
            right: 0px;
            padding-top: 36px;
            padding-left: 83px;
            fill: $orange;
        }
    }
    @media only screen and (min-width: $md-breakpoint) {
        .title {
            width: 970px;
            top: calc(50% - 366px / 2);
            left: calc(50% - 970px / 2);
            &:hover {
                cursor: pointer;
                color: rgba(255, 255, 255, 0.5);
            }
            &-privatni {
                width: 405px;
                font-size: 80px;
                line-height: 117px;
            }
            &-wellness {
                top: -46px;
                width: 100%;
                font-size: 250px;
                line-height: 294px;
            }
            svg {
                position: absolute;
                width: 140px;
                height: 140px;
                right: 0px;
                top: 79px;
                padding: 0;
            }
        }
    }
}
</style>