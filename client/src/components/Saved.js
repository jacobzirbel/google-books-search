import React, { useContext, useEffect } from "react";
import UserContext from "../context/user-context";
import BookCard from "./BookCard";
import API from "../util/API";
const Saved = () => {
  console.log("render saved");
  const { user, savedBooks, setSavedBooks } = useContext(UserContext);
  useEffect(() => {}, []);
  const handleBookRemove = (book) => {
    API.removeBook(book, user.id).then((response) => {
      setSavedBooks(savedBooks.filter((e) => e.googleId !== book.googleId));
    });
  };
  return (
    <>
      {savedBooks.map((book, i) => (
        <BookCard
          key={i}
          saved
          book={book}
          handleBookRemove={handleBookRemove}
        />
      ))}
    </>
  );
};

export default Saved;
