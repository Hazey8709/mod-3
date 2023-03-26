const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Author = require("../models/author");
const Messages = require("../erMessages/messages");

//! GET-ALL
//*  localhost:4000/
router.get("/", (req, res, next) => {
    Author.find()
        .then((authors) => {
            res.status(200).json({
                message: Messages.allAuthorsFetched,
                count: authors.length,
                authors: authors.map((author) => {
                    return {
                        author: author,
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

    Author.findById(id)
        //.select("name _id")
        .populate("book", "title author")
        .exec()
        .then((author) => {
            if (author) {
                res.status(201).json({
                    message: Messages.authorFetched,
                    author: author,
                });
            } else {
                res.status(404).json({
                    message: "Author Not Found",
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
//*  localhost:4000/
router.post("/", (req, res, next) => {
    Author.findOne({
        title: req.body.title,
        name: req.body.name,
    })
        .exec()
        .then((author) => {
            if (author) {
                //* author already exists, return error response
                return res.status(409).json({
                    error: {
                        message: "Author already exists",
                    },
                });
            } else {
                //* Author does not exist, create and save new book
                const newAuthor = new Author({
                    _id: mongoose.Types.ObjectId(),
                    title: req.body.title,
                    author: req.body.author,
                });

                newAuthor
                    .save()
                    .then((result) => {
                        console.log(result);
                        res.status(200).json({
                            message: "Author saved",
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

// //! Post w/check
// //*  localhost:4000/
// router.post("/", (req, res, next) => {
//     Author.findOne({ title: req.body.title, author: req.body.author })
//         .exec()
//         .then((author) => {
//             if (author) {
//                 //* author already exists, return error response
//                 return res.status(409).json({
//                     error: {
//                         message: "author already exists",
//                     },
//                 });
//             } else {
//                 //* author does not exist, create and save new book
//                 const newAuthor = new Author({
//                     _id: mongoose.Types.ObjectId(),
//                     title: req.body.title,
//                     author: req.body.author,
//                 });

//                 newAuthor
//                     .save()
//                     .then((result) => {
//                         console.log(result);
//                         res.status(200).json({
//                             message: Messages.authorSaved,
//                             author: {
//                                 title: result.title,
//                                 author: result.author,
//                                 id: result._id,
//                                 metadata: {
//                                     method: req.method,
//                                     host: req.hostname,
//                                 },
//                             },
//                         });
//                     })
//                     .catch((err) => {
//                         console.error(err.message);
//                         res.status(500).json({
//                             error: {
//                                 message: err.message,
//                             },
//                         });
//                     });
//             }
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

//! PATCH
//*  localhost:4000/:id
router.patch("/:id", (req, res, next) => {
    const id = req.params.id;

    const updatedAuthor = {
        title: req.body.title,
        author: req.body.author,
    };

    Author.updateOne(
        {
            _id: id,
        },
        {
            $set: updatedAuthor,
        }
    )
        .then((result) => {
            res.status(200).json({
                message: "Updated Author",
                author: {
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

    Author.findByIdAndRemove(id)
        .then((author) => {
            if (author) {
                res.status(200).json({
                    message: "Author Deleted",
                    author: {
                        title: author.title,
                        author: author.author,
                        id: author._id,
                    },
                    metadata: {
                        host: req.hostname,
                        method: req.method,
                    },
                });
            } else {
                res.status(404).json({
                    message: "No Author Found",
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
