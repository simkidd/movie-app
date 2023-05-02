import React, { createContext, useState, useEffect } from "react";
import tmdbApi, { movieType, tvType } from "../api/tmdbApi";

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [moviesList, setMoviesList] = useState([]);
  const [tvList, setTVList] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [topRatedTVShows, setTopRatedTVShows] = useState([]);
  const [onTheAirTVShows, setOnTheAirTVShows] = useState([]);

  useEffect(() => {
    const fetchMoviesList = async () => {
      const popularMovies = await tmdbApi.getMoviesList(movieType.popular);
      const topRatedMovies = await tmdbApi.getMoviesList(movieType.top_rated);
      setPopularMovies(popularMovies);
      setTopRatedMovies(topRatedMovies);
    };

    const fetchTVList = async () => {
      const popularTVShows = await tmdbApi.getTVList(tvType.popular);
      const topRatedTVShows = await tmdbApi.getTVList(tvType.top_rated);
      const onTheAirTVShows = await tmdbApi.getTVList(tvType.on_the_air);
      setPopularTVShows(popularTVShows);
      setTopRatedTVShows(topRatedTVShows);
      setOnTheAirTVShows(onTheAirTVShows);
    };

    const fetchUpcomingMovies = async () => {
      const upcomingMovies = await tmdbApi.getMoviesList(movieType.upcoming);
      setUpcomingMovies(upcomingMovies);
    };

    fetchMoviesList();
    fetchTVList();
    fetchUpcomingMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        moviesList,
        tvList,
        upcomingMovies,
        popularMovies,
        topRatedMovies,
        popularTVShows,
        topRatedTVShows,
        onTheAirTVShows,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
