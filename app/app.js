const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const authorRoutes = require("../routes/authors");
const bookRoutes = require("../routes/books");

//! Morgan logging (middleware)
app.use(morgan("dev"));

//! Parsing Data
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//! Service Status
//* localhost:4000/
app.get("/", (req, res) => {
    res.status(200).json({
        message: "connected",
        method: req.method,
    });
    console.log("Connected!");
});

//! CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-requested-with, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, PATCH, DELETE"
        );
    }
    next();
});

//! Routers
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

//! Error Handling (middleware)
app.use((req, res, next) => {
    const error = new Error("NOT FOUND");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status,
            method: req.method,
        },
    });
});

//! Mongoose
mongoose.connect(process.env.mongoDB);

module.exports = app;

// //! Mongoose  NO-CALL BACK ALLOWED
// mongoose.connect(process.env.mongoDB, (err) => {
//     if (err) {
//         console.error("Error: ", err.message);
//     } else {
//         console.log("connection success");
//     }
// });
