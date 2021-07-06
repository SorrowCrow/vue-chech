const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const bucketListItemRoutes = require("./routes/api/bucketListItems");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

mongoose
    .connect(mongoUri, {
        user: "jeff",
        pass: "OaUoLFD542jTFFOb",
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDb database Connected"))
    .catch((err) => console.log(err));

app.use("/api/bucketListItems", bucketListItemRoutes);
app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(PORT, () => console.log(`Port: ${PORT}`));
