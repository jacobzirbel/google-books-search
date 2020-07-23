const db = require("../models");
const axios = require("axios");
const bcrypt = require("bcrypt");
const { response } = require("express");

const getBookById = (bookId) => {
  return axios.get("https://www.googleapis.com/books/v1/volumes/" + bookId);
};

module.exports = {
  createUser: async (req, res) => {
    const { password, username } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    db.User.create({ username, password: hashedPassword })
      .then((e) => {
        res.status(200).json({ id: e._id, username: username, saved: [] });
      })
      .catch((err) => {
        if (err.code == 11000) {
          res.status(400).send("Username taken");
        } else {
          console.log("error, post user");
          res.status(500).send("Unknown Error Create");
        }
      });
  },
  loginUser: (req, res) => {
    const { password, username } = req.body;
    db.User.findOne({ username }).then(async (dbUser) => {
      if (!dbUser) {
        return res.status(400).send("Cannot find user");
      }
      try {
        passwordsMatch = await bcrypt.compare(password, dbUser.password);
        console.log(passwordsMatch, "match");
        if (passwordsMatch) {
          res.status(200).json({
            id: dbUser._id,
            username: dbUser.username,
            saved: dbUser.saved,
          });
        } else {
          res.status(400).send("Incorrect Password");
        }
      } catch {
        res.status(500).send("Unknown Error Login");
      }
    });
  },
  getSavedBooks: (req, res) => {
    const { userId } = req.params;
    db.User.findById(userId)
      .populate("saved")
      .then(({ saved }) => {
        res.status(200).json(saved);
      });
  },
};
