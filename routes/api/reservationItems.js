const axios = require("axios");

const { Router } = require("express");
const reservationItem = require("../../models/reservationItem");

const router = Router();
const { sendgrid, captcha } = require("../../config");
const sgMail = require("@sendgrid/mail");
const verifiedEmail = "forestmccallister@gmail.com";

sgMail.setApiKey(sendgrid);

router.get("/:date", async (req, res) => {
    const { date } = req.params;
    try {
        const reservationItems = await reservationItem.find({ date: date }, { time: 1, _id: 0 }).sort({ time: 1 });
        if (!reservationItems) throw new Error("No reservationItems");
        const sorted = reservationItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        res.status(200).json(sorted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

function email(source) {
    const msg = {
        to: source.email,
        from: verifiedEmail,
        subject: "Thank you for your reservation",
        text: "We have received your reservation",
        html: `<strong>Your reservation: </strong>
        <ul>
        <li>Date: ${source.date}</li>
        <li>Time: ${source.time}</li>
        <li>Persons: ${source.persons}</li>
        <li>Ozdoba: ${source.ozdoba === "true" ? "Included" : "Not Included"}</li>
        <li>Ovocna Misa: ${source.misa === "true" ? "Included" : "Not Included"}</li>
        <li>Prossecco: ${source.prossecco === "true" ? "Included" : "Not Included"}</li>
        </ul>`,
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error);
        });
}

router.post("/", async (req, res) => {
    const stripe = require("stripe")(process.env.SECRET_KEY);
    const { stripeId } = req.body;
    let newreservationItem = "";
    let matadata;

    if (stripeId) {
        let paymentIntent = await stripe.paymentIntents.retrieve(stripeId);
        metadata = paymentIntent.metadata;
        // if (metadata.time === req.body.formData.time && metadata.date === req.body.formData.date) {
        metadata.stripeId = stripeId;
        newreservationItem = new reservationItem(metadata);
        // } else {
        //     res.status(200).json({ message: "StripeId metadata is different from formdata metadata" });
        // }
    } else {
        const { captchaRes } = req.body;
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${captcha}&response=${captchaRes}`);
        const { time, date } = req.body;
        if (response.data.success === true) {
            const reservationItems = await reservationItem.find({ date: date }, { time: 1, _id: 0 }).sort({ time: 1 });
            if (!reservationItems) throw new Error("No reservationItems");
            const sorted = reservationItems.sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
            for (let i = 0; i < Object.keys(sorted).length; i++) {
                if (time === sorted[i].time) res.status(200).send({ message: "Time taken" });
            }
            newreservationItem = new reservationItem(req.body.formData);
        }
    }
    try {
        const reservationItem = await newreservationItem.save();
        if (!reservationItem) throw new Error("Something went wrong while saving form");
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    if (stripeId) {
        email(metadata);
    } else {
        email(req.body.formData);
    }
});

module.exports = router;
