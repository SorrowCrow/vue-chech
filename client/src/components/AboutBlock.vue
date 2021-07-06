<template>
    <div class="contain mx-auto">
        <div class="title-container">
            <div>
                <div class="title" id="about">O nás</div>
                <div class="sub-title">Sauna is located in noiseless part of Prague, only a 15-minute drive from the historical city centre. It offers free Wi-Fi, free parking and English breakfast. All rooms provide satellite TV, a bathroom and a seating area.</div>
                <div class="background">
                    <div class="MagnifyingGlass" @click="isMd ? '' : magnifyingGlassClick()">
                        <svg>
                            <use xlink:href="#magnifyingGlass" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="services mx-auto">
            <div class="services__item">
                <svg class="frame1">
                    <use xlink:href="#frame1" />
                </svg>
                Vířivka
            </div>
            <div class="services__item">
                <svg class="frame2">
                    <use xlink:href="#frame2" />
                </svg>
                Sauna
            </div>
            <div class="services__item">
                <svg class="frame3">
                    <use xlink:href="#frame3" />
                </svg>
                Bazén
            </div>
            <div class="services__item">
                <svg class="frame4">
                    <use xlink:href="#frame4" />
                </svg>
                Odpočívárna
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
$(document).ready(function () {});

export default {
    name: "AboutBlock",
    computed: {
        isMd() {
            return this.$mq === "md" ? true : this.$mq === "sm" ? true : false;
        },
    },
    methods: {
        magnifyingGlassClick() {
            $([document.documentElement, document.body]).animate(
                {
                    scrollTop: $("#cover").offset().top,
                },
                500
            );
            $("#sliderInit").addClass("hiddenForSlide", 1000);
            $("#sliderCover").addClass("hiddenForSlide", 1000);
            $(".block__slider").removeClass("hiddenForSlide", 1000);
        },
    },
};
</script>

<style lang="scss" scoped>
.contain {
    padding-bottom: 65px;
    color: $deepblue;
    width: 100%;
    .title-container {
        display: grid;
        grid-template-columns: auto;
        padding-left: 30px;
        .title {
            width: max-content;
            padding-top: 53px;
            line-height: 107px;
        }
        .sub-title {
            display: flex;
            align-items: flex-start;
            position: relative;
            padding-left: 69px;
            padding-right: 100px;
            padding-top: 50px;
            padding-bottom: 115px;
            // max-width: 350px;
            background: $medium-beige;
            border-radius: 0px 300px 300px 0px;
            margin-left: -60px;
        }
        .background {
            position: relative;
            background-image: url("../assets/pic.png");
            background-position: top right;
            background-repeat: no-repeat;
            background-size: contain;
            margin-top: -77px;
            width: 100%;
            height: 100vw;
            max-height: 570px;
            margin-right: 30px;
            display: flex;
            justify-content: flex-end;
            .MagnifyingGlass {
                position: relative;
                align-self: flex-end;
                display: grid;
                @include wh(66px, 66px);
                background: $white;
                border-radius: 50%;
                transition: 0.2s;
                bottom: 100px;
                svg {
                    margin: auto;
                    width: 33px;
                    height: 33px;
                    stroke: $deepblue;
                }
                &:hover {
                    width: 80px;
                    height: 80px;
                    cursor: pointer;
                    svg {
                        stroke: $orange;
                    }
                }
            }
        }
    }
    .services {
        position: relative;
        display: grid;
        grid-column-gap: 19px;
        grid-template-columns: auto auto;
        justify-content: space-between;
        width: max-content;

        font-family: $playfair-font;
        &__item {
            @include wh(148px, 150px);
            display: grid;
            justify-content: center;
            text-align: center;
            font-size: 20px;
            line-height: 27px;
            svg {
                padding-bottom: 20px;
                stroke: $beige;
            }
            .frame1 {
                width: 97px;
                height: 83px;
                padding-top: 2px;
            }
            .frame2 {
                width: 64px;
                height: 73px;
                padding-top: 15px;
            }
            .frame3 {
                width: 97px;
                height: 62px;
                padding-top: 35px;
            }
            .frame4 {
                width: 84px;
                height: 72px;
                padding-top: 26px;
                margin: auto;
            }
        }
    }
}
@media only screen and (min-width: 670px) {
    .contain {
        .services {
            display: flex;
        }
    }
}
@media only screen and (min-width: 850px) {
    .contain {
        // display: grid;
        // justify-content: center;
        // .title-container {
        //     padding: 0;
        //     max-width: 970px;
        //     width: 100%;
        //     .sub-title {
        //         align-items: center;
        //         z-index: 1;
        //         max-width: 500px;
        //     }
        //     .background {
        //         margin-top: -300px;
        //         .MagnifyingGlass {
        //             @include wh(100px, 100px);
        //             bottom: 70px;
        //             svg {
        //                 width: 50px;
        //                 height: 50px;
        //             }
        //             &:hover {
        //                 width: 110px;
        //                 height: 110px;
        //             }
        //         }
        //     }
        // }
        .services {
            display: flex;
        }
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .contain {
        padding-top: 65px;
        padding-bottom: 36px;
        color: $deepblue;
        max-width: 970px;
        display: grid;
        justify-content: center;
        .title-container {
            padding: 0;
            max-width: 970px;
            .sub-title {
                align-items: center;
                margin-left: -100px;
                padding-left: 100px;
                padding-bottom: 0;
                padding-top: 0;
                margin-top: 58px;
                max-width: 570px;
                height: 350px;
                border-radius: 150px 300px 300px 0px;
                z-index: 1;
            }
            .background {
                margin-top: -570px;
                .MagnifyingGlass {
                    @include wh(100px, 100px);
                    bottom: 70px;
                    svg {
                        width: 50px;
                        height: 50px;
                    }
                    &:hover {
                        width: 110px;
                        height: 110px;
                    }
                }
            }
        }
        .services {
            position: relative;
            display: flex;
            justify-content: space-between;
            width: 1010px;
            padding-top: 80px;
            padding-bottom: 86px;

            font-family: $playfair-font;
            &__item {
                @include wh(230px, 197px);
                display: grid;
                justify-content: center;
                text-align: center;
                font-size: 30px;
                line-height: 40px;
                svg {
                    padding-bottom: 35px;
                    stroke: $beige;
                }
                .frame1 {
                    width: 150px;
                    height: 129px;
                    padding-top: 2px;
                }
                .frame2 {
                    width: 100px;
                    height: 113px;
                    padding-top: 18px;
                }
                .frame3 {
                    width: 150px;
                    height: 97px;
                    padding-top: 35px;
                }
                .frame4 {
                    width: 200px;
                    height: 113px;
                    padding-top: 26px;
                    padding-bottom: 27px;
                }
            }
        }
    }
}
</style>