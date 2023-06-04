import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Searchbar.css";

function Searchbar({ onChange }) {
  return (
    <div className="searchbar">
      <div className="searchbar-icon">
        <FaSearch />
      </div>
      <input
        type="text"
        placeholder="Search Products"
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => {onChange(e)}}
      />
    </div>
  );
}

export default Searchbar;
