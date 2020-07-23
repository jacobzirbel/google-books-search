import React, { useContext, useEffect } from "react";
import UserContext from "../context/user-context";
import BookCard from "./BookCard";
import API from "../util/API";

const Saved = () => {
  const { user, savedBooks, setSavedBooks } = useContext(UserContext);

  const handleBookRemove = (book) => {
    API.removeBook(book, user.id).then(() => {
      setSavedBooks(savedBooks.filter((e) => e.googleId !== book.googleId));
    });
  };

  return (
    <>
      {savedBooks.map((book, i) => (
        <BookCard
          key={i}
          saved={true}
          book={book}
          handleBookRemove={handleBookRemove}
        />
      ))}
    </>
  );
};

export default Saved;
