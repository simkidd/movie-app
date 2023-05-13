import React, { createContext, useState, useEffect } from "react";
import tmdbApi, {
  category,
  movieType,
  tvType,
  timeWindow,
} from "../api/tmdbApi";

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);
  const [onTheAirTvShows, setOnTheAirTvShows] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const upcomingMoviesData = await tmdbApi.getMoviesList(
          category.movie,
          movieType.upcoming
        );
        const popularMoviesData = await tmdbApi.getMoviesList(
          category.movie,
          movieType.popular
        );
        const topRatedMoviesData = await tmdbApi.getMoviesList(
          category.movie,
          movieType.top_rated
        );
        const popularTvShowsData = await tmdbApi.getTvList(
          category.tv,
          tvType.popular
        );
        const topRatedTvShowsData = await tmdbApi.getTvList(
          category.tv,
          tvType.top_rated
        );
        const onTheAirTvShowsData = await tmdbApi.getTvList(
          category.tv,
          tvType.on_the_air
        );

        setUpcomingMovies(upcomingMoviesData.results);
        setPopularMovies(popularMoviesData.results);
        setTopRatedMovies(topRatedMoviesData.results);
        setPopularTvShows(popularTvShowsData.results);
        setTopRatedTvShows(topRatedTvShowsData.results);
        setOnTheAirTvShows(onTheAirTvShowsData.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (query) => {
    try {
      const res = await tmdbApi.search(query);
      setSearchResults(res);
      setSearchQuery(query);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        isLoading,
        upcomingMovies,
        popularMovies,
        topRatedMovies,
        popularTvShows,
        topRatedTvShows,
        onTheAirTvShows,
        searchQuery,
        searchResults,
        handleSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
