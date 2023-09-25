import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const MovieCard = ({ title, description, genre }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography>{genre.join(", ")}</Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
