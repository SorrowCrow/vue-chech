<template>
    <svg class="mx-auto containerWave">
        <use xlink:href="#containerWave" />
    </svg>
    <footer class="contain">
        <div class="content mx-auto">
            <div class="carouselContainer">
                <div class="footer__carousel" id="reference">
                    <div>
                        <div class="footer__carousel-slide">Super prostředí, čistota a soukromí. Doporučuji! — 5/5</div>
                    </div>
                    <div>
                        <div class="footer__carousel-slide">Super prostředí, čistota a soukromí. Doporučuji! — 5/5</div>
                    </div>
                    <div>
                        <div class="footer__carousel-slide">Super prostředí, čistota a soukromí. Doporučuji! — 5/5</div>
                    </div>
                </div>
                <div class="buttons">
                    <div class="footer__carousel-nextBtn">
                        <svg><use xlink:href="#arrowScroll" /></svg>
                    </div>
                    <div class="footer__carousel-prevBtn">
                        <svg><use xlink:href="#arrowScroll" /></svg>
                    </div>
                </div>
                <svg class="mx-auto wave">
                    <use xlink:href="#wave" />
                </svg>
            </div>
            <a class="mx-auto content__number" href="tel:+420 286 851 738">+420 286 851 738</a>
            <div class="sub-title">
                Krnska 350/26, Praha 19700
                <a class="mx-auto content__email" href="mailto:sauna@marieluisa.cz">sauna@marieluisa.cz</a>
            </div>
            <div class="mx-auto content__links">
                <a href="https://facebook.com" target="_blank">
                    <svg>
                        <use xlink:href="#facebook" />
                    </svg>
                </a>
                <a href="https://instagram.com" target="_blank">
                    <svg>
                        <use xlink:href="#instagram" />
                    </svg>
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.min.js";
// import $ from "jquery";
import { tns } from "tiny-slider/src/tiny-slider.js";
import "tiny-slider/dist/tiny-slider.css";

// $(document).ready(function () {
//     $(".footer__carousel").slick({
//         dots: false,
//         arrows: true,
//         infinite: true,
//         speed: 300,
//         slidesToShow: 1,
//         prevArrow: '<div class="footer__carousel-nextBtn"><svg>  <use xlink:href="#arrowScroll" /> </svg></div>',
//         nextArrow: '<div class="footer__carousel-prevBtn"><svg>  <use xlink:href="#arrowScroll" /> </svg></div>',
//         responsive: [
//             {
//                 breakpoint: 768,
//             },
//         ],
//     });
// });
export default {
    name: "ReferenceBlock",
    methods: {
        carousel() {
            let slider = tns({
                container: ".footer__carousel",
                items: 1,
                slideBy: "page",
                mouseDrag: true,
                center: true,
                speed: 400,
                nav: false,
                controlsContainer: ".buttons",
                gutter: 100,
            });
            console.log(slider);
        },
    },
    mounted: function () {
        this.carousel();
    },
};
</script>

<style lang="scss" scoped>
.containerWave {
    position: relative;
    width: 100%;
    min-width: 680px;
    height: 22px;
    fill: $medium-beige;
}
.contain {
    color: $deepblue;
    margin-top: -4px;
    background: $medium-beige;
    .content {
        max-width: 970px;
        padding-right: 30px;
        padding-left: 30px;
        .carouselContainer {
            .footer__carousel {
                &-nextBtn,
                &-prevBtn {
                    display: grid;
                    top: 80px;
                    @include wh(60px, 60px);
                    background: $white;
                    border-radius: 50%;
                    transition: 0.2s;
                    svg {
                        margin: auto;
                        width: 36px;
                        height: 36px;
                        fill: $deepblue;
                    }
                }
                &-prevBtn {
                    transform: rotate(180deg);
                }
                &-slide {
                    text-align: center;
                    font-weight: 300;
                    font-size: 25px;
                    line-height: 37.5px;
                    width: 100%;
                }
            }
            padding-top: 40px;
            .buttons {
                padding-top: 30px;
                display: flex;
                justify-content: center;
                grid-column-gap: 30px;
            }
            .wave {
                padding-top: 50px;
                padding-bottom: 26px;
                width: 100%;
                height: 19px;
                fill: black;
                fill-opacity: 0.09;
            }
        }
        a {
            color: $deepblue;
            text-decoration: none;
        }
        &__number {
            height: fit-content;
            display: block;
            width: max-content;
            font-family: $playfair-font;
            font-size: 45px;
            text-align: center;
            letter-spacing: -0.03em;
            padding-bottom: 41px;
        }
        .sub-title {
            display: grid;
            text-align: center;
        }
        &__links {
            display: grid;
            grid-template-columns: auto auto;
            grid-column-gap: 20px;
            width: min-content;
            padding-top: 45px;
            padding-bottom: 60px;
            svg {
                width: 50px;
                height: 50px;
                fill: $deepblue;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .containerWave {
        width: 100%;
        height: 22px;
    }
    .contain {
        .content {
            .carouselContainer {
                padding-top: 131px;
                .footer__carousel {
                    &-nextBtn,
                    &-prevBtn {
                        display: grid;
                        align-self: center;
                        @include wh(60px, 60px);
                        background: $white;
                        border-radius: 50%;
                        transition: 0.2s;
                        z-index: 1;
                        svg {
                            margin: auto;
                            width: 36px;
                            height: 36px;
                            fill: $deepblue;
                        }
                        &:hover {
                            cursor: pointer;
                            width: 70px;
                            height: 70px;
                            bottom: 49.5%;
                            svg {
                                width: 36px;
                                height: 36px;
                            }
                        }
                    }
                    &-prevBtn {
                        transform: rotate(180deg);
                    }
                    &-slide {
                        margin: auto;
                        text-align: center;
                        font-weight: 300;
                        font-size: 50px;
                        line-height: 150%;
                        width: 770px;
                    }
                }
                .buttons {
                    padding-top: 0px;
                    margin-top: -100px;
                    height: 70px;
                    justify-content: space-between;
                }
                .wave {
                    padding-top: 50px;
                    padding-bottom: 44px;
                    width: 100%;
                    fill: black;
                    fill-opacity: 0.09;
                    height: min-content;
                }
            }
            a {
                color: $deepblue;
                text-decoration: none;
            }
            &__number {
                display: block;
                width: max-content;
                font-family: $playfair-font;
                font-size: 100px;
                line-height: 133px;
                text-align: center;
                letter-spacing: -0.03em;
                padding-bottom: 41px;
            }
            .sub-title {
                display: grid;
                text-align: center;
            }
            &__links {
                display: grid;
                grid-template-columns: auto auto;
                grid-column-gap: 20px;
                width: min-content;
                padding-top: 45px;
                padding-bottom: 60px;
                svg {
                    width: 50px;
                    height: 50px;
                    fill: $deepblue;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>