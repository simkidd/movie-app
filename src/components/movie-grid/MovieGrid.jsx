import React, { useEffect, useState } from "react";
import "./movie-grid.scss";
import MovieCard from "../movie-card/MovieCard";
import tmdbApi, { category as cat } from "../../api/tmdbApi";
import { OutlineButton } from "../buttons/Button";
// import Skeleton from "../skeleton/Skeleton";
import { ClipLoader } from "react-spinners";

const MovieGrid = ({ category }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
    setIsLoadingMore(true);
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
      setIsLoadingMore(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Utility function to remove duplicate items from an array based on a key
  const removeDuplicates = (arr, key) => {
    return arr.filter(
      (item, index, self) =>
        self.findIndex((i) => i[key] === item[key]) === index
    );
  };

  if (isLoading && page === 1) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <ClipLoader size={80} color={"#ff0000"} loading={isLoading} />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="movie__grid">
        {/* {!items && <Skeleton className="skeleton__card" />} */}
        {items.map((item) => (
          <MovieCard key={item.id} item={item} category={category} />
        ))}
      </div>
      {isLoadingMore ? (
        <div style={{ textAlign: "center" }}>
          <ClipLoader size={30} color={"#ff0000"} loading={isLoadingMore} />
        </div>
      ) : (
        page < totalPages && (
          <div className="load__more">
            <OutlineButton onClick={handleLoadMore}>Load more</OutlineButton>
          </div>
        )
      )}
    </>
  );
};

export default MovieGrid;
