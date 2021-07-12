import { createApp } from "vue";
import App from "./App.vue";
import VueMq from "vue3-mq";
import { StripePlugin } from "@vue-stripe/vue-stripe";

const options = {
    pk: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeAccount: process.env.STRIPE_ACCOUNT,
    apiVersion: process.env.API_VERSION,
    locale: process.env.LOCALE
};

const app = createApp(App).use(
    VueMq,
    {
        breakpoints: {
            sm: 1056,
            md: 1070,
            header: 1285,
            lg: Infinity
        }
    },
    StripePlugin,
    options
);
app.mount("#app");
