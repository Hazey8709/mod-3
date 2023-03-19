const express = require("express");
const router = express.Router();

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
    res.json({
        message: "Books -POST-",
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
