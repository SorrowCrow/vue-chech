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
                // gutter: 100,
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
    min-width: 42.5rem;
    height: 1.375rem;
    fill: $medium-beige;
    background: white;
}
.contain {
    color: $deepblue;
    background: $medium-beige;
    .content {
        max-width: 60.625rem;
        padding-right: 1.875rem;
        padding-left: 1.875rem;
        .carouselContainer {
            .footer__carousel {
                &-nextBtn,
                &-prevBtn {
                    top: 5rem;
                    width: 3.75rem;
                    height: 3.75rem;
                    background: $white;
                    border-radius: 50%;
                    transition: $transition-fast;
                    svg {
                        width: 2.25rem;
                        height: 2.25rem;
                        fill: $deepblue;
                    }
                }
                &-prevBtn {
                    transform: rotate(180deg);
                }
                &-slide {
                    font-weight: 300;
                    font-size: 1.5625rem;
                    line-height: 2.3438rem;
                    width: 100%;
                }
            }
            padding-top: 2.5rem;
            .buttons {
                padding-top: 1.875rem;
                grid-column-gap: 1.875rem;
            }
            .wave {
                padding-top: 3.125rem;
                padding-bottom: 1.625rem;
                width: 100%;
                height: 1.1875rem;
                fill: black;
                fill-opacity: 0.09;
            }
        }
        a {
            color: $deepblue;
        }
        &__number {
            font-family: $playfair-font;
            font-size: 2.8125rem;
            letter-spacing: -0.03em;
            padding-bottom: 2.5625rem;
        }

        &__links {
            padding-top: 2.8125rem;
            padding-bottom: 3.75rem;
            a {
                margin-left: 0.625rem;
                margin-right: 0.625rem;
            }
            svg {
                width: 3.125rem;
                height: 3.125rem;
                fill: $deepblue;
            }
        }
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .containerWave {
        width: 100%;
        height: 1.375rem;
    }
    .contain {
        .content {
            .carouselContainer {
                padding-top: 8.1875rem;
                .footer__carousel {
                    &-nextBtn,
                    &-prevBtn {
                        z-index: 1;
                        &:hover {
                            width: 4.375rem;
                            height: 4.375rem;
                            bottom: 49.5%;
                        }
                    }
                    &-slide {
                        font-weight: 300;
                        font-size: 3.125rem;
                        line-height: 150%;
                        width: 48.125rem;
                    }
                }
                .buttons {
                    padding-top: 0px;
                    margin-top: -6.25rem;
                    height: 4.375rem;
                    justify-content: space-between;
                }
                .wave {
                    padding-top: 3.125rem;
                    padding-bottom: 2.75rem;
                    width: 100%;
                    height: min-content;
                }
            }
            &__number {
                font-size: 6.25rem;
                line-height: 8.3125rem;
            }
        }
    }
}
</style>