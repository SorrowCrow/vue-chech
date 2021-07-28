<template>
    <form class="reservationForm" id="form" @submit.prevent="handleSubmit">
        <svg class="containerWave relative">
            <use href="#containerWave" />
        </svg>
        <div class="container mx-auto">
            <div class="form-grid grid">
                <input required type="text" name="firstname" placeholder="Jemno*" v-model="$parent.formData.name" />
                <div class="reservationForm__select user-select-none">
                    <div class="reservationForm__select-inner flex content-between align-center h-p" @click="osobyClick()">
                        <div class="pa flex align-center">
                            {{ $parent.persons }} Osoby
                            <p v-if="$parent.persons > 1">(+{{ $parent.persons - 1 }}00,- Kč)</p>
                        </div>
                        <svg id="formArrow"><use href="#openedArrow" /></svg>
                    </div>
                    <div class="reservationForm__select-list none h-fit-content overflow-hidden">
                        <div class="h-p flex align-center" @click="($parent.persons = 1), osobyClick()">1 Osoby</div>
                        <div class="h-p flex align-center" @click="($parent.persons = 2), osobyClick()">
                            2 Osoby
                            <p>(+100,- Kč)</p>
                        </div>
                        <div class="h-p flex align-center" @click="($parent.persons = 3), osobyClick()">
                            3 Osoby
                            <p>(+200,- Kč)</p>
                        </div>
                        <div class="h-p flex align-center" @click="($parent.persons = 4), osobyClick()">
                            4 Osoby
                            <p>(+300,- Kč)</p>
                        </div>
                    </div>
                </div>
                <input required type="tel" name="phone" id="telephone" placeholder="Telefon*" v-model="$parent.formData.phone" />
                <input required type="email" name="email" id="email" placeholder="E-mail" v-model="$parent.formData.email" />
                <textarea
                    v-model="$parent.formData.message"
                    type="text"
                    name="message"
                    placeholder="Dalsi pozadavky
Treba jokou chcete hudbu..."
                ></textarea>
            </div>

            <AdditionalComponent :name="'Ozdoba'" :price="350" :infoText="'Sauna is located in noiseless part of Prague, only a 15-minute drive from the historical city centre. It offers free Wi-Fi, free parking and English breakfast. All rooms provide satellite TV, a bathroom and a seating area.'" />
            <AdditionalComponent :name="'Prossecco'" :price="290" :infoText="'Sauna is located in noiseless part of Prague, only a 15-minute drive from the historical city centre. It offers free Wi-Fi, free parking and English breakfast. All rooms provide satellite TV, a bathroom and a seating area.'" />
            <AdditionalComponent :name="'Ovocna Misa'" :price="350" :infoText="'Sauna is located in noiseless part of Prague, only a 15-minute drive from the historical city centre. It offers free Wi-Fi, free parking and English breakfast. All rooms provide satellite TV, a bathroom and a seating area.'" />
        </div>
    </form>
    <div class="flex content-center align-center fixed overflow-hidden OnlinePaymentsBlock" v-if="loading">
        <div class="spin flex"></div>
    </div>
</template>

<script>
import AdditionalComponent from "./AdditionalComponent.vue";
import axios from "axios";

