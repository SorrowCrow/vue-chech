const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const reservationItemRoutes = require("./routes/api/reservationItems");
const path = require("path");
const Stripe = require("stripe");
const { request } = require("http");
const { response } = require("express");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

const stripe = new Stripe(process.env.SECRET_KEY);

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDb database Connected"))
    .catch((err) => console.log(err));

app.post("/api/webhook", express.raw({ type: "application/json" }), async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.END_POINT_SECRET);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            console.log("PaymentIntent was successful!");
            break;
        case "payment_intent.attached":
            const paymentMethod = event.data.object;
            console.log("PaymentMethod was attached to a Customer!");
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    response.json({ received: true });
});

app.use(express.json());

app.post("/api/stripe", async (req, res) => {
    // console.log(req.body);
    const { time, misa, ozdoba, prossecco, persons } = req.body;
    let amount = persons * 100;
    if (ozdoba) amount += 350;
    if (prossecco) amount += 290;
    if (misa) amount += 350;
    let reservedArray = [time.slice("", time.indexOf(":")), time.slice(time.indexOf(":") + 1, time.indexOf("-")), time.slice(time.indexOf("-") + 1).slice("", time.indexOf(":")), time.slice(time.indexOf("-") + 1).slice(time.indexOf(":") + 1)];
    console.log(reservedArray);
    intTime = Number(reservedArray[2]) - Number(reservedArray[0]);
    if (Number(reservedArray[3]) === 30) {
        intTime += 0.5;
    }
    if (intTime === 1) amount += 799;
    else if (intTime === 1.5) amount += 1099;
    else if (intTime === 2) amount += 1399;
    else if (intTime === 3) amount += 1899;
    amount = amount * 100;
    console.log(intTime);
    console.log(amount);
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "czk",
        });

        res.status(200).send({ secret: paymentIntent.client_secret });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).send("error" + error);
    }
});

app.use("/api/reservationItems", reservationItemRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/dist"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}

app.listen(PORT, () => console.log(`Port: ${PORT}`));
