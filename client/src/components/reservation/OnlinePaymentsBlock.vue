<template>
    <div v-if="isVisible" class="OnlinePaymentsBlock">
        <div class="OnlinePaymentsBlock__overlay"></div>
        <div class="OnlinePaymentsBlock__wrapper">
            <div class="OnlinePaymentsBlock__payments">
                <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="lineItems" :success-url="successURL" :cancel-url="cancelURL" @loading="(v) => (loading = v)" />
                <button @click="submit">Pay now!</button>
            </div>
        </div>
    </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
export default {
    name: "OnlinePaymentsBlock",
    components: {
        StripeCheckout,
    },
    props: {
        isVisible: Boolean,
    },
    data() {
        this.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
        return {
            loading: false,
            lineItems: [
                {
                    price: "some-price-id", // The id of the one-time price you created in your Stripe dashboard
                    quantity: 1,
                },
            ],
            successURL: "your-success-url",
            cancelURL: "your-cancel-url",
        };
    },
    methods: {
        submit() {
            // You will be redirected to Stripe's secure checkout page
            this.$refs.checkoutRef.redirectToCheckout();
        },
    },
};
</script>

<style lang="scss" scoped>
.OnlinePaymentsBlock,
.OnlinePaymentsBlock__overlay,
.OnlinePaymentsBlock__wrapper {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.OnlinePaymentsBlock {
    z-index: 150;
    position: fixed;
    width: 100%;
    &__overlay {
        position: absolute;
        background-color: black;
        opacity: 0.5;
    }
    &__wrapper {
        position: absolute;
        overflow-y: auto;
        &::-webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
    &__payments {
        position: relative;
        max-width: 1000px;
        margin: 100px auto 100px auto;
        background: $white;
        border-radius: 30px;
        position: relative;
        z-index: 1;
        width: 100%;
        padding: 48px 0 0 0;
        background: $backgroundgrey;
    }
}
</style>