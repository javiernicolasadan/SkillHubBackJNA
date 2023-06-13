const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    skills: {
      type: [Schema.Types.ObjectId], 
      ref: 'Skill',
    },
    subscribedEvents: {
      type: [Schema.Types.ObjectId],
      ref: 'Event',
    },
    createdEvents: {
      type: [Schema.Types.ObjectId],
      ref: 'Event',
    },
    imageUrl:{
      type: String,
      default: 'https://res.cloudinary.com/dvt9rqshe/image/upload/v1686667112/avatarTest_gqusvt.jpg'
    },
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
