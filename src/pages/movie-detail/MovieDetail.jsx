import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieList from "../../components/movie-list/MovieList";
import tmdbApi from "../../api/tmdbApi";
import { MovieContext } from "../../contexts/MovieContext";

const MovieDetail = () => {
  const { id, type } = useParams();
  const { moviesList, tvList } = useContext(MovieContext);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    const fetchDetail = async () => {
        let movie = {}
        if (type === "movie") {
          movie = moviesList.find((m) => m.id === parseInt(id));
        } else if (type === "tv") {
          movie = tvList.find((m)=> m.id === parseInt(id));
        }
        const detail = await tmdbApi.getDetail(movie.id, type);
        setDetail(detail)
    };
    fetchDetail();
  }, [id, type, moviesList, tvList]);

  if (!detail) {
    return (
      <div>
        <h2>Loading, please wait...</h2>
      </div>
    );
  }

  return (
    <div className="banner">
      <div className="movie__content">
        <div className="content__poster"></div>
        <div className="content__info">
          <h1>{detail.title}</h1>
          <div className="genres">
            <span>genre</span>
          </div>
          <p>Release date: {detail.release_date || detail.first_air_date}</p>
          <p>{detail.overview}</p>
          {type === "tv" && (
            <p className="movie-detail-num-seasons">
              Number of Seasons: {detail.number_of_seasons}
            </p>
          )}
          <p className="movie-detail-rating">
            Rating: {detail.vote_average}/10
          </p>
          <div className="cast">
            <div className="section__header">
              <h2>casts</h2>
            </div>
            castlist
          </div>
        </div>
      </div>
      <div className="container">
        <div className="section">
          <h2>similar</h2>
        </div>
        {/* <MovieList /> */}
      </div>
    </div>
  );
};

export default MovieDetail;
