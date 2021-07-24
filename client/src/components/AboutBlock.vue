<template>
    <div class="contain">
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
    computed: {
        isMd() {
            return this.$mq === "md" ? true : this.$mq === "sm" ? true : false;
        },
    },
    methods: {
        magnifyingGlassClick() {
            window.scrollTo({
                top: document.getElementById("cover").offsetTop,
                behavior: "smooth",
            });
            if (!this.isMd) {
                document.getElementById("sliderInit").classList.add("hiddenTitle");
                document.getElementsByClassName("slider__wrap")[0].classList.add("unHiddenForSlide");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.contain {
    padding-bottom: 65px;
    color: $deepblue;
    max-width: 1170px;
    margin-left: 30px;
    margin-right: 30px;
    .title-container {
        grid-template-columns: auto;
        .title {
            padding-top: 53px;
            line-height: 107px;
        }
        .sub-title {
            padding: 46px 100px 115px 30px;
            background: $medium-beige;
            border-radius: 0px 300px 300px 0px;
            margin-left: -30px;
            margin-right: -72px;
        }
        .background {
            background-image: url("../assets/pic.webp");
            background-position: top right;
            background-repeat: no-repeat;
            background-size: contain;
            margin-top: -77px;
            width: 100%;
            height: 100vw;
            max-height: 570px;
            margin-right: 30px;
            .MagnifyingGlass {
                width: 66px;
                height: 66px;
                background: $white;
                border-radius: 50%;
                transition: 0.2s;
                bottom: 100px;
                svg {
                    width: 33px;
                    height: 33px;
                    stroke: $deepblue;
                }
                &:hover {
                    width: 80px;
                    height: 80px;
                    svg {
                        stroke: $orange;
                    }
                }
            }
        }
    }
    .services {
        grid-template-columns: auto auto;
        grid-column-gap: 19px;

        font-family: $playfair-font;
        &__item {
            width: 148px;
            height: 150px;
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
            }
        }
    }
}
@media only screen and (min-width: 720px) {
    .contain {
        display: grid;
        justify-content: center;
        margin: 0 auto;
        .services {
            display: flex;
        }
        .title-container {
            .sub-title {
                z-index: 1;
                max-width: 350px;
                border-radius: 150px 300px 300px 0px;
                padding-bottom: 46px;
                padding-right: 50px;
            }
            .background {
                margin-top: -300px;
                .MagnifyingGlass {
                    width: 100px;
                    height: 100px;
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
            display: flex;
        }
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .contain {
        padding-top: 65px;
        padding-bottom: 36px;
        .title-container {
            .sub-title {
                display: flex;
                align-items: center;
                margin-left: -100px;
                padding: 0 100px 0 100px;
                margin-top: 58px;
                max-width: 570px;
                height: 350px;
                z-index: 1;
            }
            .background {
                margin-top: -570px;
            }
        }
        .services {
            justify-content: space-between;
            width: 1010px;
            padding-top: 80px;
            padding-bottom: 86px;
            font-family: $playfair-font;
            &__item {
                width: 230px;
                height: 197px;
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