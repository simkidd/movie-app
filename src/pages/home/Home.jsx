import React, { useContext } from "react";
import { Link } from "react-router-dom";
import HeroSlide from "../../components/hero-slide/HeroSlide";
import { MovieContext } from "../../contexts/MovieContext";
import MovieList from "../../components/movie-list/MovieList";
import "./home.scss";
import { OutlineButton } from "../../components/buttons/Button";
import { category } from "../../api/tmdbApi";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const {
    isLoading,
    upcomingMovies,
    popularMovies,
    topRatedMovies,
    popularTvShows,
    topRatedTvShows,
    airingTodayTvShows,
    trendingMovies,
    trendingTvShows
  } = useContext(MovieContext);

  
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
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
      <HeroSlide />
      <div className="home__container">
        <div className="section">
          <div className="section__header">
            <h2>Trending Movies</h2>
            <div className="time__window"></div>
            <Link to={`/explore#movie`}>
              <OutlineButton title={"View more"} />
            </Link>
          </div>
          <MovieList type={trendingMovies} category={"movie"} />
        </div>
        <div className="section">
          <div className="section__header">
            <h2>Upcoming Movies</h2>
            <Link to={`/explore#movie`}>
              <OutlineButton title={"View more"} />
            </Link>
          </div>
          <MovieList type={upcomingMovies} category={category.movie} />
        </div>
        <div className="section">
          <div className="section__header">
            <h2>Popular Movies</h2>
            <Link to={`/explore#movie`}>
              <OutlineButton title={"View more"} />
            </Link>
          </div>
          <MovieList type={popularMovies} category={category.movie} />
        </div>
        <div className="section">
          <div className="section__header">
            <h2>Top Rated Movies</h2>
            <Link to={`/explore#movie`}>
              <OutlineButton title={"View more"} />
            </Link>
          </div>
          <MovieList type={topRatedMovies} category={category.movie} />
        </div>
        <div className="section">
          <div className="section__header">
            <h2>Trending Tv</h2>
            <div className="time__window"></div>
            <Link to={`/explore#tv`}>
              <OutlineButton title={"View more"} />
            </Link>
          </div>
          <MovieList type={trendingTvShows} category={"tv"} />
        </div>
        <div className="section">
          <div className="section__header">
            <h2>Airing Today</h2>
            <Link to={`/explore#tv`}>
              <OutlineButton title={"View more"} />
            </Link>
          </div>
          <MovieList type={airingTodayTvShows} category={category.tv} />
        </div>
        <div className="section">
          <div className="section__header">
            <h2>Popular TV</h2>
            <Link to={`/explore#tv`}>
              <OutlineButton title={"View more"} />
            </Link>
          </div>
          <MovieList type={popularTvShows} category={category.tv} />
        </div>
        <div className="section">
          <div className="section__header">
            <h2>Top Rated TV</h2>
            <Link to={`/explore#tv`}>
              <OutlineButton title={"View more"} />
            </Link>
          </div>
          <MovieList type={topRatedTvShows} category={category.tv} />
        </div>
      </div>
    </>
  );
};

export default Home;
