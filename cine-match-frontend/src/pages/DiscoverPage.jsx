import React, { useEffect } from "react";
import MovieGrid from "../components/MovieGrid/MovieGrid"; 

function Discover() {
  
  return (
    <div>
      <h2>Discover Movies</h2>
      <MovieGrid page={1} moviesPerPage={20} />
    </div>
  );
}

export default Discover;
