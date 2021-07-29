<template>
    <div class="wrap">
        <svg class="containerWave relative">
            <use href="#containerWave" />
        </svg>
        <div class="SummaryBlock grid mx-auto">
            <div class="SummaryBlock__costs">
                <div class="SummaryBlock__costs-item flex content-between">
                    <div class="grid">
                        <span>{{ date }},&nbsp;</span>
                        <span>od {{ time }}</span>
                    </div>
                    <div>{{ timePrice }},– Kč</div>
                </div>
                <div class="SummaryBlock__costs-item flex content-between">
                    <div>{{ persons }} osoby</div>
                    <div>{{ persons * 100 }},– Kč</div>
                </div>
                <div v-if="ozdoba" class="SummaryBlock__costs-item flex content-between">
                    <div>Ozdoba</div>
                    <div>{{ ozdobaPrice }},– Kč</div>
                </div>
                <div v-if="prossecco" class="SummaryBlock__costs-item flex content-between">
                    <div>Prossecco</div>
                    <div>{{ prosseccoPrice }},– Kč</div>
                </div>
                <div v-if="misa" class="SummaryBlock__costs-item flex content-between">
                    <div>Misa</div>
                    <div>{{ misaPrice }},– Kč</div>
                </div>
                <div class="SummaryBlock__costs-total SummaryBlock__costs-item flex content-between">
                    <div>Total:</div>
                    <div>{{ persons * 100 + timePrice + (ozdoba ? ozdobaPrice : 0) + (prossecco ? prosseccoPrice : 0) + (misa ? misaPrice : 0) }},– Kč</div>
                </div>
            </div>
            <div class="SummaryBlock__voucher flex content-between align-center">
                <div class="SummaryBlock__voucher-text">Mam voucher</div>
                <div class="SummaryBlock__voucher-button h-p align-center flex content-space-around">Uplatnit</div>
            </div>
            <div class="SummaryBlock__payingMethods">
                <label class="SummaryBlock__payingMethods-item grid relative content-between h-p align-center user-select-none">
                    <div class="SummaryBlock__payingMethods-method">
                        Bankovní převod
                        <input type="radio" checked="checked" name="radio" form="form" v-on:change="$parent.OnlinePayments = true" />
                        <span class="checkmark"></span>
                    </div>
                    <div class="SummaryBlock__payingMethods-item-info">Prevodem obvykle 2 dni</div>
                </label>
                <label class="SummaryBlock__payingMethods-item grid relative content-between h-p align-center user-select-none">
                    <div class="SummaryBlock__payingMethods-method">
                        Hotové
                        <input type="radio" name="radio" form="form" v-on:change="$parent.OnlinePayments = false" />
                        <span class="checkmark"></span>
                    </div>
                    <div class="SummaryBlock__payingMethods-item-info">Hotove nebo kartou pri prichodu</div>
                </label>
                <label class="SummaryBlock__payingMethods-item grid relative content-between h-p align-center user-select-none">
                    <div class="SummaryBlock__payingMethods-item-method">
                        Platba Online
                        <input type="radio" name="radio" form="form" v-on:change="$parent.OnlinePayments = true" />
                        <span class="checkmark"></span>
                    </div>
                    <div class="SummaryBlock__payingMethods-item-info">Kartou Online</div>
                </label>
                <div id="payment-request-button">
                    <!-- A Stripe Element will be inserted here. -->
                </div>

                <div id="stripe-card" required class="overflow-hidden" :class="$parent.OnlinePayments ? 'cardShow' : 'cardHide'"></div>
                <form id="captchaForm">
                    <div class="min-content mx-auto captcha__wrap" form="form" id="captcha"></div>
                </form>
            </div>
            <button type="submit" class="SummaryBlock__rezervovat h-p mx-auto align-center" form="form">Rezervovat</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "SummaryBlock",
    props: {
        time: String,
        date: String,
        persons: Number,
        ozdoba: Boolean,
        prossecco: Boolean,
        misa: Boolean,
        hours: Number,
    },
    data() {
        return {
            timePrice: 0,
            ozdobaPrice: 350,
            prosseccoPrice: 290,
            misaPrice: 350,
        };
    },
    mounted: function () {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit";
        script.defer = "";
        script.async = "";
        document.head.appendChild(script);
        if (this.hours == 1) {
            this.timePrice = 799;
        } else if (this.hours == 15) {
            this.timePrice = 1099;
        } else if (this.hours == 2) {
            this.timePrice = 1399;
        } else if (this.hours == 3) {
            this.timePrice = 1899;
        }
    },
};
</script>

