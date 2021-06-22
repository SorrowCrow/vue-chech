<template>
    <svg class="containerWave" preserveAspectRatio="none">
        <use xlink:href="#containerWave" />
    </svg>
    <div class="contain mx-auto">
        <div class="mx-auto max-content content">
            <div class="title" id="book">Zarezervujete svoji návštěvu</div>
            <div class="sub-title">Vyberte datum a délku návštěvy a my nabídneme vám volné termíny</div>
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
// .wave {
//     width: 1440px;
//     height: 22px;
// }
.containerWave {
    position: absolute;
    width: 100%;
    height: 22px;
    fill: #2e2b4d;
}
.contain {
    margin-top: 21px;
    padding-top: 100px;
    padding-bottom: 100px;
    max-width: 100%;
    background: #2e2b4d;
    color: #d4b8a6;
    .title {
        line-height: 107px;
        width: 970px;
        letter-spacing: -0.03em;
    }
    .sub-title {
        width: max-content;
        color: white;
        max-width: 470px;
        padding-top: 30px;
        padding-bottom: 75px;
    }
    .priceAndBook {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 130px;
        overflow: visible;
        height: min-content;
        .pricelist {
            max-width: fit-content;
            max-width: 370px;
            .beige {
                color: inherit;
            }
            .sub-title {
                display: grid;
                width: 135px;
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
                padding-top: 30px;
                font-size: 15px;
                line-height: 140%;
                color: rgba(255, 255, 255, 0.5);
            }
        }
    }
}
</style>