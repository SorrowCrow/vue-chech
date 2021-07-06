const { Schema, model } = require("mongoose");

const reservationItemSchema = new Schema({
    dateNow: {
        type: Date,
        default: Date.now,
    },
    date: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    ozdoba: {
        type: Boolean,
        required: true,
    },
    prossecco: {
        type: Boolean,
        required: true,
    },
    misa: {
        type: Boolean,
        required: true,
    },
    persons: {
        type: Number,
        required: true,
    },
});

const reservationItem = model("reservationItem", reservationItemSchema);

module.exports = reservationItem;
