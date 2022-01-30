const { Schema, model } = require("mongoose");

// Schema for what makes up a thought
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [{ type: Schema.Types.ObjectId, ref: "reaction" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize the thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
