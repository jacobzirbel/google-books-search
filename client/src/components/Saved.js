import React, { useContext } from "react";
import UserContext from "../context/user-context";

const Saved = () => {
  const userContext = useContext(UserContext);
  return <h2>Saved {JSON.stringify(userContext)}</h2>;
};

export default Saved;
