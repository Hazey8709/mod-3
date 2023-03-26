const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Pokemon = require("../models/pokemon");
const Messages = require("../erMessages/messages");

//! GET-ALL
//*  localhost:4000/
router.get("/", (req, res, next) => {
    Pokemon.find()
        .then((pokemon) => {
            res.status(200).json({
                message: Messages.allPokemonFetched,
                count: pokemon.length,
                names: pokemon.map((pokemon) => {
                    return {
                        title: pokemon.title,
                        desc: pokemon.desc,
                        id: pokemon._id,
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

    Pokemon.findById(id)
        .then((pokemon) => {
            if (pokemon) {
                res.status(200).json({
                    message: Messages.pokemonFetched,
                    name: {
                        title: pokemon.title,
                        desc: pokemon.desc,
                        id: pokemon._id,
                    },
                    metadata: {
                        host: req.hostname,
                        method: req.method,
                    },
                });
            } else {
                res.status(404).json({
                    message: "No Pokemon Found",
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
    Pokemon.findOne({ title: req.body.title })
        .exec()
        .then((pokemon) => {
            if (pokemon) {
                // Pokemon already exists, return error response
                return res.status(409).json({
                    error: {
                        message: "Pokemon already exists",
                    },
                });
            } else {
                // Pokemon does not exist, create and save new name
                const newPokemon = new Pokemon({
                    _id: mongoose.Types.ObjectId(),
                    title: req.body.title,
                    desc: req.body.desc,
                });

                newPokemon
                    .save()
                    .then((result) => {
                        console.log(result);
                        res.status(200).json({
                            message: "Pokemon saved",
                            pokemon: {
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

    const updatedPokemon = {
        title: req.body.title,
        desc: req.body.desc,
    };

    Pokemon.updateOne(
        {
            _id: id,
        },
        {
            $set: updatedPokemon,
        }
    )
        .then((result) => {
            res.status(200).json({
                message: Messages.updatedPokemon,
                pokemon: {
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

    Pokemon.findByIdAndRemove(id)
        .then((pokemon) => {
            if (pokemon) {
                res.status(200).json({
                    message: Messages.pokemonDeleted,
                    pokemon: {
                        title: pokemon.title,
                        author: pokemon.author,
                        id: pokemon._id,
                    },
                    metadata: {
                        host: req.hostname,
                        method: req.method,
                    },
                });
            } else {
                res.status(404).json({
                    message: "No Pokemon Found",
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
