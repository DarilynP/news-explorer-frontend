import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearchSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearchSubmit(inputValue.trim());
    }
  };

  return (
    <section className="search">
      <div className="search__form-container">
        <form className="search__form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search news..."
            className="search__form-input"
          />
          <button className="search__form-button" type="submit">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
