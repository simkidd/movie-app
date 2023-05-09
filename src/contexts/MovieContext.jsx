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
  const [trendingMovies, setTrendingMovies]= useState([])
  const [trendingTv, setTrendingTv]= useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const upcomingMoviesData = await tmdbApi.getMoviesList(category.movie, movieType.upcoming);
        const popularMoviesData = await tmdbApi.getMoviesList(category.movie, movieType.popular);
        const topRatedMoviesData = await tmdbApi.getMoviesList(category.movie, movieType.top_rated);
        const popularTvShowsData = await tmdbApi.getTvList(category.tv, tvType.popular);
        const topRatedTvShowsData = await tmdbApi.getTvList(category.tv, tvType.top_rated);
        const onTheAirTvShowsData = await tmdbApi.getTvList(category.tv, tvType.on_the_air);
        const trendingMoviesData = await tmdbApi.getTrendingMovies();
        const trendingTvData = await tmdbApi.getTrendingTv();

        setUpcomingMovies(upcomingMoviesData.results);
        setPopularMovies(popularMoviesData.results);
        setTopRatedMovies(topRatedMoviesData.results);
        setPopularTvShows(popularTvShowsData.results);
        setTopRatedTvShows(topRatedTvShowsData.results);
        setOnTheAirTvShows(onTheAirTvShowsData.results);
        setTrendingMovies(trendingMoviesData.results);
        setTrendingTv(trendingTvData.results);
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
        onTheAirTvShows,
        trendingMovies,
        trendingTv
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;