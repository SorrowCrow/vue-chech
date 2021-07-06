const { Schema, model } = require("mongoose");

const BucketListItemSchema = new Schema({
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

const BucketListItem = model("bucketListItem", BucketListItemSchema);

module.exports = BucketListItem;
