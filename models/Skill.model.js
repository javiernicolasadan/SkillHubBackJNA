const { Schema, model } = require("mongoose");

const skillSchema = new Schema(
  {
    category: {
      type: String,
      required: true, 
      enum: ['Music', 'Photography', 'Coding', 'Cooking', 'Gardening', 'Beauty', 'Domestic-Skills', 'Languages', 'Other' ],
      default: "Other",
    },
    title: {
      type: String,   
      required: true,
    },
    details: {
      type: String,
      maxLength: 2000,
      required: true,
    },
    events: {
      type: [Object]
    },
    createdBy: {
      type: String,
  },
  },
  {
    timestamps: true
  }
);

const Skill = model("Skill", skillSchema);

module.exports = Skill;