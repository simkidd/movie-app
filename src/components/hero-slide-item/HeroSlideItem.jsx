import React from "react";
import "./hero-slide-item.scss";
import apiConfig from "../../api/apiConfig";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import { category as cat } from "../../api/tmdbApi";

const HeroSlideItem = ({ item, activeClass, category }) => {
  const bg = apiConfig.original_image(item.backdrop_path);
  const navigate = useNavigate();

  
  const path = `/${category}/${item.id}`

  return (
    <div
      className={`slide__item ${activeClass}`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="slide__content">
        <div className="content__info">
          <h2>{item.title || item.name}</h2>
          <p>{item.overview.length > 100 ? item.overview.slice(0, 100) + "..." : item.overview}</p>
          <div className="btns">
            <Button
              title="Watch now"
              onClick={() => navigate(path)}
            />
          </div>
        </div>

        <div className="content__poster">
          <img
            src={apiConfig.w500_image(item.poster_path)}
            alt={item.poster_path}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSlideItem;
