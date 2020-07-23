const router = require("express").Router();
const db = require("../../models");
const userController = require("../../controllers/userController");

router.route("/").post(userController.createUser);
router.route("/login").post(userController.loginUser);
router.route("/books/:userId").get(userController.getSavedBooks);
module.exports = router;
