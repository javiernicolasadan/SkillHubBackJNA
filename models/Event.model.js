const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true, 
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true, 
    },
    locationType: {
      type: String, 
      enum: ['online', 'in-person'],
      default: 'online',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    skillTitle: {
        type: String, 
    },
    skillid:{
      type:Schema.Types.ObjectId,
      ref: 'Skill',
    },
    imageUrl: {
      type: String,
    }

  },
  {
    timestamps: true
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;