import React from "react";
import "./hero-slide-item.scss";
import apiConfig from "../../api/apiConfig";
import Button from "../buttons/Button";
import { Link } from "react-router-dom";
import {HiInformationCircle} from 'react-icons/hi'

const HeroSlideItem = ({ item, activeClass, type }) => {
  const bg = apiConfig.original_image(item.backdrop_path);
  
  const slug = (item?.title || item?.name).toLowerCase().replace(/\s+/g, '-')

  return (
    <div
      className={`slide__item ${activeClass}`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="slide__content">
        <div className="content__info">
          <h2>{item.title || item.name}</h2>
          <p>
            {item.overview.length > 100
              ? item.overview.slice(0, 100) + "..."
              : item.overview}
          </p>
          <div className="btns">
            <Link to={`/${type}/${item.id}-${slug}`}>
              <Button><HiInformationCircle /> More info</Button>
            </Link>
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
