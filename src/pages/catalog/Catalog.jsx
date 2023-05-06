import React from "react";
import "./catalog.scss";
import MovieGrid from "../../components/movie-grid/MovieGrid";
import { category as cat } from "../../api/tmdbApi";
import { useParams } from "react-router-dom";

const Catalog = () => {
  const { category } = useParams();

  return (
    <>
      <div className="catalog__header">
        <h2>{category === cat.movie ? "Movies" : "TV Series"}</h2>
      </div>
      <div>
        <div className="section">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
