const { Router } = require("express");
const reservationItem = require("../../models/reservationItem");

const router = Router();

router.get("/:date", async (req, res) => {
    const { date } = req.params;
    // console.log(date);
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
    const newreservationItem = new reservationItem(req.body);
    try {
        const reservationItem = await newreservationItem.save();
        if (!reservationItem) throw new Error("Something went wrong while saving form");
        res.status(200).json(reservationItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;