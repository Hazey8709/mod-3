const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Book = require("../models/book");

//! GET-ALL
//*  localhost:4000/
router.get("/", (req, res, next) => {
    Book.find()
        .then((books) => {
            res.status(200).json({
                message: "All Books Fetched",
                count: books.length,
                books: books.map((book) => {
                    return {
                        title: book.title,
                        author: book.author,
                        id: book._id,
                    };
                }),
                metadata: {
                    host: req.hostname,
                    method: req.method,
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

//! GET*ID
//*  localhost:4000/:id
router.get("/:id", (req, res, next) => {
    const id = req.params.id;

    Book.findById(id)
        .then((book) => {
            if (book) {
                res.status(200).json({
                    message: "Book Fetched",
                    book: {
                        title: book.title,
                        author: book.author,
                        id: book._id,
                    },
                    metadata: {
                        host: req.hostname,
                        method: req.method,
                    },
                });
            } else {
                res.status(404).json({
                    message: "No Book Found",
                });
            }
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

//! Post w/check
router.post("/", (req, res, next) => {
    Book.findOne({ title: req.body.title, author: req.body.author })
        .exec()
        .then((book) => {
            if (book) {
                // Book already exists, return error response
                return res.status(409).json({
                    error: {
                        message: "Book already exists",
                    },
                });
            } else {
                // Book does not exist, create and save new book
                const newBook = new Book({
                    _id: mongoose.Types.ObjectId(),
                    title: req.body.title,
                    author: req.body.author,
                });

                newBook
                    .save()
                    .then((result) => {
                        console.log(result);
                        res.status(200).json({
                            message: "Book saved",
                            book: {
                                title: result.title,
                                author: result.author,
                                id: result._id,
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
            }
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

// //! POST
// //*  localhost:4000/:id
// router.post("/", (req, res, next) => {
//     const newBook = new Book({
//         _id: mongoose.Types.ObjectId(),
//         title: req.body.title,
//         author: req.body.author,
//     });

//     //! Write DB
//     newBook
//         .save()
//         .then((result) => {
//             console.log(result);
//             res.status(200).json({
//                 message: "Book Saved",
//                 book: {
//                     title: result.title,
//                     author: result.author,
//                     id: result._id,
//                     metadata: {
//                         method: req.method,
//                         host: req.hostname,
//                     },
//                 },
//             });
//         })

//         .catch((err) => {
//             console.error(err.message);
//             res.status(500).json({
//                 error: {
//                     message: err.message,
//                 },
//             });
//         });
// });

// //! PUT
// //*  localhost:4000/:bookId
// router.put("/:bookId", (req, res, next) => {
//     const bookId = req.params.bookId;

//     res.json({
//         message: "Books -PUT-",
//         id: bookId,
//     });
// });

//! PATCH
//*  localhost:4000/:id
router.patch("/:bookId", (req, res, next) => {
    const bookId = req.params.bookId;

    const updatedBook = {
        title: req.body.title,
        author: req.body.author,
    };

    Book.updateOne(
        {
            _id: bookId,
        },
        {
            $set: updatedBook,
        }
    )
        .then((result) => {
            res.status(200).json({
                message: "Updated Book",
                book: {
                    title: result.title,
                    author: result.author,
                    id: result._id,
                },
                metadata: {
                    host: req.hostname,
                    method: req.method,
                },
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: {
                    message: err.message,
                },
            });
        });
});

//! DELETE
//*  localhost:4000/:id
router.delete("/:id", (req, res, next) => {
    const id = req.params.id;

    Book.findByIdAndRemove(id)
        .then((book) => {
            if (book) {
                res.status(200).json({
                    message: "Book Deleted",
                    book: {
                        title: book.title,
                        author: book.author,
                        id: book._id,
                    },
                    metadata: {
                        host: req.hostname,
                        method: req.method,
                    },
                });
            } else {
                res.status(404).json({
                    message: "No Book Found",
                });
            }
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

module.exports = router;
