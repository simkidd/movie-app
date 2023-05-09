import React, { useState } from "react";
import "./explore.scss";
import MovieGrid from "../../components/movie-grid/MovieGrid";
import { category as cat } from "../../api/tmdbApi";
import { useParams } from "react-router-dom";
import Meta from "../../components/helmet/Meta";

const Explore = () => {
  const [selectedTab, setSelectedTab] = useState("movie");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <Meta title={`${selectedTab === cat.movie ? "Movies" : "TV Shows"}`} />
      <div className="catalog__header">
        <h2>{selectedTab === cat.movie ? "Movies" : "TV Series"}</h2>
      </div>
      <div className="tab__buttons">
        <button
          className={`tab__button ${selectedTab === cat.tv ? "active" : ""}`}
          onClick={() => handleTabClick(cat.tv)}
        >
          Tv Series
        </button>
        <button
          className={`tab__button ${selectedTab === cat.movie ? "active" : ""}`}
          onClick={() => handleTabClick(cat.movie)}
        >
          Movies
        </button>
      </div>
      <div className="section">
        {/* <MovieGrid selectedTab={selectedTab} /> */}
        {selectedTab === cat.movie && <MovieGrid category={cat.movie} />}

        {selectedTab === cat.tv && <MovieGrid category={cat.tv} />}
      </div>
    </>
  );
};

export default Explore;
