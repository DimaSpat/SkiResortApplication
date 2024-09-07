const { Router } = require("express");
const router = Router();

router.get("/test", (req, res) => {
  res.json([{ _id: 0, title: "test" }])
})

module.exports = router;
