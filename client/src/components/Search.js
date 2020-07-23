import React, { useContext, useState } from "react";
import UserContext from "../context/user-context";
import API from "../util/API";
import BookCard from "./BookCard";

const Search = () => {
  const { user, setUser } = useContext(UserContext);
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
    API.saveBook(book, user.id).then((response) => {
      //possible:
      console.log(response);
    });
  };

  return (
    <>
      <input value={searchQuery} onChange={handleInputChange} />
      <button onClick={handleSubmit} disabled={!searchQuery}>
        Submit
      </button>
      {searchResults
        ? searchResults.map((book) => (
            <BookCard
              key={book.googleId}
              book={book}
              handleBookSave={handleBookSave}
            />
          ))
        : null}
    </>
  );
};

export default Search;
