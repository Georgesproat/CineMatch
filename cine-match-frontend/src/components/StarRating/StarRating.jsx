import React, { useState } from "react";
import { Rating, Typography } from "@mui/material";

const StarRating = ({ label, initialValue, onChange }) => {
  const [rating, setRating] = useState(initialValue);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <Typography variant="subtitle2" gutterBottom>
        {label}
      </Typography>
      <Rating
        name={label}
        value={rating}
        precision={0.5} 
        onChange={handleRatingChange}
      />
    </div>
  );
};

export default StarRating;
