import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";

const BookCard = (props) => {
  const { handleBookSave, handleBookRemove, saved, loggedIn, book } = props;
  const { title, authors, description, image, link } = book;

  const handleClick = () => {
    if (saved) handleBookRemove(book);
    if (!saved) handleBookSave(book);
  };

  const buttonIfLoggedIn = loggedIn ? (
    <Button
      variant="contained"
      color="primary"
      style={{ backgroundColor: saved && "red" }}
      onClick={handleClick}
    >
      {saved ? "Remove" : "Save"}
    </Button>
  ) : null;

  const buttonIfLink = link ? (
    <Button variant="contained" color="primary">
      <a href={link} style={{ color: "white" }}>
        {link ? "View" : "No link found"}
      </a>
    </Button>
  ) : null;
  const authorsText = authors
    ? authors
        .map((a, i) => {
          return (i === 0 ? " " : ", ") + a;
        })
        .join("")
    : "No authors found";

  return (
    <Card
      style={{
        width: "100%",
      }}
    >
      <CardHeader title={title || "No title found"} subheader={authorsText} />
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardContent>
          {image ? <img src={image} alt="book" /> : null}
        </CardContent>
        <CardContent>{description}</CardContent>
        <CardActions>
          {buttonIfLoggedIn}
          {buttonIfLink}
        </CardActions>
      </div>
    </Card>
  );
};

export default BookCard;
