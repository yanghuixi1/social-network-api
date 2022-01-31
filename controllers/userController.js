const User = require("../models/User");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  async updateUser(req, res) {
    try {
      let user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(404).json({ message: "No user with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      let user = await User.findOneAndRemove({ _id: req.params.userId });
      if (user) {
        res.status(200).json("User successfully deleted!");
      } else {
        res.status(404).json({ message: "No user with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new friend
  async createFriend(req, res) {
    try {
      let user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (user) {
        let friend = await User.findOneAndUpdate(
          { _id: req.params.friendId },
          { $addToSet: { friends: req.params.userId } },
          { new: true }
        );
        res.status(201).json(user);
      } else {
        res.status(404).json({ message: "No user with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // remove a friend
  async removeFriend(req, res) {
    try {
      let user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }
      );
      if (user) {
        let friend = await User.findOneAndUpdate(
          { _id: req.params.friendId },
          { $pull: { friends: req.params.userId } }
        );
        res.status(201).json(user);
      } else {
        res.status(404).json({ message: "No user with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
