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

router.post("/", async (req, res) => {
    const stripe = require("stripe")(process.env.SECRET_KEY);
    const { stripeId, email } = req.body;
    let newreservationItem = "";
    let matadata;
    if (stripeId) {
        let paymentIntent = await stripe.paymentIntents.retrieve(stripeId);
        metadata = paymentIntent.metadata;
        newreservationItem = new reservationItem(metadata);
    } else {
        const { captchaRes } = req.body;
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${captcha}&response=${captchaRes}`);

        if (response.data.success === true) {
            newreservationItem = new reservationItem(req.body);
        }
    }
    try {
        const reservationItem = await newreservationItem.save();
        if (!reservationItem) throw new Error("Something went wrong while saving form");
        res.status(200).json(reservationItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    if (stripeId) {
        const msg = {
            to: email,
            from: verifiedEmail,
            subject: "Thank you for your reservation",
            text: "We have received your reservation",
            html: `<strong>Your reservation: </strong>
            <ul>
            <li>Date: ${metadata.date}</li>
            <li>Time: ${metadata.time}</li>
            <li>Persons: ${metadata.persons}</li>
            <li>Ozdoba: ${metadata.ozdoba === "true" ? "Included" : "Not Included"}</li>
            <li>Ovocna Misa: ${metadata.misa === "true" ? "Included" : "Not Included"}</li>
            <li>Prossecco: ${metadata.prossecco === "true" ? "Included" : "Not Included"}</li>
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
    } else {
        const msg = {
            to: email,
            from: verifiedEmail,
            subject: "Thank you for your reservation",
            text: "We have received your reservation",
            html: `<strong>Your reservation: </strong>
            <ul>
            <li>Date: ${req.body.date}</li>
            <li>Time: ${req.body.time}</li>
            <li>Persons: ${req.body.persons}</li>
            <li>Ozdoba: ${req.body.ozdoba ? "Included" : "Not Included"}</li>
            <li>Ovocna Misa: ${req.body.misa ? "Included" : "Not Included"}</li>
            <li>Prossecco: ${req.body.prossecco ? "Included" : "Not Included"}</li>
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
});

module.exports = router;
