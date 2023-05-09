import React, { useEffect, useState } from "react";
import "./movie-grid.scss";
import MovieCard from "../movie-card/MovieCard";
import tmdbApi, { category as cat, movieType, tvType } from "../../api/tmdbApi";
import { OutlineButton } from "../buttons/Button";

const MovieGrid = ({ category }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getList = async () => {
      setIsLoading(true);
      try {
        let res = [];
        if (category === cat.movie) {
          res = await tmdbApi.getMoviesList(cat.movie, movieType.popular, page);
        } else if (category === cat.tv) {
          res = await tmdbApi.getTvList(cat.tv, tvType.popular, page);
        }
        setItems(res.results);
        setTotalPages(res.total_pages);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [category, page]);

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
      setItems((prevItems) => [...prevItems, ...res.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error);
    }
  };
  

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="section">
        <div className="search__container">//search is here...</div>
      </div>
      <div className="movie__grid">
        {items.map((item, i) => (
          <MovieCard key={i} item={item} category={category} />
        ))}
      </div>
      {page < totalPages ? (
        <div className="load__more">
          <OutlineButton onClick={handleLoadMore} title={"Load more"} />
        </div>
      ): null}
    </>
  );
};

export default MovieGrid;
