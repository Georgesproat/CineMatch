import React from "react";
import { Card, CardContent, Typography, makeStyles } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  genre: {
    fontStyle: "italic",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
  },
  description: {
    marginBottom: theme.spacing(1)
  }
}));

const MovieCard = ({ title, description, genre }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        <Typography className={classes.genre}>{genre.join(", ")}</Typography>
        <Typography className={classes.description}>{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
