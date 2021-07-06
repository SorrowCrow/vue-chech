const express = require("express");
const serveStatic = require("serve-static");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const reservationItemRoutes = require("./routes/api/reservationItems");
const path = require("path");

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

app.use("/api/reservationItems", reservationItemRoutes);

if (process.env.NODE_ENV === "production") {
    app.use("/", serveStatic(path.join(__dirname, "/dist")));
    app.get(/.*/, function (req, res) {
        res.sendFile(path.join(__dirname, "/dist/index.html"));
    });
}

app.listen(PORT, () => console.log(`Port: ${PORT}`));
