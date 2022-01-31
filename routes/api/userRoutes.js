const router = require("express").Router();
const {
  getSingleUser,
  getUsers,
  createUser,
  createFriend,
  removeFriend,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

router
  .route("/:userId/friends/:friendId")
  .get(createFriend)
  .delete(removeFriend);

router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
