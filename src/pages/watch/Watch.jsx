import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./watch.scss";
import { category as cat } from "../../api/tmdbApi";
import {ClipLoader} from 'react-spinners'
import { BsChevronLeft } from "react-icons/bs";

const Watch = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState("");
  const [casts, setcasts] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState("");
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const getDetail = async () => {
      const res = await tmdbApi.detail(category, id);
      setItem(res);
      setIsLoading(false)
      window.scrollTo(0, 0);
    };
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, id);
      setcasts(res.slice(0, 6));
    };
    const getSeasons = async () => {
      const res = await tmdbApi.getTvSeasons(id, selectedSeason);
      console.log(res);
      setSeasons(res);
      setSelectedSeason(res[0]?.season_number);
    };
    getDetail();
    getCredits();
    if (category === cat.tv) {
      getSeasons();
    }
  }, [category, id, selectedSeason]);

  const { embed_to } = apiConfig;

  const embedMovie = `${embed_to}/movie?id=${id}`;
  const embedTV = `${embed_to}/tv?id=${id}&s=${selectedSeason}&e=${selectedEpisode}`;

  const bg = apiConfig.original_image(item.backdrop_path);

  const handleSeasonChange = (e) => {
    setSelectedSeason(e.target.value);
    setSelectedEpisode("");
  };

  const handleEpisodeChange = (e) => {
    setSelectedEpisode(e.target.value);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      <ClipLoader size={80} color={"#ff0000"} loading={isLoading} />
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <div
        className="watch__banner"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      <div className="watch__container">
        <p className="back__to">
          <Link to={`/${category}/${item.id}`}>
          <BsChevronLeft />
            Go Back
          </Link>
        </p>
        <div className="inner__container">
          <div className="watch">
            <div className="watch__player">
              {item && (
                <iframe
                  className="absolute w-full h-full top-0 left-0"
                  // src={embedMovie}
                  src={category === cat.movie ? embedMovie : embedTV}
                  title={`${category} Video Player`}
                  width="760"
                  height="435"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
              <div className="playlist">
                {category === cat.tv && (
                  <div>
                    <select
                      name="season"
                      id="season"
                      onChange={handleSeasonChange}
                      value={selectedSeason}
                    >
                      {seasons.map((season) => (
                        <option
                          key={season.id}
                          value={season.season_number.toString()}
                        >
                          Season {season.season_number}
                        </option>
                      ))}
                    </select>
                    <div>
                      <select
                        name="episode"
                        id="episode"
                        onChange={handleEpisodeChange}
                        value={selectedEpisode}
                      >
                        {selectedSeason &&
                          seasons
                            .find(
                              (season) =>
                                season.season_number === selectedSeason
                            )
                            .episodes.map((episode) => (
                              <option
                                key={episode.id}
                                value={episode.episode_number.toString()}
                              >
                                Episode {episode.episode_number}
                              </option>
                            ))}
                      </select>
                    </div>
                    <button disabled={!selectedEpisode}>Play</button>
                  </div>
                )}
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
                <h2>
                  {item.title || item.name} (
                  {new Date(item.release_date).getFullYear() ||
                    new Date(item.first_air_date).getFullYear()}
                  )
                </h2>
                <p>{item.overview}</p>
                <p>
                  <span>Duration:</span> {item.runtime} minutes
                </p>
                <p>
                  <span>Genre:</span>{" "}
                  {item.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p>
                  <span>Casts:</span>{" "}
                  {casts.map((cast) => cast.name).join(", ")}
                </p>
                {category === cat.tv && (
                  <p>
                    <span>Country:</span> {item.origin_country}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Watch;
