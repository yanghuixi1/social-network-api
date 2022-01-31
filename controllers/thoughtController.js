const { Thought, User } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  async createThought(req, res) {
    try {
      let thought = await Thought.create(req.body);
      let user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      if (user) {
        res.status(201).json(thought);
      } else {
        res.status(404).json({
          message: "Thought created, but found no user with that ID",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a thought
  async updateThought(req, res) {
    try {
      let thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (thought) {
        res.status(201).json(thought);
      } else {
        res.status(404).json({ message: "No thought with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a thought
  async deleteThought(req, res) {
    try {
      let thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (thought) {
        let user = await User.findOneAndUpdate(
          { username: thought.username },
          { $pull: { thoughts: thought._id } }
        );
        if (user) {
          res.status(200).json("Thought successfully deleted!");
        } else {
          res
            .status(404)
            .json({ message: "Thought deleted but no user with this ID" });
        }
      } else {
        res.status(404).json({ message: "No thought with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThoughtReaction(req, res) {
    try {
      let thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (thought) {
        res.status(201).json(thought);
      } else {
        res.status(404).json({ message: "No thought with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeThoughtReaction(req, res) {
    try {
      let thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.body.reactionId } } }
      );
      if (thought) {
        res.status(200).json("Reaction removed successfully");
      } else {
        res.status(404).json({ message: "No thought with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
