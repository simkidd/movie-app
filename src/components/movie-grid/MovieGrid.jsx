import React, { useEffect, useState } from "react";
import "./movie-grid.scss";
import MovieCard from "../movie-card/MovieCard";
import tmdbApi, { category as cat } from "../../api/tmdbApi";
import { OutlineButton } from "../buttons/Button";
// import Skeleton from "../skeleton/Skeleton";

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
          res = await tmdbApi.discover(cat.movie, "popularity.desc", page);
        } else if (category === cat.tv) {
          res = await tmdbApi.discover(cat.tv, "popularity.desc", page);
        }
         // Filter out duplicate items
        const uniqueItems = removeDuplicates([...items, ...res.results], "id");

        // setItems(res.results);
        setItems(uniqueItems);
        // setItems(prevItems => [...prevItems, ...res.results]);
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
        res = await tmdbApi.discover(cat.movie, "popularity.desc", page + 1);
      } else if (category === cat.tv) {
        res = await tmdbApi.discover(cat.tv, "popularity.desc", page + 1);
      }
       // Filter out duplicate items
      const uniqueItems = removeDuplicates([...items, ...res.results], "id");

      setItems(uniqueItems);
      // setItems(prevItems => [...prevItems, ...res.results]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };

  // Utility function to remove duplicate items from an array based on a key
  const removeDuplicates = (arr, key) => {
    return arr.filter((item, index, self) => self.findIndex(i => i[key] === item[key]) === index);
  };
  
  if (isLoading && page === 1) {
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
    <p>({items.length})</p>
      <div className="movie__grid">
      {/* {!items && <Skeleton className="skeleton__card" />} */}
        {items.map((item) => (
          <MovieCard key={item.id} item={item} category={category} />
        ))}
      </div>
      {page < totalPages && (
        <div className="load__more">
          <OutlineButton onClick={handleLoadMore} title={"Load more"} />
        </div>
      )}
    </>
  );
};

export default MovieGrid;
