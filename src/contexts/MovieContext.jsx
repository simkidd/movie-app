import React, { createContext, useState, useEffect } from 'react';
import tmdbApi, { category, movieType, tvType } from '../api/tmdbApi';

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);
  const [onTheAirTvShows, setOnTheAirTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upcomingMoviesData = await tmdbApi.getMoviesList(category.movie, movieType.upcoming);
        const popularMoviesData = await tmdbApi.getMoviesList(category.movie, movieType.popular);
        const topRatedMoviesData = await tmdbApi.getMoviesList(category.movie, movieType.top_rated);
        const popularTvShowsData = await tmdbApi.getTvList(category.tv, tvType.popular);
        const topRatedTvShowsData = await tmdbApi.getTvList(category.tv, tvType.top_rated);
        const onTheAirTvShowsData = await tmdbApi.getTvList(category.tv, tvType.on_the_air);

        setUpcomingMovies(upcomingMoviesData);
        setPopularMovies(popularMoviesData);
        setTopRatedMovies(topRatedMoviesData);
        setPopularTvShows(popularTvShowsData);
        setTopRatedTvShows(topRatedTvShowsData);
        setOnTheAirTvShows(onTheAirTvShowsData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        isLoading,
        upcomingMovies,
        popularMovies,
        topRatedMovies,
        popularTvShows,
        topRatedTvShows,
        onTheAirTvShows
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
