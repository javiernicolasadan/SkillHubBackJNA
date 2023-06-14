const router = require("express").Router();
const uploader = require("../middleware/cloudinary.config");
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.put('/updateUser/:userId', uploader.single("imageUrl"), async(req, res, next) =>{
  let imageUrl
  if(req.file){
    imageUrl = req.file.path
  }else{
    imageUrl = req.body.imageUrl
  }
  
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {email: req.body.email, username: req.body.username, imageUrl: imageUrl}, {new:true})
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
