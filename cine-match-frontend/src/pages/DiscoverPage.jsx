import React, { useEffect } from "react";
import MovieGrid from "../components/MovieGrid/MovieGrid";

function Discover() {
  const pageStyle = {
    backgroundColor: "#050517",
    minHeight: "100vh" 
  };

  return (
    <div style={pageStyle}>
      <MovieGrid page={1} moviesPerPage={20} />
    </div>
  );
}

export default Discover;
