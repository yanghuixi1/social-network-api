const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

// Schema for what makes up a thought
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxlength: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        let dateObj = new Date(date);
        let dateString = dateObj.toDateString();
        let timeString = dateObj.toTimeString();
        return `${dateString} @ ${timeString}`;
      },
    },
    username: { type: String, required: true },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
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