<style lang="scss" scoped>
.highlight {
    border: solid 0.125rem red;
    border-radius: 0.375rem;
}
.captcha__wrap {
    margin: 1.25rem auto;
}
.cardShow {
    transition: $transition;
    padding: 0.625rem;
    border-radius: 0.625rem;
    background-color: #f2eef5;
}
.cardHide {
    transition: $transition;
    height: 0rem;
}
.containerWave {
    width: 100%;
    min-width: 42.5rem;
    height: 1.375rem;
    fill: $white;
    background: $backgroundgrey;
}
.wrap {
    background-color: $white;
}
.SummaryBlock {
    color: $deepblue;
    font-size: 1.125rem;
    max-width: 35.625rem;
    padding-right: 1.875rem;
    padding-left: 1.875rem;
    padding-top: 6.25rem;
    padding-bottom: 6.25rem;
    &__costs {
        &-item {
            padding-bottom: 1rem;
        }
        &-total {
            font-family: $playfair-font;
            font-size: 1.875rem;
        }
    }
    &__voucher {
        background-color: $backgroundgrey;
        border-radius: 10px;
        margin-top: 2.1875rem;
        &-text {
            font-family: $playfair-font;
            font-size: 1.25rem;
            padding: 0.8125rem 0 0.875rem 1.25rem;
        }
        &-button {
            background-color: $secondary;
            border-radius: 3.125rem;
            width: 7.8125rem;
            height: 2.375rem;
            margin-right: 0.6875rem;
            color: white;
        }
    }
    &__payingMethods {
        padding-top: 2.625rem;
        &-item {
            grid-row-gap: 0.1875rem;
            padding-left: 3.4375rem;
            height: 1.875rem;
            padding-bottom: 1.5625rem;
            font-size: 1.375rem;
            &-info {
                color: $secondary;
                font-size: 1rem;
            }
            input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
            }
            .checkmark {
                position: absolute;
                top: 0;
                left: 0;
                height: 1.875rem;
                width: 1.875rem;
                background-color: $secondary;
                border-radius: 50%;
            }
            &:hover input ~ .checkmark {
                background-color: #ccc;
            }
            input:checked ~ .checkmark {
                background-color: $orange;
            }
            .checkmark:after {
                content: "";
                position: absolute;
                display: none;
            }
            input:checked ~ .checkmark:after {
                display: block;
            }
            .checkmark:after {
                top: 0.375rem;
                left: 0.375rem;
                width: 1.125rem;
                height: 1.125rem;
                border-radius: 50%;
                background: white;
            }
        }
    }
    &__rezervovat {
        border: 0;
        width: 14.9375rem;
        font-size: 1.5625rem;
        height: 3.75rem;
        border-radius: 3.125rem;
        margin-top: 2.625rem;
        background-color: $orange;
        color: white;
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .wrap {
        border-radius: 1.875rem;
    }
    .SummaryBlock {
        font-size: 1.25rem;
        &__costs {
            &-item {
                div {
                    display: flex;
                }
            }
            &-total {
                font-family: $playfair-font;
                font-size: 2.1875rem;
            }
        }
        &__voucher {
            margin-top: 3.5625rem;
            &-text {
                font-size: 1.5625rem;
            }
            &-button {
                width: 5.75rem;
            }
        }
        &__payingMethods {
            padding-top: 3.4375rem;
            &-item {
                display: flex;
                padding-bottom: 1.125rem;
            }
        }
        &__rezervovat {
            margin-top: 5.625rem;
        }
    }
}
</style>