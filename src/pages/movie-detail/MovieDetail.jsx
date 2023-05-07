import React, { useEffect, useState } from "react";
import "./movie-detail.scss";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import MovieList from "../../components/movie-list/MovieList";
import CastList from "../../components/cast-list/CastList";
import VideoList from "../../components/video-list/VideoList";

const MovieDetail = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      const res = await tmdbApi.detail(category, id);
      setItem(res);
      window.scrollTo(0, 0);
    };

    const getSimilarMovies = async () => {
      const res = await tmdbApi.similar(category, id);
      setSimilarMovies(res);
    };
    getDetail();
    getSimilarMovies();
  }, [category, id]);

  if (!item) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }

  const bg = apiConfig.original_image(item.backdrop_path);

  return (
    <>
      <div className="banner" style={{ backgroundImage: `url(${bg})` }}></div>
      <div className="movie__content">
        <div className="content__poster">
          <div
            className="poster__img"
            style={{
              backgroundImage: `url(${apiConfig.original_image(
                item.poster_path
              )})`,
            }}
          ></div>
        </div>
        <div className="content__info">
          <div className="container">
            <h1>{item.title || item.name}</h1>
            <div className="genres">
              {item.genres &&
                item.genres
                  .slice(0, 5)
                  .map((genre, i) => <span key={i}>{genre.name}</span>)}
            </div>
            <p>{item.overview}</p>
            <div className="release">
              {item.release_date ? (
                <p>Release Date: {item.release_date}</p>
              ) : (
                <p>Air Date: {item.first_air_date}</p>
              )}
              {item.runtime && <p>Runtime: {item.runtime} minutes</p>}
            </div>
            {/* <div className="movie__rating">
            {item ? item.vote_average : ""}{" "}
            <i class="fas fa-star" />
            <span className="movie__voteCount">
              {item
                ? "(" + item.vote_count + ") votes"
                : ""}
            </span>
          </div> */}
            <div className="casts">
              <div className="section__header">
                <h2>Casts</h2>
              </div>
              <CastList id={item.id} />
            </div>
          </div>
        </div>
      </div>

      <div className="bottom__content">
        <div className="section trailer__section">
          <VideoList item={item} id={item.id} />
        </div>
        <div className="section">
          <div className="section__header">
            <h2>Similiar</h2>
          </div>
          <MovieList type={similarMovies} category={category} />
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
