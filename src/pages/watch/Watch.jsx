import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./watch.scss";
import { category as cat } from "../../api/tmdbApi";

const Watch = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState("");
  const [casts, setcasts] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      const res = await tmdbApi.detail(category, id);
      setItem(res);
      window.scrollTo(0, 0);
    };
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, id);
      setcasts(res.slice(0, 6));
    };
    getDetail();
    getCredits();
  }, [category, id]);

  const { embed_to } = apiConfig;

  const embedMovie = `${embed_to}/movie?id=${id}`;
  // const embedTV = `${embed_to}/tv?id=${id}&s=${season}&e=${episode}`;

  const bg = apiConfig.original_image(item.backdrop_path);

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

  return (
    <>
      <div className="watch__banner" style={{ backgroundImage: `url(${bg})` }}></div>

      <div className="watch__container">
        <p className="back__to">
          <Link to={`/${category}/${item.id}`}>
            Back to {`${category}`} info
          </Link>
        </p>
        <div className="inner__container">
          <div className="watch">
            <div className="watch__player">
              {item && (
                <iframe
                  className="absolute w-full h-full top-0 left-0"
                  src={embedMovie}
                  // src={category === cat.movie ? embedMovie : embedTV}
                  title={`${category} Video Player`}
                  width="760"
                  height="435"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
              <div className="playlist">

              </div>
            </div>

            <div className="content__info">
              <div className="info__poster">
                <div
                  className="poster__img"
                  style={{
                    backgroundImage: `url(${apiConfig.original_image(
                      item.poster_path
                    )})`,
                  }}
                ></div>
              </div>
              <div className="watch__info">
                <h2>{item.title || item.name} ({new Date(item.release_date).getFullYear() || new Date(item.first_air_date).getFullYear()})</h2>
                <p>{item.overview}</p>
                <p>Duration: {item.runtime} minutes</p>
                <p>
                Genre: {item.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p>
                Casts: {casts.map((cast) => cast.name).join(", ")}
                </p>
                <p>Country: {item.country}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Watch;
