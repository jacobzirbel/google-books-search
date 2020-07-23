const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  authors: { type: Array, required: true },
  description: { type: String, required: false },
  image: { type: String, required: false },
  link: { type: String, required: false },
  googleId: { type: String, required: true },
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
