import React, { useContext, useState } from "react";
import UserContext from "../context/user-context";
import API from "../util/API";
import BookCard from "./BookCard";

const Search = () => {
  const userContext = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  console.log("search render");
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

  const handleBookSave = (bookId) => {
    API.saveBook(bookId, userContext.id);
  };
  return (
    <>
      <input value={searchQuery} onChange={handleInputChange} />
      <button onClick={handleSubmit} disabled={!searchQuery}>
        Submit
      </button>
      {searchResults
        ? searchResults.map((book) => (
            <BookCard key={book.id} {...book} handleBookSave={handleBookSave} />
          ))
        : null}
    </>
  );
};

export default Search;
