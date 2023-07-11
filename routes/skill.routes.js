const User = require("../models/User.model");
const Skill = require("../models/Skill.model");
const router = require("express").Router();
const uploader = require("../middleware/cloudinary.config")
const defaultImageUrl = "https://res.cloudinary.com/dgbg06crz/image/upload/v1684948163/skills_default_ozdz3i.jpg"

router.get("/", async (req, res, next) => {
  const category = req.query.category;
  let skills;
  if (category) {
    skills = await Skill.find({ category }).populate("createdBy")

  } else {
    skills = await Skill.find().populate("createdBy")
  }
  res.status(200).json(skills);
});

// POST  to add one Skill
router.post("/create", uploader.single("imageUrl"), async (req, res) => {
  console.log("req body", req.body)
  const {title, details, category, createdBy} = req.body;
  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = defaultImageUrl;
  }
  const userId = req.body.createdBy;
  console.log("User ID:", userId);
  /* console.log("Hello:", payload); */
  try {
    const newSkill = await Skill.create({title, details, category, createdBy, imageUrl});
    if (userId) {
      const userSkills = await User.findByIdAndUpdate(
        userId,
        { $push: { skills: newSkill._id } },
        { new: true }
      );
      console.log(userSkills);
    }
    res.status(201).json(newSkill);
  } catch (error) {
    console.log(error);
  }
});

// GET to show one Skill Details

router.get("/:skillid", async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.skillid).populate("events");
    res.status(200).json(skill);
  } catch (error) {
    console.log(error);
  }
});

//UPDATE Skill


// PUT to update
router.put("/:skillid", uploader.single("imageUrl"), async (req, res) => {
  const { skillid } = req.params;
  
  try {
  if (req.file) {
    const updatedSkill = await Skill.findByIdAndUpdate(skillid, {...req.body, imageUrl: req.file.path},{
      new: true,
    });
    res.status(200).json(updatedSkill);
  } else {
    const updatedSkill = await Skill.findByIdAndUpdate(skillid, {...req.body},{
      new: true,
    });
    res.status(200).json(updatedSkill);
  }
      
  } catch (error) {
    console.log(error);
  }
});

// Delete to delete
router.delete("/:skillid", async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.skillid);
    res.status(200).json({ message: "Skill succesfully deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
