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
    border: solid 2px red;
    border-radius: 6px;
}
.captcha__wrap {
    margin: 20px auto;
}
.cardShow {
    transition: 0.5s;
    height: 26.4px;
    padding: 10px;
    border-radius: 10px;
    background-color: #f2eef5;
}
.cardHide {
    transition: 0.5s;
    height: 0px;
}
.containerWave {
    width: 100%;
    min-width: 680px;
    height: 22px;
    fill: $white;
    background: $backgroundgrey;
}
.wrap {
    background-color: $white;
}
.SummaryBlock {
    color: $deepblue;
    font-size: 18px;
    max-width: 570px;
    padding-right: 30px;
    padding-left: 30px;
    padding-top: 100px;
    padding-bottom: 100px;
    &__costs {
        &-item {
            padding-bottom: 16px;
        }
        &-total {
            font-family: $playfair-font;
            font-size: 30px;
        }
    }
    &__voucher {
        background-color: $backgroundgrey;
        border-radius: 10px;
        margin-top: 20px35px;
        &-text {
            font-family: $playfair-font;
            font-size: 20px;
            padding: 13px 0 14px 20px;
        }
        &-button {
            background-color: $secondary;
            border-radius: 50px;
            width: 125px;
            height: 38px;
            margin-right: 11px;
            color: white;
        }
    }
    &__payingMethods {
        padding-top: 42px;
        &-item {
            grid-row-gap: 3px;
            padding-left: 55px;
            height: 30px;
            padding-bottom: 25px;
            font-size: 22px;
            &-info {
                color: $secondary;
                font-size: 16px;
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
                height: 30px;
                width: 30px;
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
                top: 6px;
                left: 6px;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: white;
            }
        }
    }
    &__rezervovat {
        border: 0;
        width: 239px;
        font-size: 25px;
        height: 60px;
        border-radius: 50px;
        margin-top: 20px42px;
        background-color: $orange;
        color: white;
    }
}
@media only screen and (min-width: 1070px) {
    .wrap {
        border-radius: 30px;
    }
    .SummaryBlock {
        font-size: 20px;
        &__costs {
            &-item {
                div {
                    display: flex;
                }
            }
            &-total {
                font-family: $playfair-font;
                font-size: 35px;
            }
        }
        &__voucher {
            margin-top: 20px57px;
            &-text {
                font-size: 25px;
            }
            &-button {
                width: 92px;
            }
        }
        &__payingMethods {
            padding-top: 55px;
            &-item {
                display: flex;
                padding-bottom: 18px;
            }
        }
        &__rezervovat {
            margin-top: 20px90px;
        }
    }
}
</style>