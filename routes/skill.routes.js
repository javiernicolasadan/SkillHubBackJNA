const Skill = require("../models/Skill.model");
const router = require("express").Router();

router.get("/", async(req, res, next) => {
    const category = req.query.category
    let skills
    if(category){
        skills = await Skill.find({category})
    }else{
        skills = await Skill.find()
    }
    res.status(200).json(skills)
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