<template>
    <div class="contain x-hidden mx-auto">
        <div class="title-container grid">
            <div class="title" id="about">O nás</div>
            <div class="sub-title">Sauna is located in noiseless part of Prague, only a 15-minute drive from the historical city centre. It offers free Wi-Fi, free parking and English breakfast. All rooms provide satellite TV, a bathroom and a seating area.</div>
            <div class="background flex relative content-flex-end">
                <div class="MagnifyingGlass relative align-self-end grid h-p" @click="magnifyingGlassClick()">
                    <svg class="m-auto">
                        <use href="#magnifyingGlass" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="services mx-auto relative grid content-space-between max-content">
            <div class="services__item grid content-center text-center">
                <svg class="frame1">
                    <use href="#frame1" />
                </svg>
                Vířivka
            </div>
            <div class="services__item grid content-center text-center">
                <svg class="frame2">
                    <use href="#frame2" />
                </svg>
                Sauna
            </div>
            <div class="services__item grid content-center text-center">
                <svg class="frame3">
                    <use href="#frame3" />
                </svg>
                Bazén
            </div>
            <div class="services__item grid content-center text-center">
                <svg class="frame4 m-auto">
                    <use href="#frame4" />
                </svg>
                Odpočívárna
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AboutBlock",
    inject: ["windowInfo"],

    methods: {
        magnifyingGlassClick() {
            window.scrollTo({
                top: document.getElementById("cover").offsetTop,
                behavior: "smooth",
            });
            document.getElementById("sliderInit").click();
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
.contain {
    padding-bottom: 4.0625rem;
    color: $deepblue;
    max-width: 73.125rem;
    padding-left: 1.875rem;
    padding-right: 1.875rem;
    margin-top: 2.625rem;

    .title-container {
        grid-template-columns: auto;
        .title {
            padding-top: 3.3125rem;
        }
        .sub-title {
            padding: 2.875rem 6.25rem 7.1875rem 1.875rem;
            background: $medium-beige;
            border-radius: 0 18.75rem 18.75rem 0;
            margin-left: -1.875rem;
            margin-right: -4.5rem;
        }
        .background {
            background-image: url("../assets/pic.webp");
            background-position: top right;
            background-repeat: no-repeat;
            background-size: contain;
            margin-top: -4.8125rem;
            width: 100%;
            height: 100vw;
            max-height: 35.625rem;
            margin-right: 1.875rem;
            .MagnifyingGlass {
                width: 4.125rem;
                height: 4.125rem;
                background: $white;
                border-radius: 50%;
                transition: $transition-fast;
                bottom: 6.25rem;
                svg {
                    width: 2.0625rem;
                    height: 2.0625rem;
                    stroke: $deepblue;
                }
                &:hover {
                    width: 5rem;
                    height: 5rem;
                    svg {
                        stroke: $orange;
                    }
                }
            }
        }
    }
    .services {
        grid-template-columns: auto auto;
        grid-column-gap: 1.1875rem;

        font-family: $playfair-font;
        &__item {
            width: 9.25rem;
            height: 9.375rem;
            font-size: 1.25rem;
            svg {
                padding-bottom: 1.25rem;
                stroke: $beige;
            }
            .frame1 {
                width: 6.0625rem;
                height: 5.1875rem;
                padding-top: 0.125rem;
            }
            .frame2 {
                width: 4rem;
                height: 4.5625rem;
                padding-top: 0.9375rem;
            }
            .frame3 {
                width: 6.0625rem;
                height: 3.875rem;
                padding-top: 2.1875rem;
            }
            .frame4 {
                width: 5.25rem;
                height: 4.5rem;
                padding-top: 1.625rem;
            }
        }
    }
}
@media only screen and (min-width: $sm-breakpoint) {
    .contain {
        display: grid;
        justify-content: center;
        margin: initial auto;
        margin-top: 5.9375rem;

        .services {
            display: flex;
        }
        .title-container {
            .sub-title {
                z-index: 1;
                max-width: 21.875rem;
                border-radius: 9.375rem 18.75rem 18.75rem 0;
                padding-bottom: 2.875rem;
                padding-right: 3.125rem;
            }
            .background {
                margin-top: -19.4531rem;
                .MagnifyingGlass {
                    width: 6.25rem;
                    height: 6.25rem;
                    bottom: 4.375rem;
                    svg {
                        width: 3.125rem;
                        height: 3.125rem;
                    }
                    &:hover {
                        width: 6.875rem;
                        height: 6.875rem;
                    }
                }
            }
        }
        .services {
            display: flex;
        }
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .contain {
        padding-bottom: 2.25rem;
        .title-container {
            .sub-title {
                display: flex;
                align-items: center;
                margin-left: -6.25rem;
                padding: 0 6.25rem 0 6.25rem;
                margin-top: 3.625rem;
                max-width: 35.625rem;
                height: 21.875rem;
                z-index: 1;
            }
            .background {
                margin-top: -35.625rem;
            }
        }
        .services {
            justify-content: space-between;
            width: 63.125rem;
            padding-top: 5rem;
            padding-bottom: 5.375rem;
            font-family: $playfair-font;
            &__item {
                width: 14.375rem;
                height: 12.3125rem;
                font-size: 1.875rem;
                line-height: 2.5rem;
                svg {
                    padding-bottom: 2.1875rem;
                    stroke: $beige;
                }
                .frame1 {
                    width: 9.375rem;
                    height: 8.0625rem;
                    padding-top: 0.125rem;
                }
                .frame2 {
                    width: 6.25rem;
                    height: 7.0625rem;
                    padding-top: 1.125rem;
                }
                .frame3 {
                    width: 9.375rem;
                    height: 6.0625rem;
                    padding-top: 2.1875rem;
                }
                .frame4 {
                    width: 12.5rem;
                    height: 7.0625rem;
                    padding-top: 1.625rem;
                    padding-bottom: 1.6875rem;
                }
            }
        }
    }
}
</style>