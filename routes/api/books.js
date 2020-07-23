const router = require("express").Router();
const booksController = require("../../controllers/booksController");
router.route("/").post(booksController.saveBookToUser);
router.route("/:search").get(booksController.queryGoogleBooks);

module.exports = router;
