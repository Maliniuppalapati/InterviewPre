const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String },
    experience: { type: String, required: true },
    topicsToFocus: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
