import React, { useState } from "react";
import MovieCard from "../movie-card/MovieCard";
import "./search.scss";
import Search from "./Search";

const SearchResults = ({ results, query }) => {
  const [activeTab, setActiveTab] = useState("movie");
  

  console.log(results);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredResults =
    activeTab === "movie"
      ? results.filter((result) => result.media_type === "movie")
      : results.filter((result) => result.media_type === "tv");

  return (
    <>
      <div className="catalog__header">
        <h2>Search Results for "{query}"</h2>
      </div>
      <div className="section">
        <div className="search__container">
          <Search />
        </div>
        <div className="search__tabs">
          <button
            className={activeTab === "movie" ? "active" : ""}
            onClick={() => handleTabChange("movie")}
          >
            Movies
          </button>
          <button
            className={activeTab === "tv" ? "active" : ""}
            onClick={() => handleTabChange("tv")}
          >
            TV Shows
          </button>
        </div>

        {filteredResults.length === 0 ? (
          <div className="search__results">
            <p>No results found</p>
          </div>
        ) : (
          <div className="search__results">
            {filteredResults.map((result) => (
              <MovieCard key={result.id} item={result} category={activeTab} />
            ))}
          </div>
        )}
      </div>
      
    </>
  );
};

export default SearchResults;
