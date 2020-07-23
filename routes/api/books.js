const router = require("express").Router();
const booksController = require("../../controllers/booksController");
router.route("/save").post(booksController.saveBookToUser);
router.route("/remove").post(booksController.removeBookFromUser);
router.route("/:search").get(booksController.queryGoogleBooks);

module.exports = router;
