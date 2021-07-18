<template>
    <div>
        <svg class="containerWave">
            <use href="#containerWave" />
        </svg>
        <form class="reservationForm" id="form" @submit.prevent="handleSubmit">
            <div class="container">
                <div class="grid">
                    <input required type="text" name="firstname" placeholder="Jemno*" v-model="$parent.formData.name" />
                    <div class="reservationForm__select">
                        <!-- <select class="reservationForm__select-inner" form="form">
                        <option value="1">
                            1 Osoby
                            <p>(+100,- Kč)</p>
                        </option>
                    </select> -->
                        <div class="reservationForm__select-inner" @click="osobyClick()">
                            <div class="pa">
                                {{ $parent.persons }} Osoby
                                <p v-if="$parent.persons > 1">(+{{ $parent.persons - 1 }}00,- Kč)</p>
                            </div>
                            <svg><use href="#openedArrow" /></svg>
                        </div>

                        <div class="reservationForm__select-list">
                            <div @click="($parent.persons = 1), osobyClick()">1 Osoby</div>
                            <div @click="($parent.persons = 2), osobyClick()">
                                2 Osoby
                                <p>(+100,- Kč)</p>
                            </div>
                            <div @click="($parent.persons = 3), osobyClick()">
                                3 Osoby
                                <p>(+200,- Kč)</p>
                            </div>
                            <div @click="($parent.persons = 4), osobyClick()">
                                4 Osoby
                                <p>(+300,- Kč)</p>
                            </div>
                        </div>
                    </div>
                    <input required type="tel" name="phone" placeholder="Telefon*" v-model="$parent.formData.phone" v-on:keypress="isNumber(event)" />
                    <input required type="email" name="email" placeholder="E-mail" v-model="$parent.formData.email" />
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
                    fontSize: "22px",
                    fontSmoothing: "antialiased",
                    ":-webkit-autofill": {
                        color: "#fce883",
                    },
                    "::placeholder": {
                        color: "green",
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
        await element.mount("#stripe-card");
        this.loading = false;
    },
    methods: {
        async handleSubmit() {
            this.$parent.formData.misa = this.$parent.misa;
            this.$parent.formData.ozdoba = this.$parent.ozdoba;
            this.$parent.formData.prossecco = this.$parent.prossecco;
            this.$parent.formData.persons = this.$parent.persons;
            if (this.OnlinePayments) {
                if (this.loading) return;
                this.loading = true;

                const name = this.$parent.formData.name;
                const email = this.$parent.formData.email;

                const billingDetails = {
                    name,
                    email,
                };

                this.cardElement = this.elements.getElement("card");

                try {
                    const response = await fetch("http://localhost:8080/api/stripe", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(this.$parent.formData),
                    });
                    const { secret } = await response.json();
                    console.log("secret", secret);
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
                    this.addItem();
                } catch (error) {
                    console.log("error: ", error);
                }
            } else {
                this.addItem();
            }
        },
        isNumber: function (evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        osobyClick() {
            if (document.getElementsByClassName("reservationForm__select-list")[0].style.display == "grid") {
                document.getElementsByClassName("reservationForm__select-list")[0].style.display = "none";
            } else {
                document.getElementsByClassName("reservationForm__select-list")[0].style.display = "grid";
            }
        },
        async addItem() {
            await axios.post("api/reservationItems/", this.$parent.formData);
            this.$parent.bodyDisplayAuto();
        },
    },
};
</script>

<style lang="scss" scoped>
.containerWave {
    position: relative;
    width: 100%;
    min-width: 680px;
    height: 22px;
    fill: $backgroundgrey;
    margin-top: 30px;
    opacity: 0;
}
.reservationForm {
    margin-top: -4px;
    padding-bottom: 60px;
    background-color: $backgroundgrey;
    color: $deepblue;
    .container {
        max-width: 769px;
        padding-left: 30px;
        padding-right: 30px;
        margin: 0 auto;
        .grid {
            display: grid;
            grid-template-columns: auto;
            grid-row-gap: 10px;
            p {
                color: $secondary;
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

            display: flex;
            align-items: center;
            justify-content: space-between;
            .pa {
                display: flex;
                align-items: center;
                p {
                    padding-left: 20px;
                }
            }
            &:hover {
                cursor: pointer;
            }
        }
        &-list {
            display: none;
            justify-content: space-between;

            div {
                background-color: white;
                z-index: 1;
                width: 100%;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                &:hover {
                    cursor: pointer;
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
        padding-top: 100px;
        padding-bottom: 88px;
        .container {
            .grid {
                display: grid;
                grid-template-columns: auto auto;
                grid-column-gap: 30px;
                grid-row-gap: 30px;
                p {
                    color: $secondary;
                }
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
            resize: none;
            height: 170px;
        }
    }
}
</style>