export default {
    name: "ReservationFormBlock",
    components: {
        AdditionalComponent,
    },
    data() {
        return {
            state: "loading",
            collectionPath: "reservations",

            stripe: "",
            cardElement: null,
            loading: true,
            elements: null,
            stripe_pubKey: "pk_test_51JC9K9BJ2QoFP7mPuFYpU6P3MSU7T2ytOURjiAAu9ZuG2JeRuKUi9tU8HV9Eh4BGuCSxsDnpxrQ02fvADiY1dDpD00i37yMksj",
        };
    },
    props: {
        OnlinePayments: Boolean,
    },
    async mounted() {
        const style = {
            style: {
                base: {
                    iconColor: "#000",
                    color: "#000",
                    fontFamily: "Work Sans, sans-serif",
                    fontSize: "20px",
                    fontSmoothing: "antialiased",

                    ":-webkit-autofill": {
                        color: "#fce883",
                    },
                    "::placeholder": {
                        color: "#2b3a77",
                    },
                },
                invalid: {
                    iconColor: "#FFC7EE",
                    color: "red",
                },
            },
        };
        // eslint-disable-next-line
        this.stripe = Stripe(this.stripe_pubKey);

        this.elements = this.stripe.elements();
        const element = this.elements.create("card", style);
        // const prButton = this.elements.create("paymentRequestButton", {
        //     paymentRequest: paymentRequest,
        // });

        // Check the availability of the Payment Request API first.
        // paymentRequest.canMakePayment().then(function (result) {
        //     if (result) {
        //         prButton.mount("#payment-request-button");
        //     } else {
        //         document.getElementById("payment-request-button").style.display = "none";
        //     }
        // });
        await element.mount("#stripe-card");
        this.loading = false;
        document.getElementsByClassName("Reservation__reservationForm")[0].addEventListener("click", (e) => {
            e.stopPropagation();
            document.getElementsByClassName("reservationForm__select-list")[0].style.display = "";
            document.getElementsByClassName("reservationForm__select-inner")[0].style.borderRadius = "";
            document.getElementById("formArrow").style.transform = "";
        });
        document.getElementsByClassName("reservationForm__select")[0].addEventListener("click", (e) => e.stopPropagation());
    },
    methods: {
        // CheckCard() {
        //     this.cardElement = this.elements.getElement("card");
        //     this.cardElement((event) => {
        //         if (event.complete) {
        //             // enable payment button
        //         return true;
        //         }
        //     });
        //     if (this.cardElement == undefined) {
        //         document.getElementsByClassName("InputElement")[0].focus();
        //         document.getElementsByClassName("InputElement")[0].classList.add("is-invalid");
        //     }
        //     return true;
        // },
        ValidateEmail(inputText) {
            // eslint-disable-next-line
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(inputText)) {
                return true;
            }
            document.getElementById("email").focus();
            return false;
        },
        ValidatePhone(inputText) {
            // eslint-disable-next-line
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            if (re.test(inputText)) {
                return true;
            }
            document.getElementById("telephone").focus();
            return false;
        },
        // isNumber: function (evt) {
        //     evt = evt ? evt : window.event;
        //     var charCode = evt.which ? evt.which : evt.keyCode;
        //     if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        //         evt.preventDefault();
        //     } else {
        //         return true;
        //     }
        // },
        async handleSubmit() {
            if (this.loading) return;
            if (this.ValidateEmail(this.$parent.formData.email) && this.ValidatePhone(this.$parent.formData.phone)) {
                //captcha response
                // eslint-disable-next-line
                const captchaRes = grecaptcha.getResponse();
                if (!captchaRes) {
                    document.getElementsByClassName("captcha__wrap")[0].classList.add("highlight");
                    return;
                }
                document.getElementsByClassName("captcha__wrap")[0].classList.remove("highlight");

                this.$parent.formData.misa = this.$parent.misa;
                this.$parent.formData.ozdoba = this.$parent.ozdoba;
                this.$parent.formData.prossecco = this.$parent.prossecco;
                this.$parent.formData.persons = this.$parent.persons;
                this.loading = true;
                const formData = this.$parent.formData;
                let stripeId;
                if (this.OnlinePayments) {
                    const name = formData.name;
                    const email = formData.email;

                    const billingDetails = {
                        name,
                        email,
                    };

                    this.cardElement = this.elements.getElement("card");
                    try {
                        const response = await axios.post("api/stripe/", JSON.stringify({ formData, captchaRes: captchaRes }), {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });

                        const { secret, id } = response.data;

                        if (!secret) {
                            this.loading = false;
                            return;
                        }

                        stripeId = id;
                        const paymentMethodReq = await this.stripe.createPaymentMethod({
                            type: "card",
                            card: this.cardElement,
                            billing_details: billingDetails,
                        });

                        const { error } = await this.stripe.confirmCardPayment(secret, {
                            payment_method: paymentMethodReq.paymentMethod.id,
                        });
                        if (error) return;

                        this.loading = false;
                    } catch (error) {
                        // console.log("error: ", error);
                    }
                }
                await axios.post("api/reservationItems/", { formData, stripeId: stripeId, captchaRes: captchaRes });
                this.$parent.bodyDisplayAuto();
            }
        },
        closeList() {
            document.getElementsByClassName("reservationForm__select-list")[0].style.display = "";
            document.getElementsByClassName("reservationForm__select-inner")[0].style.borderRadius = "";
            document.getElementById("formArrow").style.transform = "";
        },
        osobyClick() {
            if (document.getElementsByClassName("reservationForm__select-list")[0].style.display == "grid") {
                this.closeList();
            } else {
                document.getElementsByClassName("reservationForm__select-list")[0].style.display = "grid";
                document.getElementsByClassName("reservationForm__select-inner")[0].style.borderRadius = "10px 10px 0 0";
                document.getElementById("formArrow").style.transform = "rotate(180deg)";
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@keyframes spinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.spin::before {
    animation: 1.5s linear infinite spinner;
    animation-play-state: inherit;
    border: solid 5px #cfd0d1;
    border-bottom-color: $primary;
    border-radius: 50%;
    content: "";
    height: 40px;
    width: 40px;
    will-change: transform;
}
.OnlinePaymentsBlock {
    left: 0;
    right: 0;
    top: 0;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.containerWave {
    width: 100%;
    min-width: 680px;
    height: 22px;
    opacity: 0;
    fill: $backgroundgrey;
    background: white;
}
.reservationForm {
    padding-bottom: 60px;
    background-color: $backgroundgrey;
    color: $deepblue;
    .container {
        max-width: 769px;
        padding-left: 30px;
        padding-right: 30px;
        .form-grid {
            grid-template-columns: auto;
            grid-row-gap: 10px;
            p {
                color: $secondary;
                padding-left: 20px;
            }
        }
    }
    &__select-inner,
    input,
    &__select-list div,
    textarea {
        padding: 0;
        padding-left: 20px;
        padding-right: 13.5px;
        height: 60px;
        font-size: 20px;
        border-radius: 10px;
        font-family: $playfair-font;
        background-color: $white;
        border: 0;
        color: $deepblue;
        appearance: none;
        &::placeholder {
            color: $deepblue;
            opacity: 1;
        }
    }
    &__select {
        max-height: 60px;

        svg {
            width: 28px;
            height: 15px;
            stroke: $secondary;
        }
        &-inner {
            background-color: $white;
            height: 60px;
        }
        &-list {
            grid-template-columns: 100%;
            background-color: white;
            border-radius: 0 0 10px 10px;
            div {
                border-radius: 0;

                z-index: 1;
                width: 100%;
                height: 60px;
                p {
                    padding-left: 20px;
                }
                &:hover {
                    background-color: $backgroundgrey;
                }
            }
        }
    }
    textarea {
        padding-top: 10px;
        margin-bottom: 30px;
        resize: none;
        height: 135px;
    }
}
@media only screen and (min-width: 1070px) {
    .containerWave {
        opacity: 1;
    }
    .reservationForm {
        padding-bottom: 88px;
        margin-top: 30px;
        .container {
            padding-top: 100px;
            .form-grid {
                grid-template-columns: auto auto;
                grid-column-gap: 30px;
                grid-row-gap: 30px;
            }
        }
        &__select-inner,
        input,
        &__select-list div,
        textarea {
            font-size: 25px;
        }
        textarea {
            margin-bottom: 30px;
            grid-column: 1 / -1;
            height: 170px;
        }
    }
}
</style>