import React,{ useState } from "react";
import "./SearchForm.css";


function SearchForm ({ onSearch }) {
  const [ searchTerm ,setSearchTerm] =useState("");

  function handleSubmit(e) {
    e.preventDefault(); // Prevent form from refreshing the page
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm.trim()); // Pass trimmed search term to parent
    }
  }


  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Enter topic"
      />
        <button type="submit" className="search-form__button">
        Search
      </button>
  
    </form>
  );
}

export default SearchForm;
