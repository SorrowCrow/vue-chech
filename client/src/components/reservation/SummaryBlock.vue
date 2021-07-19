<template>
    <div class="containerWave-cover">
        <svg class="containerWave">
            <use href="#containerWave" />
        </svg>
    </div>
    <div class="wrap">
        <div class="SummaryBlock">
            <div class="SummaryBlock__costs">
                <div class="SummaryBlock__costs-item">
                    <div>
                        <span>{{ date }},&nbsp;</span>
                        <span>od {{ time }}</span>
                    </div>
                    <div>{{ timePrice }},– Kč</div>
                </div>
                <div class="SummaryBlock__costs-item">
                    <div>{{ persons }} osoby</div>
                    <div>{{ persons * 100 }},– Kč</div>
                </div>
                <div v-if="ozdoba" class="SummaryBlock__costs-item">
                    <div>Ozdoba</div>
                    <div>{{ ozdobaPrice }},– Kč</div>
                </div>
                <div v-if="prossecco" class="SummaryBlock__costs-item">
                    <div>Prossecco</div>
                    <div>{{ prosseccoPrice }},– Kč</div>
                </div>
                <div v-if="misa" class="SummaryBlock__costs-item">
                    <div>Misa</div>
                    <div>{{ misaPrice }},– Kč</div>
                </div>
                <div class="SummaryBlock__costs-total SummaryBlock__costs-item">
                    <div>Total:</div>
                    <div>{{ persons * 100 + timePrice + (ozdoba ? ozdobaPrice : 0) + (prossecco ? prosseccoPrice : 0) + (misa ? misaPrice : 0) }},– Kč</div>
                </div>
            </div>
            <div class="SummaryBlock__voucher">
                <div class="SummaryBlock__voucher-text">Mam voucher</div>
                <div class="SummaryBlock__voucher-button">Uplatnit</div>
            </div>
            <div class="SummaryBlock__payingMethods">
                <label class="SummaryBlock__payingMethods-item">
                    <div class="SummaryBlock__payingMethods-method">
                        Bankovní převod
                        <input type="radio" checked="checked" name="radio" form="form" v-on:change="$parent.OnlinePayments = true" />
                        <span class="checkmark"></span>
                    </div>
                    <div class="SummaryBlock__payingMethods-item-info">Prevodem obvykle 2 dni</div>
                </label>
                <label class="SummaryBlock__payingMethods-item">
                    <div class="SummaryBlock__payingMethods-method">
                        Hotové
                        <input type="radio" name="radio" form="form" v-on:change="$parent.OnlinePayments = false" />
                        <span class="checkmark"></span>
                    </div>
                    <div class="SummaryBlock__payingMethods-item-info">Hotove nebo kartou pri prichodu</div>
                </label>
                <label class="SummaryBlock__payingMethods-item">
                    <div class="SummaryBlock__payingMethods-item-method">
                        Platba Online
                        <input type="radio" name="radio" form="form" v-on:change="$parent.OnlinePayments = true" />
                        <span class="checkmark"></span>
                    </div>
                    <div class="SummaryBlock__payingMethods-item-info">Kartou Online</div>
                </label>
                <div id="stripe-card" :class="$parent.OnlinePayments ? 'cardShow' : 'cardHide'"></div>
            </div>
            <button type="submit" class="SummaryBlock__rezervovat" form="form">Rezervovat</button>
        </div>
    </div>
    <!-- <OnlinePaymentsBlock v-if="OnlinePaymentsBlockVisible" /> -->
</template>

<script>
// import OnlinePaymentsBlock from "./OnlinePaymentsBlock.vue";

export default {
    name: "SummaryBlock",
    // components: {
    //     OnlinePaymentsBlock,
    // },
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
    mounted() {
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
.cardShow,
.cardHide {
    overflow: hidden;
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
    position: relative;
    width: 100%;
    min-width: 680px;
    height: 22px;
    fill: $white;
    background-color: $backgroundgrey;
}
.wrap {
    background-color: $white;
    margin-top: -4px;
}
.SummaryBlock {
    display: grid;
    color: $deepblue;
    font-size: 18px;
    max-width: 570px;
    margin: 0 auto;
    padding-right: 30px;
    padding-left: 30px;
    padding-top: 100px;
    padding-bottom: 100px;
    &__costs {
        &-item {
            display: flex;
            justify-content: space-between;
            padding-bottom: 16px;
            div {
                display: grid;
            }
        }
        &-total {
            font-family: $playfair-font;
            font-size: 30px;
        }
    }
    &__voucher {
        display: flex;
        justify-content: space-between;
        background-color: $backgroundgrey;
        border-radius: 10px;
        margin-top: 35px;
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
            display: flex;
            align-self: center;
            align-items: center;
            justify-content: space-around;
            color: white;
            &:hover {
                cursor: pointer;
            }
        }
    }
    &__payingMethods {
        padding-top: 42px;
        &-item {
            display: grid;
            grid-row-gap: 3px;
            justify-content: space-between;
            position: relative;
            padding-left: 55px;
            height: 30px;
            padding-bottom: 25px;
            cursor: pointer;
            font-size: 22px;
            user-select: none;
            align-items: center;
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
        margin: 0 auto;
        width: 239px;
        font-size: 25px;
        height: 60px;
        border-radius: 50px;
        margin-top: 42px;
        background-color: $orange;
        color: white;
        align-self: center;
        align-items: center;
        justify-content: space-around;
        &:hover {
            cursor: pointer;
        }
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
            margin-top: 57px;
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
            margin-top: 90px;
        }
    }
}
</style>