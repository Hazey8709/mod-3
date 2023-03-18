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
    res.json({
        message: "Books -GET*ID-",
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
    res.json({
        message: "Books -PUT-",
    });
});

// //! PATCH
// //*  localhost:4000/:id
// router.patch("/", (req, res, next) => {
//     res.json({
//         message: "Books -PATCH-",
//     });
// });

//! DELETE
//*  localhost:4000/:id
router.delete("/", (req, res, next) => {
    res.json({
        message: "Books -DELETE-",
    });
});

module.exports = router;
