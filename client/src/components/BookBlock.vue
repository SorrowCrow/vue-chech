<template>
    <div class="contain mx-auto overflow-hidden">
        <svg class="containerWave relative" preserveAspectRatio="none">
            <use href="#containerWave" />
        </svg>
        <div class="BookBlock__wrapper">
            <div class="mx-auto max-content content">
                <div class="title mx-auto fit-content" id="book">Zarezervujete svoji návštěvu</div>
                <div class="sub-title mx-auto grid fit-content">Vyberte datum a délku návštěvy a my nabídneme vám volné termíny</div>
                <div class="priceAndBook grid content-center overflow-visible">
                    <Calendar />
                    <div class="pricelist">
                        <div class="pricelist__item flex content-between align-center">
                            <div class="pricelist__item-hours sub-title fit-content">1 Hodina</div>
                            <svg class="mx-auto wave">
                                <use href="#wave" />
                            </svg>
                            <div class="sub-title price text-right">799,- Kč</div>
                        </div>
                        <div class="pricelist__item flex content-between align-center">
                            <div class="pricelist__item-hours sub-title fit-content">1,5 Hodina</div>
                            <svg class="mx-auto wave">
                                <use href="#wave" />
                            </svg>
                            <div class="sub-title price text-right">1099,- Kč</div>
                        </div>
                        <div class="pricelist__item flex content-between align-center">
                            <div class="pricelist__item-hours sub-title fit-content">2 Hodina</div>
                            <svg class="mx-auto wave">
                                <use href="#wave" />
                            </svg>
                            <div class="sub-title price text-right">1399,- Kč</div>
                        </div>
                        <div class="pricelist__item flex content-between align-center">
                            <div class="pricelist__item-hours sub-title fit-content">3 Hodina</div>
                            <svg class="mx-auto wave">
                                <use href="#wave" />
                            </svg>
                            <div class="sub-title price text-right">1899,- Kč</div>
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
    width: 100%;
    min-width: 42.5rem;
    height: 1.375rem;
    fill: $deepdarkblue;
    background: white;
}
.BookBlock__wrapper {
    margin-right: 1.875rem;
    margin-left: 1.875rem;
}
.contain {
    padding-bottom: 6.25rem;
    background: $deepdarkblue;
    color: $beige;
    .content {
        width: 100%;
        max-width: 60.625rem;
        padding-top: 2.6875rem;
    }
    .title {
        letter-spacing: -0.03rem;
    }
    .sub-title {
        color: white;
        padding-top: 1.875rem;
        padding-bottom: 4.6875rem;
    }
    .priceAndBook {
        grid-gap: 1.5rem;
        grid-template-columns: auto;
        .pricelist {
            max-width: 19.6875rem;
            .sub-title {
                width: 8.4375rem;
                padding: 0;
                padding-top: 1.0156rem;
                padding-bottom: 1.0156rem;
            }
            .price {
                color: inherit;
            }
            &__item {
                svg {
                    width: 6.375rem;
                    height: 3px;
                    fill: white;
                    fill-opacity: 0.1;
                }
            }
            .note {
                padding-top: 1.5rem;
                font-size: 0.75rem;

                color: rgba(255, 255, 255, 0.5);
            }
        }
    }
}
@media only screen and (min-width: $sm-breakpoint) {
    .contain .priceAndBook {
        display: grid;
        justify-content: right;
        grid-template-columns: auto auto;
        width: 43.75rem;
        margin: 0 auto;
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .contain {
        padding-bottom: 7.5625rem;
        .content {
            padding-top: 6.25rem;
        }
        .title {
            width: 100%;
            letter-spacing: -0.03em;
        }
        .sub-title {
            max-width: 29.375rem;
            margin: 0;
        }
        .priceAndBook {
            width: auto;
            .pricelist {
                max-width: 23.125rem;
                .sub-title {
                    padding-top: 1.0156rem;
                    padding-bottom: 1.0156rem;
                }
                .note {
                    padding-top: 1.875rem;
                    font-size: $font-15;
                    color: rgba(255, 255, 255, 0.5);
                }
            }
        }
    }
}
</style>