const Skill = require("../models/Skill.model");
const router = require("express").Router();

/* router.get("/", (req, res, next) => {
  res.json("Skill good in here");
}); */

router.get("/", (req, res, next) => {
  res.json("Skill good in here");
});

// POST  to add one Skill
router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const newSkill = await Skill.create(payload);
    res.status(201).json(newSkill);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
