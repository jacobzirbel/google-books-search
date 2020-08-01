import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const BookCard = (props) => {
  const { handleBookSave, handleBookRemove, saved, loggedIn, book } = props;
  const { title, authors, description, image, link } = book;

  const handleClick = () => {
    if (saved) handleBookRemove(book);
    if (!saved) handleBookSave(book);
  };

  const saveButtonStyle = {
    backgroundColor: saved && "red",
    marginLeft: "8px",
    marginRight: "8px",
  };

  const buttonIfLoggedIn = (
    <Button
      variant="contained"
      color="primary"
      style={saveButtonStyle}
      onClick={handleClick}
    >
      {saved ? "Remove" : "Save"}
    </Button>
  );

  const buttonIfLink = (
    <Button variant="contained" color="primary">
      <a href={link} style={{ color: "white" }}>
        {link ? "View" : "No link found"}
      </a>
    </Button>
  );

  const authorsText = authors
    ? authors.map((a, i) => (i === 0 ? " " : ", ") + a).join("")
    : "No authors found";

  return (
    <Paper style={{ marginTop: "30px" }}>
      <Card>
        <CardHeader title={title || "No title found"} subheader={authorsText} />
        <div>
          <CardContent>
            {image ? <img src={image} alt="book" /> : null}
          </CardContent>
          <CardContent>{description}</CardContent>
          <CardActions>
            {loggedIn ? buttonIfLoggedIn : <p>Login to save</p>}
            {link ? buttonIfLink : null}
          </CardActions>
        </div>
      </Card>
    </Paper>
  );
};

export default BookCard;
