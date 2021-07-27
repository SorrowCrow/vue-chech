<template>
    <svg class="containerWave" preserveAspectRatio="none">
        <use href="#containerWave" />
    </svg>
    <div class="contain mx-auto">
        <div class="BookBlock__wrapper">
            <div class="mx-auto max-content content">
                <div class="title mx-auto" id="book">Zarezervujete svoji návštěvu</div>
                <div class="sub-title mx-auto">Vyberte datum a délku návštěvy a my nabídneme vám volné termíny</div>
                <div class="priceAndBook">
                    <Calendar />
                    <div class="pricelist">
                        <div class="pricelist__item">
                            <div class="pricelist__item-hours sub-title">1 Hodina</div>
                            <svg class="mx-auto wave">
                                <use href="#wave" />
                            </svg>
                            <div class="sub-title price">799,- Kč</div>
                        </div>
                        <div class="pricelist__item">
                            <div class="pricelist__item-hours sub-title">1,5 Hodina</div>
                            <svg class="mx-auto wave">
                                <use href="#wave" />
                            </svg>
                            <div class="sub-title price">1099,- Kč</div>
                        </div>
                        <div class="pricelist__item">
                            <div class="pricelist__item-hours sub-title">2 Hodina</div>
                            <svg class="mx-auto wave">
                                <use href="#wave" />
                            </svg>
                            <div class="sub-title price">1399,- Kč</div>
                        </div>
                        <div class="pricelist__item">
                            <div class="pricelist__item-hours sub-title">3 Hodina</div>
                            <svg class="mx-auto wave">
                                <use href="#wave" />
                            </svg>
                            <div class="sub-title price">1899,- Kč</div>
                        </div>
                        <div class="note">
                            Za překročení doby rezervace je účtován poplatek 300 Kč za každých 15 minut zpoždění.<br /><br />
                            Za každou osobu nad 2 osoby účtujeme doplatek 200,-/osoba.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Calendar from "./book/Calendar.vue";

export default {
    name: "BookBlock",
    components: {
        Calendar,
    },
};
</script>

<style lang="scss" scoped>
.containerWave {
    position: relative;
    width: 100%;
    min-width: 680px;
    height: 22px;
    fill: $deepdarkblue;
}
.BookBlock__wrapper {
    margin-right: 30px;
    margin-left: 30px;
}
.contain {
    padding-bottom: 100px;
    background: $deepdarkblue;
    color: $beige;
    overflow: hidden;
    margin-top: -4px;
    .content {
        width: 100%;
        max-width: 970px;
        padding-top: 43px;
    }
    .title {
        letter-spacing: -0.03em;
        width: fit-content;
    }
    .sub-title {
        color: white;
        width: fit-content;
        padding-top: 30px;
        padding-bottom: 75px;
    }
    .priceAndBook {
        grid-gap: 24px;
        display: grid;
        justify-content: center;
        grid-template-columns: auto;
        overflow: visible;
        height: min-content;
        .pricelist {
            max-width: 315px;
            .sub-title {
                display: grid;
                width: 135px;
                padding: 0;
                padding-top: 16.25px;
                padding-bottom: 16.25px;
            }
            .price {
                color: inherit;
                text-align: right;
            }
            &__item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                &-hours {
                    width: fit-content;
                }
                svg {
                    width: 102px;
                    height: 3px;
                    fill: white;
                    fill-opacity: 0.1;
                }
            }
            .note {
                padding-top: 24px;
                font-size: 12px;
                line-height: 140%;
                color: rgba(255, 255, 255, 0.5);
            }
        }
    }
}
@media only screen and (min-width: 740px) {
    .contain {
        .priceAndBook {
            display: grid;
            justify-content: right; 
            grid-template-columns: auto auto;
            width: 700px;
            margin: 0 auto;
        }
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .contain {
        padding-bottom: 121px;
        .content {
            padding-top: 100px;
        }
        .title {
            line-height: 107px;
            letter-spacing: -0.03em;
            width: 100%;
        }
        .sub-title {
            max-width: 470px;
            margin: 0;
        }
        .priceAndBook {
            width: auto;
            .pricelist {
                width: fit-content;
                max-width: 370px;
                .sub-title {
                    padding-top: 16.25px;
                    padding-bottom: 16.25px;
                }
                .note {
                    padding-top: 30px;
                    font-size: 15px;
                    color: rgba(255, 255, 255, 0.5);
                }
            }
        }
    }
}
</style>