<template>
    <svg class="containerWave" preserveAspectRatio="none">
        <use xlink:href="#containerWave" />
    </svg>
    <div class="contain mx-auto">
        <div class="mx-auto max-content content">
            <div class="title mx-auto" id="book">Zarezervujete svoji návštěvu</div>
            <div class="sub-title mx-auto">Vyberte datum a délku návštěvy a my nabídneme vám volné termíny</div>
            <div class="priceAndBook">
                <Calendar />
                <div class="pricelist">
                    <div class="pricelist__item">
                        <div class="pricelist__item-hours sub-title">1 Hodina</div>
                        <svg class="mx-auto wave">
                            <use xlink:href="#wave" />
                        </svg>
                        <div class="sub-title beige price">799,- Kč</div>
                    </div>
                    <div class="pricelist__item">
                        <div class="pricelist__item-hours sub-title">1,5 Hodina</div>
                        <svg class="mx-auto wave">
                            <use xlink:href="#wave" />
                        </svg>
                        <div class="sub-title beige price">1099,- Kč</div>
                    </div>
                    <div class="pricelist__item">
                        <div class="pricelist__item-hours sub-title">2 Hodina</div>
                        <svg class="mx-auto wave">
                            <use xlink:href="#wave" />
                        </svg>
                        <div class="sub-title beige price">1399,- Kč</div>
                    </div>
                    <div class="pricelist__item">
                        <div class="pricelist__item-hours sub-title">3 Hodina</div>
                        <svg class="mx-auto wave">
                            <use xlink:href="#wave" />
                        </svg>
                        <div class="sub-title beige price">1899,- Kč</div>
                    </div>
                    <div class="note">
                        Za překročení doby rezervace je účtován poplatek 300 Kč za každých 15 minut zpoždění.<br /><br />
                        Za každou osobu nad 2 osoby účtujeme doplatek 200,-/osoba.
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
.contain {
    padding-bottom: 100px;
    max-width: 100%;
    background: $deepdarkblue;
    color: $beige;
    overflow: hidden;
    margin-top: -4px;
    .content {
        width: 100%;
        max-width: 1170px;
    }
    .title {
        padding-top: 43px;
        padding-left: 30px;
        padding-right: 30px;
        letter-spacing: -0.03em;
        width: fit-content;
    }
    .sub-title {
        color: white;
        width: fit-content;
        padding-top: 30px;
        padding-bottom: 75px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .priceAndBook {
        display: grid;
        justify-content: center;
        grid-template-columns: auto;
        grid-gap: 24px;
        overflow: visible;
        height: min-content;
        .pricelist {
            max-width: fit-content;
            max-width: 315px;
            .beige {
                color: inherit;
            }
            .sub-title {
                display: grid;
                width: 135px;
                padding: 0;
                padding-top: 16.25px;
                padding-bottom: 16.25px;
            }
            .price {
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
@media only screen and (min-width: $md-breakpoint) {
    .containerWave {
        width: 100%;
        min-width: 680px;
        height: 22px;
        fill: $deepdarkblue;
    }
    .contain {
        padding-bottom: 121px;
        .title {
            padding: 0;
            padding-top: 100px;
            line-height: 107px;
            width: 970px;
            letter-spacing: -0.03em;
            margin: 0;
        }
        .sub-title {
            padding: 0;
            width: max-content;
            color: white;
            max-width: 470px;
            padding-top: 30px;
            padding-bottom: 75px;
            margin: 0;
        }
        .priceAndBook {
            display: grid;
            justify-content: right;
            grid-template-columns: auto auto;
            grid-gap: 130px;
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