//! LEFT OFF AT 36:13 IN VIDEO ON MOD 3.1------------

const express = require("express");
const router = express.Router();

//! GET-ALL
//*  localhost:4000/
router.get("/", (req, res, next) => {
    res.json({
        message: "Authors -GET-",
    });
});

//! GET*ID
//*  localhost:4000/:authorId
router.get("/:authorId", (req, res, next) => {
    const authorId = req.params.authorId;
    res.json({
        message: "Authors -GET*ID-",
        id: authorId,
    });
});

//! POST
//*  localhost:4000/
router.post("/", (req, res, next) => {
    res.json({
        message: "Authors -POST-",
    });
});

//! PUT
//*  localhost:4000/:authorId
router.put("/:authorId", (req, res, next) => {
    const authorId = req.params.authorId;

    res.json({
        message: "Authors -PUT-",
        id: authorId,
    });
});

// //! PATCH
// //*  localhost:4000/:authorId
// router.patch("/:authorId", (req, res, next) => {
// const authorId = req.params.authorId;

//     res.json({
//         message: "Authors -PATCH-",
//         id: authorId,
//     });
// });

//! DELETE
//*  localhost:4000/:authorId
router.delete("/:authorId", (req, res, next) => {
    const authorId = req.params.authorId;

    res.json({
        message: "Authors -DELETE-",
        id: authorId,
    });
});

module.exports = router;
