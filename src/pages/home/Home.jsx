import React, { useContext } from "react";
import { Link } from "react-router-dom";
import HeroSlide from "../../components/hero-slide/HeroSlide";
import { MovieContext } from "../../contexts/MovieContext";
import MovieList from "../../components/movie-list/MovieList";
import "./home.scss";
import { OutlineButton } from "../../components/buttons/Button";
import { category } from "../../api/tmdbApi";

const Home = () => {
  const {
    isLoading,
    upcomingMovies,
    popularMovies,
    topRatedMovies,
    popularTvShows,
    topRatedTvShows,
    onTheAirTvShows,
  } = useContext(MovieContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeroSlide />
      <div className="home__container">
        <div className="section">
          <div className="section__header">
            <h2>Upcoming Movies</h2>
            <Link to="/movie">
              <OutlineButton title={"View more"} />
            </Link>
          </div>
          <MovieList type={upcomingMovies} category={category.movie} />
        </div>
        <div className="section">
          <div className="section__header">
            <h2>Popular Movies</h2>
            <Link to="/">
              <OutlineButton title={"View more"} />
            </Link>
          </div>
          <MovieList type={popularMovies} category={category.movie} />
        </div>
        <div className="section">
          <div className="section__header">
            <h2>Top Rated Movies</h2>
            <Link to="/">
              <OutlineButton title={"View more"} />
            </Link>
          </div>
          <MovieList type={topRatedMovies} category={category.movie} />
        </div>
        <div className="section">
          <div className="section__header">
            <h2>On the Air TV Shows</h2>
            <Link to="/">
              <OutlineButton title={"View more"} />
            </Link>
          </div>
          <MovieList type={onTheAirTvShows} category={category.tv} />
        </div>
        <div className="section">
          <div className="section__header">
            <h2>Popular TV</h2>
            <Link to="/">
              <OutlineButton title={"View more"} />
            </Link>
          </div>
          <MovieList type={popularTvShows} category={category.tv} />
        </div>
        <div className="section">
          <div className="section__header">
            <h2>Top Rated TV</h2>
            <Link to="/">
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
