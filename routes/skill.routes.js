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

// GET to show one Skill Details

router.get('/:skillid', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.skillid).populate('events')
    res.status(200).json(skill)
  } catch (error) {
   console.log(error) 
  }
})

// PUT to update 
router.put('/:skillid', async (req, res) => {
  const { skillid } = req.params
  const payload = req.body
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(skillid, payload, { new: true })
    res.status(200).json(updatedSkill)
  } catch (error) {
    console.log(error)
  }
})

// Delete to delete 
router.delete('/:skillid', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.skillid)
    res.status(200).json({ message: 'Skill succesfully deleted' })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
