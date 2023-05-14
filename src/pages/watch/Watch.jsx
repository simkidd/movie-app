import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./watch.scss";
import { category as cat } from "../../api/tmdbApi";
import { ClipLoader } from "react-spinners";
import { BsChevronLeft } from "react-icons/bs";

const Watch = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState("");
  const [casts, setcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // season and episode
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [episodeData, setEpisodeData] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const res = await tmdbApi.detail(category, id);
      setItem(res);
      setIsLoading(false);
      window.scrollTo(0, 0);
    };
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, id);
      setcasts(res.slice(0, 6));
    };

    getDetail();
    getCredits();
  }, [category, id]);

  useEffect(() => {
    const getEpisodeData = async () => {
      const res = await tmdbApi.getTvSeasons(id, season); // Fetch the TV season data
      const episodeList = res.episodes; // Extract the list of episodes from the response
      setEpisodeData(episodeList);
      console.log(res);
    };

    getEpisodeData();
  }, [id, season]);

  const handleSeasonChange = (e) => {
    const selectedSeason = parseInt(e.target.value, 10);
    setSeason(selectedSeason);
    setEpisode(1);
  };

  const handleEpisodeChange = (e) => {
    const selectedEpisode = parseInt(e.target.value, 10);
    setEpisode(selectedEpisode);
  };

  const { embed_to } = apiConfig;

  const embedMovie = `${embed_to}/movie?id=${id}`;
  const embedTV = `${embed_to}/tv?id=${id}&s=${season}&e=${episode}`;

  const bg = apiConfig.original_image(item.backdrop_path);

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
              {item ? (
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
              ) : (
                <div
                  style={{
                    width: "760px",
                    height: "435px",
                    background: "#111",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "grey",
                  }}
                >
                  Not available
                </div>
              )}
              {/* <div className="playlist"></div> */}

              {category === cat.tv && (
                <div className="playlist">
                  <select value={season} onChange={handleSeasonChange}>
                    {item &&
                      item.seasons.map((season) => (
                        <option
                          key={season.season_number}
                          value={season.season_number}
                        >
                          Season {season.season_number}
                        </option>
                      ))}
                  </select>
                  {episodeData && episodeData.length > 0 && (
                    <select value={episode} onChange={handleEpisodeChange}>
                      {episodeData.map((episode) => (
                        <option
                          key={episode.episode_number}
                          value={episode.episode_number}
                        >
                          Episode {episode.episode_number}: {episode.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              {category === cat.tv && (
                <div className="episode__details">
                  <p>Season {season}</p>
                  {episodeData && episodeData.length > 0 && (
                    <p>
                      Episode {episode}: {episodeData[episode - 1].name}
                    </p>
                  )}
                  {episodeData && episodeData.length > 0 && (
                    <p>Overview: {episodeData[episode - 1].overview}</p>
                  )}
                </div>
              )}
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
