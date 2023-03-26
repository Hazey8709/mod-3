//!   Routes/names.js

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Name = require("../models/name");

//! GET-ALL
//*  localhost:4000/
router.get("/", (req, res, next) => {
    Name.find()
        .then((names) => {
            res.status(200).json({
                message: "All Names Fetched",
                count: names.length,
                names: names.map((name) => {
                    return {
                        title: name.title,
                        desc: name.desc,
                        id: name._id,
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

    Name.findById(id)
        .then((name) => {
            if (name) {
                res.status(200).json({
                    message: "Name Fetched",
                    name: {
                        title: name.title,
                        desc: name.desc,
                        id: name._id,
                    },
                    metadata: {
                        host: req.hostname,
                        method: req.method,
                    },
                });
            } else {
                res.status(404).json({
                    message: "No Name Found",
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
//*  localhost:4000/:id
router.post("/", (req, res, next) => {
    Name.findOne({ title: req.body.title })
        .exec()
        .then((name) => {
            if (name) {
                // Name already exists, return error response
                return res.status(409).json({
                    error: {
                        message: "Name already exists",
                    },
                });
            } else {
                // Name does not exist, create and save new name
                const newName = new Name({
                    _id: mongoose.Types.ObjectId(),
                    title: req.body.title,
                    desc: req.body.desc,
                });

                newName
                    .save()
                    .then((result) => {
                        console.log(result);
                        res.status(200).json({
                            message: "Name saved",
                            name: {
                                title: result.title,
                                desc: result.desc,
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

// //! PUT
// //*  localhost:4000/:id
// router.put("/:id", (req, res, next) => {
//     const id = req.params.id;

//     res.json({
//         message: "Names -PUT-",
//         id: id,
//     });
// });

//! PATCH
//*  localhost:4000/:id
router.patch("/:id", (req, res, next) => {
    const id = req.params.id;

    const updatedName = {
        title: req.body.title,
        desc: req.body.desc,
    };

    Name.updateOne(
        {
            _id: id,
        },
        {
            $set: updatedName,
        }
    )
        .then((result) => {
            res.status(200).json({
                message: "Updated Name",
                name: {
                    title: result.title,
                    desc: result.desc,
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

    Name.findByIdAndRemove(id)
        .then((name) => {
            if (name) {
                res.status(200).json({
                    message: "Name Deleted",
                    name: {
                        title: name.title,
                        author: name.author,
                        id: name._id,
                    },
                    metadata: {
                        host: req.hostname,
                        method: req.method,
                    },
                });
            } else {
                res.status(404).json({
                    message: "No Name Found",
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
