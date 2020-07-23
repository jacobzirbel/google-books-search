const router = require("express").Router();
const userRoutes = require("./users");
const bookRoutes = require("./books");

// Book routes
router.use("/users", userRoutes);
router.use("/books", bookRoutes);

module.exports = router;
