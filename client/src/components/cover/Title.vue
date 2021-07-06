<template>
    <div class="contain" id="cover">
        <Slider v-if="!isMd" />
        <div class="background">
            <img id="sliderCover" src="../../assets/background(1).jpg" />
            <div class="background-bg"></div>
        </div>
        <div id="sliderInit" class="title" @click="titleClick()">
            <div class="title-privatni">Tvůj privátní</div>
            <div class="title-wellness">Wellness</div>
            <svg>
                <use xlink:href="#rezervace" @click="isMd ? rezervaceClick() : ''" />
            </svg>
        </div>
        <Menu />
    </div>
</template>

<script>
import Menu from "./Menu.vue";
import Slider from "./Slider.vue";
import $ from "jquery";

export default {
    name: "Background",
    components: {
        Menu,
        Slider,
    },
    methods: {
        rezervaceClick() {
            $([document.documentElement, document.body]).animate(
                {
                    scrollTop: $("#book").offset().top,
                },
                500
            );
        },
        titleClick() {
            if (!this.isMd) {
                if ($("#sliderInit").hasClass("hiddenForSlide")) {
                    $("#sliderInit").removeClass("hiddenForSlide", 500);
                    $("#sliderCover").removeClass("hiddenForSlide", 500);
                    $(".block__slider").addClass("hiddenForSlide", 500);
                } else {
                    $("#sliderInit").addClass("hiddenForSlide", 500);
                    $("#sliderCover").addClass("hiddenForSlide", 500);
                    $(".block__slider").removeClass("hiddenForSlide", 500);
                }
            }
        },
    },
    computed: {
        isMd() {
            $("#sliderInit").removeClass("hiddenForSlide", 500);
            $("#sliderCover").removeClass("hiddenForSlide", 500);
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
    .background {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        img {
            width: auto;
            filter: blur(7px);
            height: 550px;
        }
        &-bg {
            position: absolute;
            width: 100%;
            height: 100%;
            background: #472173;
            opacity: 0.5;
            mix-blend-mode: multiply;
        }
    }
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
    @media only screen and (min-width: $background-breakpoint) {
        .background {
            img {
                height: auto;
                max-height: 750px;
                width: 100%;
            }
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