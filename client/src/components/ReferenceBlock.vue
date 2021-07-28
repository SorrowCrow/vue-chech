<template>
    <footer class="contain x-hidden">
        <svg class="mx-auto containerWave relative">
            <use href="#containerWave" />
        </svg>
        <div class="content mx-auto">
            <div class="carouselContainer">
                <div class="footer__carousel h-p" id="reference">
                    <div>
                        <div class="footer__carousel-slide text-center user-select-none m-auto">Super prostředí, čistota a soukromí. Doporučuji! — 5/5</div>
                    </div>
                    <div>
                        <div class="footer__carousel-slide text-center user-select-none m-auto">Super prostředí, čistota a soukromí. Doporučuji! — 5/5</div>
                    </div>
                </div>
                <div class="buttons flex content-center align-center">
                    <div class="footer__carousel-nextBtn grid h-p">
                        <svg class="m-auto"><use href="#arrowScroll" /></svg>
                    </div>
                    <div class="footer__carousel-prevBtn grid h-p">
                        <svg class="m-auto"><use href="#arrowScroll" /></svg>
                    </div>
                </div>
                <svg class="mx-auto wave">
                    <use href="#wave" />
                </svg>
            </div>
            <a class="mx-auto content__number text-decoration-none h-fit-content max-content text-center block" href="tel:+420 286 851 738">+420 286 851 738</a>
            <div class="sub-title grid text-center">
                Krnska 350/26, Praha 19700
                <a class="mx-auto content__email text-decoration-none" href="mailto:sauna@marieluisa.cz">sauna@marieluisa.cz</a>
            </div>
            <div class="mx-auto content__links max-content">
                <a class="text-decoration-none inline-block" href="https://facebook.com" target="_blank" rel="noopener">
                    <svg class="h-p">
                        <use href="#facebook" rel="noopener" />
                    </svg>
                </a>
                <a class="text-decoration-none inline-block" href="https://instagram.com" target="_blank" rel="noopener">
                    <svg class="h-p">
                        <use href="#instagram" rel="noopener" />
                    </svg>
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
import { tns } from "tiny-slider/src/tiny-slider.js";
import "tiny-slider/dist/tiny-slider.css";

export default {
    name: "ReferenceBlock",
    methods: {
        carousel() {
            tns({
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
        },
    },
    mounted: function () {
        this.carousel();
    },
};
</script>

<style lang="scss" scoped>
.containerWave {
    width: 100%;
    min-width: 680px;
    height: 22px;
    fill: $medium-beige;
    background: white;
}
.contain {
    color: $deepblue;
    background: $medium-beige;
    .content {
        max-width: 970px;
        padding-right: 30px;
        padding-left: 30px;
        .carouselContainer {
            .footer__carousel {
                &-nextBtn,
                &-prevBtn {
                    top: 80px;
                    width: 60px;
                    height: 60px;
                    background: $white;
                    border-radius: 50%;
                    transition: 0.2s;
                    svg {
                        width: 36px;
                        height: 36px;
                        fill: $deepblue;
                    }
                }
                &-prevBtn {
                    transform: rotate(180deg);
                }
                &-slide {
                    font-weight: 300;
                    font-size: 25px;
                    line-height: 37.5px;
                    width: 100%;
                }
            }
            padding-top: 40px;
            .buttons {
                padding-top: 30px;
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
        }
        &__number {
            font-family: $playfair-font;
            font-size: 45px;
            letter-spacing: -0.03em;
            padding-bottom: 41px;
        }

        &__links {
            padding-top: 45px;
            padding-bottom: 60px;
            a {
                margin-left: 10px;
                margin-right: 10px;
            }
            svg {
                width: 50px;
                height: 50px;
                fill: $deepblue;
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
                        z-index: 1;
                        &:hover {
                            width: 70px;
                            height: 70px;
                            bottom: 49.5%;
                        }
                    }
                    &-slide {
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
                    height: min-content;
                }
            }
            &__number {
                font-size: 100px;
                line-height: 133px;
            }
        }
    }
}
</style>