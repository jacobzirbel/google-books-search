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
  const savedBooksJsx = savedBooks.map((book, i) => (
    <BookCard
      loggedIn={!!user}
      key={i}
      saved={true}
      book={book}
      handleBookRemove={handleBookRemove}
    />
  ));
  const noBooksSavedJsx = <h1>You have no books saved</h1>;
  const userIsLoggedInJsx = savedBooks.length ? savedBooksJsx : noBooksSavedJsx;
  return (
    <>
      <h1>Saved Books</h1>
      {user ? userIsLoggedInJsx : <h1>You must be logged in to save books</h1>}
    </>
  );
};

export default Saved;
