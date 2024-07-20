import React from "react";

const Tile = ({ value, onClick }) => (
  <div className="tile" onClick={onClick}>
    {value ? value : " "} {/* Display a space if the tile is empty */}
  </div>
);

export default Tile;
