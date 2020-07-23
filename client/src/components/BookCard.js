import React from "react";

const BookCard = (props) => {
  const { handleBookSave, handleBookRemove, saved, book } = props;
  const { title, authors, description, image, link } = book;

  const handleClick = (params) => {
    if (saved) handleBookRemove(book);
    if (!saved) handleBookSave(book);
  };
  return (
    <div>
      <p>start</p>
      <button onClick={handleClick}>
        {saved ? "Remove from List" : "Save to list"}
      </button>

      <h4>Title: {title || "No title found"}</h4>
      <p>
        Authors:{" "}
        {authors ? (
          authors.map((a, i) => (
            <span key={i}>{(i === 0 ? "" : ", ") + a}</span>
          ))
        ) : (
          <span>No authors found</span>
        )}
      </p>
      {/* <p>description: {description}</p> */}
      {image ? <img src={image} alt="book" /> : null}
      <a href={link}>{link ? "Link" : "No link found"}</a>
      <p>end</p>
    </div>
  );
};

export default BookCard;
