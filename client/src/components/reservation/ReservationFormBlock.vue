<template>
    <form class="reservationForm" id="form" @submit.prevent="handleSubmit">
        <svg class="containerWave relative">
            <use href="#containerWave" />
        </svg>
        <div class="container mx-auto">
            <div class="form-grid grid">
                <input required type="text" name="firstname" placeholder="Jemno*" v-model="formData.name" />
                <div class="reservationForm__select user-select-none">
                    <div class="reservationForm__select-inner flex content-between align-center h-p" :style="formData.dropdown ? 'border-radius: 10px 10px 0 0;' : ''" @click="osobyClick()">
                        <div class="pa flex align-center">
                            {{ formData.persons }} Osoby
                            <p v-if="formData.persons > 1">(+{{ formData.persons - 1 }}00,- Kč)</p>
                        </div>
                        <svg id="formArrow" :style="formData.dropdown ? 'transform: rotate(180deg);' : ''"><use href="#openedArrow" /></svg>
                    </div>
                    <div class="reservationForm__select-list h-fit-content overflow-hidden" :class="formData.dropdown ? 'grid' : 'none'">
                        <div class="h-p flex align-center" @click="(formData.persons = 1), osobyClick()">1 Osoby</div>
                        <div class="h-p flex align-center" @click="(formData.persons = 2), osobyClick()">
                            2 Osoby
                            <p>(+100,- Kč)</p>
                        </div>
                        <div class="h-p flex align-center" @click="(formData.persons = 3), osobyClick()">
                            3 Osoby
                            <p>(+200,- Kč)</p>
                        </div>
                        <div class="h-p flex align-center" @click="(formData.persons = 4), osobyClick()">
                            4 Osoby
                            <p>(+300,- Kč)</p>
                        </div>
                    </div>
                </div>
                <input required type="tel" name="phone" id="telephone" placeholder="Telefon*" v-model="formData.phone" />
                <input required type="email" name="email" id="email" placeholder="E-mail" v-model="formData.email" />
                <textarea
                    v-model="formData.message"
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
    inject: ["formData"],

    components: {
        AdditionalComponent,
    },

    data() {
        return {
            stripe: "",
            cardElement: null,
            loading: true,
            elements: null,
            stripe_pubKey: "pk_test_51JC9K9BJ2QoFP7mPuFYpU6P3MSU7T2ytOURjiAAu9ZuG2JeRuKUi9tU8HV9Eh4BGuCSxsDnpxrQ02fvADiY1dDpD00i37yMksj",
        };
    },
    async mounted() {
        const style = {
            style: {
                base: {
                    iconColor: "#000",
                    color: "#000",
                    fontFamily: "Work Sans, sans-serif",
                    fontSize: "1.25rem",
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
        document.getElementsByClassName("Reservation__reservationForm")[0].addEventListener("click", (e) => e.stopPropagation());
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
            if (this.ValidateEmail(this.formData.email) && this.ValidatePhone(this.formData.phone)) {
                //captcha response
                // eslint-disable-next-line
                const captchaRes = grecaptcha.getResponse();
                if (!captchaRes) {
                    document.getElementsByClassName("captcha__wrap")[0].classList.add("highlight");
                    return;
                }
                document.getElementsByClassName("captcha__wrap")[0].classList.remove("highlight");

                this.loading = true;
                const formData = this.formData;
                let stripeId;
                if (this.$parent.OnlinePayments) {
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

                        const { secret, id, message } = response.data;

                        if (message) {
                            console.log(message);
                            // eslint-disable-next-line
                            grecaptcha.reset();
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
                const response = await axios.post("api/reservationItems/", { formData, stripeId: stripeId, captchaRes: captchaRes });
                const { message } = response.data;
                if (message) {
                    console.log(message);
                    // eslint-disable-next-line
                    grecaptcha.reset();
                    this.loading = false;
                    return;
                }
                this.$parent.bodyDisplayAuto();
            }
        },
        osobyClick() {
            if (this.formData.dropdown === true) {
                this.formData.dropdown = false;
            } else {
                this.formData.dropdown = true;
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
    min-width: 42.5rem;
    height: 1.375rem;
    opacity: 0;
    fill: $backgroundgrey;
    background: white;
}
.reservationForm {
    padding-bottom: 3.75rem;
    background-color: $backgroundgrey;
    color: $deepblue;
    .container {
        max-width: 48.0625rem;
        padding-left: 1.875rem;
        padding-right: 1.875rem;
        .form-grid {
            grid-template-columns: auto;
            grid-row-gap: 0.625rem;
            p {
                color: $secondary;
                padding-left: 1.25rem;
            }
        }
    }
    &__select-inner,
    input,
    &__select-list div,
    textarea {
        padding: 0;
        padding-left: 1.25rem;
        padding-right: 0.8438rem;
        height: 3.75rem;
        font-size: $font-20;
        border-radius: 0.625rem;
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
        max-height: 3.75rem;

        svg {
            width: 1.75rem;
            height: 0.9375rem;
            stroke: $secondary;
        }
        &-inner {
            background-color: $white;
            height: 3.75rem;
        }
        &-list {
            grid-template-columns: 100%;
            background-color: white;
            border-radius: 0 0 0.625rem 0.625rem;
            div {
                border-radius: 0;

                z-index: 1;
                width: 100%;
                height: 3.75rem;
                p {
                    padding-left: 1.25rem;
                }
                &:hover {
                    background-color: $backgroundgrey;
                }
            }
        }
    }
    textarea {
        padding-top: 0.625rem;
        margin-bottom: 1.875rem;
        resize: none;
        height: 8.4375rem;
    }
}
@media only screen and (min-width: $md-breakpoint) {
    .containerWave {
        opacity: 1;
    }
    .reservationForm {
        padding-bottom: 5.5rem;
        margin-top: 1.875rem;
        .container {
            padding-top: 6.25rem;
            .form-grid {
                grid-template-columns: auto auto;
                grid-column-gap: 1.875rem;
                grid-row-gap: 1.875rem;
            }
        }
        &__select-inner,
        input,
        &__select-list div,
        textarea {
            font-size: 1.5625rem;
        }
        textarea {
            margin-bottom: 1.875rem;
            grid-column: 1 / -1;
            height: 10.625rem;
        }
    }
}
</style>