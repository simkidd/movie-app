import React, { useEffect, useState } from "react";
import "./movie-detail.scss";
import { Link, useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import MovieList from "../../components/movie-list/MovieList";
import CastList from "../../components/cast-list/CastList";
import VideoList from "../../components/video-list/VideoList";
import Meta from "../../components/helmet/Meta";
import { FaRegCalendar, FaStar } from "react-icons/fa";

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
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  const bg = apiConfig.original_image(item.backdrop_path);

  return (
    <>
      <Meta title={`${item.title || item.name}`} />
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
            {/* <h1>{item.title || item.name}</h1> */}
            <h1>
              {item.title || item.name} (
              {new Date(item.release_date).getFullYear() ||
                new Date(item.first_air_date).getFullYear()}
              )
            </h1>
            <div className="genres">
              {item.genres &&
                item.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
            </div>
            <p>{item.overview}</p>
            <div className="release">
              {item.release_date ? (
                <p>
                  <FaRegCalendar size={24} />
                  {new Date(item.release_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              ) : (
                <p>
                  <FaRegCalendar /> {item.first_air_date}
                </p>
              )}
            </div>
            <div className="duration">
              {item.runtime && <p>Runtime: {item.runtime} minutes</p>}
            </div>
            <div className="movie__rating">
              <FaStar size={24} />
              {item ? item.vote_average.toFixed(1) : ""}{" "}
              {/* <span className="movie__voteCount">
              {item
                ? "(" + item.vote_count + ") votes"
                : ""}
            </span> */}
            </div>
            <div className="casts">
              <div className="section__header">
                <h2>Casts</h2>
              </div>
              <CastList id={item.id} />
            </div>
          </div>
        </div>
      </div>

      <div className="watch__now">
        <Link to={`/${category}/${item.id}/watch`}>Watch now</Link>
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
