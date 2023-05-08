import React, { useEffect, useState } from "react";
import "./movie-grid.scss";
import MovieCard from "../movie-card/MovieCard";
import tmdbApi, { category as cat, movieType, tvType } from "../../api/tmdbApi";
import { OutlineButton } from "../buttons/Button";
import Meta from "../helmet/Meta";

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

  const handleLoadMore = async () => {
    try {
      let res = [];
      if (category === cat.movie) {
        res = await tmdbApi.getMoviesList(
          cat.movie,
          movieType.popular,
          page + 1
        );
      } else if (category === cat.tv) {
        res = await tmdbApi.getTvList(cat.tv, tvType.popular, page + 1);
      }
      // filter out duplicates
      const newItems = res.results.filter((result) => {
        return !items.some((item) => item.id === result.id);
      });
      setItems([...items, ...newItems]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Meta title={`${category === cat.movie ? "Movies" : "TV Shows"}`} />
      <div className="section">
        <div className="search__container">//search is here...</div>
      </div>
      <div className="movie__grid">
        {items.map((item, i) => (
          <MovieCard key={i} item={item} category={category} />
        ))}
      </div>

      {page < totalPage ? (
        <div className="load__more">
          <OutlineButton onClick={handleLoadMore} title={"Load More"} />
        </div>
      ) : null}
    </>
  );
};

export default MovieGrid;
