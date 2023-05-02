import React from "react";
import "./hero-slide-item.scss"
import apiConfig from "../../api/apiConfig";
import { OutlineButton } from "../buttons/Button";
import {useNavigate} from 'react-router-dom'

const HeroSlideItem = ({item, activeClass}) => {
    const bg = apiConfig.original_image(item.backdrop_path)
    const navigate = useNavigate()
    
  return (
    <div className={`slide__item ${activeClass}`} style={{backgroundImage:`url(${bg})`}}>
      <div className="slide__content">
        <div className="content__info">
          <h2>{item.title}</h2>
          <p>{item.overview}</p>
          <div className="btns">
            <OutlineButton title='Watch now' onClick={()=> navigate(`/movie/${item.id}`)} />
          </div>
        </div>

        <div className="content__poster">
            <img src={apiConfig.w500_image(item.poster_path)} alt="poster" />
        </div>
      </div>
    </div>
  );
};

export default HeroSlideItem;
