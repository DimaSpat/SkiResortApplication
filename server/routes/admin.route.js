const { Router } = require("express");
const router = Router();
const User = require("../models/Users");
const Users = require("../models/Users");

router.post("/", (req, res) => {
  const { username, password } = req.body;

  const user = User.findOne({ username, password });

  if (user) {
    res.status(200).json(true);
  } else {
    res.status(200).json(false);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await Users.find().lean();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error with fetching users" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const form = req.body.form;
    await Users.create({
      username: form.username,
      password: form.password,
    });
    res.json(form);
  } catch (error) {
    console.log(error);
  }
})

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Users.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
