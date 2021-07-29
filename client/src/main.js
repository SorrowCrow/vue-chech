import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.config.globalProperties.$sm = 740;
app.config.globalProperties.$md = 1070;
app.config.globalProperties.$header = 1285;
app.config.globalProperties.$rem = 16;

app.mount("body");
