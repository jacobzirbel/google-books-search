import React from "react";
import API from "../util/API";

const BookCard = (props) => {
  const { handleBookSave, book } = props;
  const { title, authors, description, image, link } = book;
  return (
    <div>
      <p>start</p>
      <button onClick={() => handleBookSave(book)}>saveBook</button>
      <h4>Title: {title}</h4>
      <p>
        Authors:{" "}
        {authors.map((a, i) => (
          <span key={i}>{a}</span>
        ))}
      </p>
      {/* <p>description: {description}</p> */}
      <img src={image} alt="book cover" />
      <a href={link}>Link</a>
      <p>end</p>
    </div>
  );
};

export default BookCard;
