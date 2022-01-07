require("dotenv").config();

const express = require('express');
const mongoose = require("mongoose");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");
const port = 8000;

const authRoutes = require("./routes/auth");
const hospitalRoutes = require("./routes/hospital");
const userRoutes = require("./routes/user");

mongoose.connect('mongodb://localhost:27017/healthCard', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database Connected");
});


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// my routes
app.use("/api", authRoutes);
app.use("/api", hospitalRoutes);
app.use("/api", userRoutes);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});