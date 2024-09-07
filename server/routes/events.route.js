const { Router } = require("express");
const router = Router();
const Events = require("../models/Events");

router.get("/", async (req, res) => {
  try {
    const events = await Events.find().lean();
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error with fetching events" });
  }
});

module.exports = router;
