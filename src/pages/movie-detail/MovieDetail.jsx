import React, { useEffect, useState } from "react";
import "./movie-detail.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import MovieList from "../../components/movie-list/MovieList";
import CastList from "../../components/cast-list/CastList";
import VideoList from "../../components/video-list/VideoList";
import Meta from "../../components/helmet/Meta";
import { FaPlay, FaRegCalendar, FaStar } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const MovieDetail = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  // offset to top of page when open
  useEffect(()=>{
      window.scrollTo(0,0)
  },[location.pathname])

  useEffect(() => {
    const getDetail = async () => {
      const res = await tmdbApi.detail(category, id);
      setItem(res);
      console.log(res);
      setIsLoading(false);
    };

    const getSimilarMovies = async () => {
      const res = await tmdbApi.similar(category, id);
      setSimilarMovies(res);
    };
    getDetail();
    getSimilarMovies();
  }, [category, id]);

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
        <h2>Loading...</h2>
      </div>
    );
  }
  const slug = (item?.title || item?.name).toLowerCase().replace(/\s+/g, "-");

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
            <h1>
              {item.title || item.name} {""}
              <span className="release__year">
                (
                {new Date(item.release_date).getFullYear() ||
                  new Date(item.first_air_date).getFullYear()}
                )
              </span>
            </h1>
            <div className="genres">
              {item.genres &&
                item.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
            </div>

            <div className="row">
              <div className="movie__rating">
                <FaStar size={20} />
                {item ? item.vote_average.toFixed(1) : ""}
              </div>
              <div className="watch__now">
                <Link to={`/${category}/${item.id}-${slug}/watch`}>
                  <FaPlay />
                  Watch now
                </Link>
              </div>
            </div>

            <p className="tagline">
              <em>{item.tagline}</em>
            </p>
            <p>{item.overview}</p>
            <div className="release">
              {item.release_date ? (
                <p>
                  <FaRegCalendar size={20} />
                  {new Date(item.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </p>
              ) : (
                <p>
                  <FaRegCalendar size={20} />
                  {new Date(item.first_air_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
            <div className="duration">
              {item.runtime && <p>Runtime: {item.runtime} minutes</p>}
            </div>

            <div className="casts">
              <div className="section__header">
                <h2 style={{ marginBottom: "1rem" }}>Casts</h2>
              </div>
              <CastList id={item.id} />
            </div>
          </div>
        </div>
      </div>

      <div className="bottom__content">
        <div className="mx-w760">
          <h2>Trailer</h2>
        </div>
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
