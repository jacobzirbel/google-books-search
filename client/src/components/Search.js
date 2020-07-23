import React, { useContext, useState } from "react";
import UserContext from "../context/user-context";
import API from "../util/API";
import BookCard from "./BookCard";

const Search = () => {
  const { user, savedBooks, setSavedBooks } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const queryGoogleBooks = (query) => {
    API.queryGoogleBooks(query).then((response) => {
      setSearchResults(response.data);
    });
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = () => {
    queryGoogleBooks(searchQuery);
  };

  const handleBookSave = (book) => {
    API.saveBook(book, user.id).then(() => {
      setSavedBooks([...savedBooks, book]);
    });
  };

  const handleBookRemove = (book) => {
    API.removeBook(book, user.id).then(() => {
      setSavedBooks(savedBooks.filter((e) => e.googleId !== book.googleId));
    });
  };

  return (
    <>
      <input value={searchQuery} onChange={handleInputChange} />
      <button onClick={handleSubmit} disabled={!searchQuery}>
        Submit
      </button>
      {searchResults.length ? (
        searchResults.map((book) => (
          <BookCard
            key={book.googleId}
            saved={savedBooks.some((e) => e.googleId === book.googleId)}
            book={book}
            handleBookSave={handleBookSave}
            handleBookRemove={handleBookRemove}
          />
        ))
      ) : (
        <p>Enter a search term to start</p>
      )}
    </>
  );
};

export default Search;
