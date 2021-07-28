import { createApp } from "vue";
import App from "./App.vue";
import VueMq from "vue3-mq";

const app = createApp(App).use(VueMq, {
    breakpoints: {
        sm: 1056,
        md: 1070,
        header: 1285,
        lg: Infinity
    }
});
app.mount("body");
