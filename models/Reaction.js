const { Schema, Types, model } = require("mongoose");

// Schema for what makes up a comment
const reactionSchema = new Schema({
  reactionId: { type: Schema.Types.ObjectId, default: new Types.ObjectId() },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Initialize the Comment model
const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;
