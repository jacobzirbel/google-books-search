import React, { useContext, useState } from "react";
import UserContext from "../context/user-context";
import API from "../util/API";
import BookCard from "./BookCard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
      <h1>Search for books</h1>
      <div id="push" style={{ height: "50px" }} />
      <TextField
        value={searchQuery}
        onChange={handleInputChange}
        label="Search"
        variant="outlined"
      />
      {/* <input value={searchQuery} onChange={handleInputChange} /> */}
      <Button
        onClick={handleSubmit}
        disabled={!searchQuery}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
      {searchResults.length ? (
        searchResults.map((book) => (
          <BookCard
            key={book.googleId}
            loggedIn={!!user}
            saved={savedBooks.some((e) => e.googleId === book.googleId)}
            book={book}
            handleBookSave={handleBookSave}
            handleBookRemove={handleBookRemove}
          />
        ))
      ) : (
        <p>{searchQuery ? "" : "Enter a search term to start"}</p>
      )}
    </>
  );
};

export default Search;
