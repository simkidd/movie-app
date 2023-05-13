import React, { useEffect, useState } from "react";
import "./explore.scss";
import MovieGrid from "../../components/movie-grid/MovieGrid";
import { category as cat } from "../../api/tmdbApi";
import { useNavigate } from "react-router-dom";
import Meta from "../../components/helmet/Meta";
import Search from "../../components/search/Search";

const Explore = () => {
  const [activeTab, setActiveTab] = useState("movie");

  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substr(1);
    if (hash === cat.tv || hash === cat.movie) {
      setActiveTab(hash);
    }
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`#${tab}`);
  };

  

  return (
    <>
      <Meta title={`${activeTab === cat.movie ? "Movies" : "TV Shows"}`} />
      <div className="catalog__header">
        <h2>{activeTab === cat.movie ? "Movies" : "TV Series"}</h2>
      </div>
      <div className="section flex">
        <div className="tab__buttons">
          <button
            className={`tab__button ${activeTab === cat.tv ? "active" : ""}`}
            onClick={() => handleTabClick(cat.tv)}
          >
            Tv Series
          </button>
          <button
            className={`tab__button ${
              activeTab === cat.movie ? "active" : ""
            }`}
            onClick={() => handleTabClick(cat.movie)}
          >
            Movies
          </button>
        </div>
        <div className="search__container">
          <Search  />
        </div>
      </div>
      <div className="section">
        {activeTab === cat.movie && <MovieGrid category={cat.movie} />}

        {activeTab === cat.tv && <MovieGrid category={cat.tv} />}
        </div>
    </>
  );
};

export default Explore;
