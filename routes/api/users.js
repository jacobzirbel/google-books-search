const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../../models");

const getAllUsernames = () => {
  return new Promise((resolve) => {
    db.User.find().then((dbUsers) => {
      resolve(dbUsers.map((u) => u.username));
    });
  });
};

router
  .route("/")
  .get((req, res) => {
    console.log("hi");
  })
  .post(async (req, res) => {
    const { password, username } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    db.User.create({ username, password: hashedPassword })
      .then((e) => {
        res.status(200).send(e._id);
      })
      .catch((err) => {
        if (err.code == 11000) {
          res.status(400).send("Username taken");
        } else {
          console.log("error, post user");
          res.status(500).send("Unknown Error");
        }
      });
  });

router.route("/login").post((req, res) => {
  const { password, username } = req.body;
  db.User.findOne({ username }).then(async (dbUser) => {
    if (!dbUser) res.status(400).send("Cannot find user");
    try {
      passwordsMatch = await bcrypt.compare(password, dbUser.password);
      if (passwordsMatch) {
        res.status(200).send(dbUser._id);
      } else {
        res.status(400).send("Incorrect Password");
      }
    } catch {
      res.status(500).send("Unknown Error");
    }
  });
});

router
  .route("/:id")
  .get((req, res) => {
    console.log("hi");
  })
  .put((req, res) => {
    console.log("hi");
  })
  .delete((req, res) => {
    console.log("hi");
  });

module.exports = router;
