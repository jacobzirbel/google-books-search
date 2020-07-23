import React, { useContext, useEffect } from "react";
import UserContext from "../context/user-context";
import API from "../util/API";

const Saved = ({ books }) => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {}, []);
  console.log(books, "books");
  return (
    <>
      {books.map((book, i) => (
        <p key={i}>{book.title}</p>
      ))}
    </>
  );
};

export default Saved;
