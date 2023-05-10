import React, { useEffect, useState } from "react";
import "./explore.scss";
import MovieGrid from "../../components/movie-grid/MovieGrid";
import { category as cat } from "../../api/tmdbApi";
import { useNavigate } from "react-router-dom";
import Meta from "../../components/helmet/Meta";

const Explore = () => {
  const [selectedTab, setSelectedTab] = useState("movie");
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substr(1);
    if (hash === cat.tv || hash === cat.movie) {
      setSelectedTab(hash);
    }
  }, []);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    navigate(`#${tab}`);
  };

  return (
    <>
      <Meta title={`${selectedTab === cat.movie ? "Movies" : "TV Shows"}`} />
      <div className="catalog__header">
        <h2>{selectedTab === cat.movie ? "Movies" : "TV Series"}</h2>
      </div>
      <div className="section flex">
        <div className="tab__buttons">
          <button
            className={`tab__button ${selectedTab === cat.tv ? "active" : ""}`}
            onClick={() => handleTabClick(cat.tv)}
          >
            Tv Series
          </button>
          <button
            className={`tab__button ${
              selectedTab === cat.movie ? "active" : ""
            }`}
            onClick={() => handleTabClick(cat.movie)}
          >
            Movies
          </button>
        </div>
        <div className="search__container">//search is here...</div>
      </div>
      <div className="section">
        {selectedTab === cat.movie && <MovieGrid category={cat.movie} />}

        {selectedTab === cat.tv && <MovieGrid category={cat.tv} />}
      </div>
    </>
  );
};

export default Explore;
