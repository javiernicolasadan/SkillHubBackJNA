const { Schema, model } = require("mongoose");

const skillSchema = new Schema(
  {
    category: {
      type: String,
      required: true, 
      enum: ['Music', 'Fotografy', 'Coding', 'Cooking', 'Gardering', 'Health', 'Domestic-Skills', 'Idioms' ]
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
      type: [Schema.Types.ObjectId],
      ref: 'event',  
    }
  },
  {
    timestamps: true
  }
);

const Skill = model("Skill", skillSchema);

module.exports = Skill;