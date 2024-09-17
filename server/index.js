const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const URL = "mongodb+srv://admin:admin@skiresort.3gnwk.mongodb.net/?retryWrites=true&w=majority&appName=SkiResort";

app.use(bodyParser.json());
app.use(cors());
app.use("/api/resort", require("./routes/resort.route"));
app.use("/api/cart", require("./routes/cart.route"));
app.use("/api/events", require("./routes/events.route"));
app.use("/api/login", require("./routes/admin.route"));

mongoose.connect(URL);

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
