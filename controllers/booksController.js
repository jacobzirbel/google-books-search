const db = require("../models");
const axios = require("axios");
const { response } = require("express");
// Defining methods for the booksController
module.exports = {
  queryGoogleBooks: (req, res) => {
    const { search } = req.params;
    axios
      .get("https://www.googleapis.com/books/v1/volumes/?q=" + search)
      .then((response) => {
        res.json(
          response.data.items.map((item) => {
            const { id, volumeInfo } = item;
            const {
              authors,
              title,
              description,
              imageLinks,
              infoLink,
            } = volumeInfo;
            return {
              id,
              authors,
              title,
              description,
              image: imageLinks.thumbnail,
              link: infoLink,
            };
          })
        );
      });
  },
  saveBookToUser: (req, res) => {
    const { bookId, userId } = req.body;
    console.log(bookId, userId);
    db.User.findByIdAndUpdate(userId, { $push: { saved: bookId } }).then(
      (response) => {
        console.log(response, "response!!!!!!!!!");
        res.json("hi");
      }
    );
  },
};
