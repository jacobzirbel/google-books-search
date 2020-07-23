import React, { useContext } from "react";
import UserContext from "../context/user-context";

const Search = () => {
  const userContext = useContext(UserContext);
  return <h2>Search {JSON.stringify(userContext)}</h2>;
};

export default Search;
