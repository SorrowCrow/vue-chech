const { Router } = require("express");
const BucketListItem = require("../../models/BucketListItem");

const router = Router();

router.get("/:date", async (req, res) => {
    const { date } = req.params;
    // console.log(date);
    try {
        const bucketListItems = await BucketListItem.find({ date: date }, { time: 1, _id: 0 }).sort({ time: 1 });
        if (!bucketListItems) throw new Error("No bucketListItems");
        const sorted = bucketListItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        res.status(200).json(sorted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    const newBucketListItem = new BucketListItem(req.body);
    try {
        const bucketListItem = await newBucketListItem.save();
        if (!bucketListItem) throw new Error("Something went wrong while saving form");
        res.status(200).json(bucketListItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
