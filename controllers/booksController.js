const db = require("../models");
const axios = require("axios");
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
              googleId: id,
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
    const { book, userId } = req.body;
    db.Book.findOne({ googleId: book.googleId }).then(async (dbBook) => {
      let savedBookId;
      if (!dbBook) {
        try {
          let createdBook = await db.Book.create(book);
          savedBookId = createdBook.id;
        } catch {
          res.status(500).json("Unknown Error");
        }
      } else {
        savedBookId = dbBook.id;
      }
      db.User.findByIdAndUpdate(userId, { $push: { saved: savedBookId } }).then(
        (response) => {
          res.status(200).json("Book saved successfully");
        }
      );
    });
  },
  removeBookFromUser: (req, res) => {
    const { book, userId } = req.body;
    console.log("book", book);
    db.Book.findOne({ googleId: book.googleId }).then((dbBook) => {
      db.User.findByIdAndUpdate(userId, { $pull: { saved: dbBook.id } }).then(
        (result) => {
          console.log(result);
          res.status(200).json({ removed: dbBook });
        }
      );
    });
  },
};
