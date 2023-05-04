import React, { useEffect, useState } from "react";
import "./movie-grid.scss";
import MovieCard from "../movie-card/MovieCard";
import tmdbApi, { movieType, tvType } from "../../api/tmdbApi";

const MovieGrid = ({ type }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getList = async () => {
      try {
        let response = null;
        const params = {page};
        switch (type) {
          case "movie":
            response = await tmdbApi.getMoviesList(movieType.upcoming, page);
            break;
            default:
            response = await tmdbApi.getTVList(tvType.popular, page);
        }
        setItems(response)
        setTotalPages(response.total_pages)
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [type, page]);

  return (
    <div className="section">
      <div className="search__container">//search is here...</div>

      <div className="movie__grid">
        {items.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
