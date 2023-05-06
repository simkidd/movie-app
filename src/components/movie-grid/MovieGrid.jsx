import React, { useEffect, useState } from "react";
import "./movie-grid.scss";
import MovieCard from "../movie-card/MovieCard";
import tmdbApi, { category as cat, movieType, tvType } from "../../api/tmdbApi";
import { OutlineButton } from "../buttons/Button";

const MovieGrid = ({ category }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getList = async () => {
      try {
        let res = [];
        if (category === cat.movie) {
          res = await tmdbApi.getMoviesList(cat.movie, movieType.popular);
        } else if (category === cat.tv) {
          res = await tmdbApi.getTvList(cat.tv, tvType.popular);
        }
        setItems(res.results);
        setTotalPage(res.total_pages);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [category]);

  const handleLoadMore = async() => {
    try {
      let res = []
      if (category === cat.movie) {
        res = await tmdbApi.getMoviesList(cat.movie, movieType.popular, page + 1);
      } else if (category === cat.tv) {
        res = await tmdbApi.getTvList(cat.tv, tvType.popular, page + 1);
      }
      setItems([...items,...res.results]);
      setPage(page + 1);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="section">
      <div className="search__container">//search is here...</div>

      <div className="movie__grid">
        {items.map((item, i) => (
          <MovieCard key={i} item={item} />
        ))}
      </div>

      {page < totalPage ? (
        <OutlineButton onClick={handleLoadMore} title={'Load More'} />
      ) : null}
    </div>
  );
};

export default MovieGrid;
