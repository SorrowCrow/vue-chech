import { createApp } from "vue";
import App from "./App.vue";
import VueMq from "vue3-mq";
import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBkeiBsSr0D2tDAuSahlCKMa2PSDQalIN8",
    authDomain: "light-client-299412.firebaseapp.com",
    projectId: "light-client-299412",
    storageBucket: "light-client-299412.appspot.com",
    messagingSenderId: "568751755748",
    appId: "1:568751755748:web:10c01d1a9cbe30ffe5f7f1"
};

firebase.initializeApp(firebaseConfig);

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
    firebase
);
app.mount("#app");
