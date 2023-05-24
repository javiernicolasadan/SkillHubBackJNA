const Event = require("../models/Event.model");
const Skill = require("../models/Skill.model")
const User = require("../models/User.model")
const router = require("express").Router();
const uploader = require("../middleware/cloudinary.config")
const defaultImageUrl = "https://res.cloudinary.com/dgbg06crz/image/upload/v1684852040/jrdskan28uad3zbjd1se.jpg"


router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
    res.status(200).json(events)
  } catch (error) {
    console.log(error);
  }
})

// POST to add one Event
router.post("/create", uploader.single("imageUrl"), async (req, res) => {
    const {title, date, locationType, description, skillTitle, skillid  } = req.body;
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = defaultImageUrl;
    }
  try {
    const newEvent = await Event.create({title, date, locationType, description, skillTitle, skillid, imageUrl});
    const eventId = newEvent._id
    const addedEvent = await Skill.findByIdAndUpdate(req.body.skillid, { $push: { events: eventId }}, { new: true })
    res.status(201).json(newEvent);
  } catch (error) {
    console.log(error);
  }
});

//GET event details
router.get("/eventdets/:eventId", async (req, res) => {
    
  try {
    console.log(req.params)
    const eventId = req.params.eventId
    const eventDetails = await Event.findById(eventId )
    const { _id, title, description, date, locationType } = eventDetails;
    res.status(200).json(eventDetails)
      
  } catch (error) {
    console.log(error);
  }
})

// POST edit event
router.put ("/updateevent/:eventId", async (req, res) => {

  try {
    const eventId = req.params.eventId
    const updateDataEvent = req.body
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
       title: updateDataEvent.title,
       description: updateDataEvent.description,
       date: updateDataEvent.date,
       locationType: updateDataEvent.locationType,

      }, {new:true})
      res.status(200).json(updatedEvent)
  } catch (error) {
    console.log(error)
  }

})

router.delete ("/deleteevent/:eventId", async (req, res) => {
  try{
    const eventId = req.params.eventId

    await Event.findByIdAndDelete(eventId)
    res.status(200).json({message: "Event deleted"})
  } catch (error) {
    console.log(error)
}})

router.post("/subscribe/:eventId", async(req, res, next) => {
  try {
    const eventId = req.params.eventId
    const userId = req.body.userId
    console.log("Event ID:", eventId);
    console.log("User ID:", userId);
    const potentialSubsc = await User.findById(userId)
    if(potentialSubsc.subscribedEvents.includes(eventId)){
      const unSubsc = await User.findByIdAndUpdate(userId, { $pull: { subscribedEvents: eventId }}, { new: true })
      res.status(200).json({message: "Subscription deleted"})
    }else{
      const subsc = await User.findByIdAndUpdate(userId, { $push: { subscribedEvents: eventId }}, { new: true })
      res.status(200).json({message: "Subscription successfull"})
    }
  } catch (error) {
    console.log(error)
  }
});
module.exports = router;