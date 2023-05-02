import React, { useEffect, useState } from "react";
import "./hero-slide.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay} from 'swiper'
// import swiper styles
import "swiper/css";
import 'swiper/css/autoplay';
import HeroSlideItem from "../hero-slide-item/HeroSlideItem";
import tmdbApi, { movieType } from "../../api/tmdbApi";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [randomOrder, setRandomOrder] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const res = await tmdbApi.getMoviesList(movieType.popular, { params });
        setMovieItems(res);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  useEffect(()=>{
    setRandomOrder(shuffle(movieItems))
  },[movieItems])

  const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  return (
    <div className="hero__slide">
      <Swiper 
      slidesPerView={1} 
      grabCursor={true} 
      modules={[Autoplay]}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      >
        {randomOrder.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <HeroSlideItem
                  item={item}
                  activeClass={`${isActive ? "active" : ""} `}
                />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeroSlide;
