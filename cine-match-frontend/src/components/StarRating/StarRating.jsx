import React, { useState } from "react";
import { Rating, Typography, ThemeProvider } from "@mui/material";
import { muiTheme } from "..//../theme/muiTheme"; 
import StarIcon from "@mui/icons-material/Star"; 

const StarRating = ({ label, initialValue, onChange }) => {
  const [rating, setRating] = useState(initialValue);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    onChange(newValue);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <div>
        <Typography variant="subtitle2" gutterBottom>
          {label}
        </Typography>
        <Rating
          name={label}
          value={rating}
          precision={0.5}
          onChange={handleRatingChange}
          emptyIcon={<StarIcon style={{ color: "#145C9E" }} />} 
          icon={<StarIcon style={{ color: "#FFA400" }} />} 
        />
      </div>
    </ThemeProvider>
  );
};

export default StarRating;
