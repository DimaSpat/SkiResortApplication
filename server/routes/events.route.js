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

router.post("/create", async (req, res) => {
  try {
    const form = req.body.form;

    await Events.create({
      title: form.title,
      description: form.description,
    });
    res.json(form);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  {
    const { id } = req.params;
    try {
      await Events.findByIdAndDelete(id);
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  }
})

module.exports = router;
