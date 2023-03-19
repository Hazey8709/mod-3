const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Book = require("../models/books");

//! GET-ALL
//*  localhost:4000/
router.get("/", (req, res, next) => {
    res.json({
        message: "Books -GET-",
    });
});

//! GET*ID
//*  localhost:4000/:id
router.get("/:id", (req, res, next) => {
    const id = req.params.id;

    res.json({
        message: "Books -GET*ID-",
        id: id,
    });
});

//! POST
//*  localhost:4000/:id
router.post("/", (req, res, next) => {
    const newBook = new Book({
        id: mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
    });

    //! Write DB
    newBook
        .save()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: "Book Saved",
                Book: {
                    title: result.title,
                    author: result.author,
                    id: result.id,
                    metadata: {
                        method: req.method,
                        host: req.hostname,
                    },
                },
            });
        })

        .catch((err) => {
            console.error(err.message);
            res.status(500).json({
                error: {
                    message: err.message,
                },
            });
        });
});

//! PUT
//*  localhost:4000/:id
router.put("/", (req, res, next) => {
    const id = req.params.id;

    res.json({
        message: "Books -PUT-",
        id: id,
    });
});

// //! PATCH
// //*  localhost:4000/:id
// router.patch("/", (req, res, next) => {
//     const id = req.params.id;
//
//     res.json({
//         message: "Books -PATCH-",
//         id: id,
//     });
// });

//! DELETE
//*  localhost:4000/:id
router.delete("/", (req, res, next) => {
    const id = req.params.id;

    res.json({
        message: "Books -DELETE-",
        id: id,
    });
});

module.exports = router;
