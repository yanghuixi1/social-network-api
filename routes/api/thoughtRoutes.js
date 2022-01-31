const router = require("express").Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

// router
//   .route("/:userId/friends/:friendId")
//   .get(createFriend)
//   .delete(removeFriend);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
