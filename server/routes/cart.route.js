const { Router } = require("express");
const router = Router();

router.get("/order", (req, res) => {
    console.log(req.body);
});

module.exports = router;
