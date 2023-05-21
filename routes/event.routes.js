const Event = require("../models/Event.model");
const router = require("express").Router();

/* router.get("/", (req, res, next) => {
  res.json("Event good in here");
}); */

router.get("/", (req, res, next) => {
  res.json("Event good in here");
});

// POST  to add one Event
router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const newEvent = await Event.create(payload);
    res.status(201).json(newEvent);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;