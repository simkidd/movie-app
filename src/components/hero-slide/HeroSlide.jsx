import React, { useEffect, useState } from "react";
import "./hero-slide.scss";
import { Swiper, SwiperSlide } from "swiper/react";
// import swiper styles
import "swiper/css";
import HeroSlideItem from "../hero-slide-item/HeroSlideItem";
import tmdbApi, { movieType } from "../../api/tmdbApi";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const res = await tmdbApi.getMoviesList(movieType.popular, { params });
        setMovieItems(res.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);
  return (
    <div className="hero__slide">
      <Swiper slidesPerView={1} grabCursor={true}>
        {movieItems.map((item, i) => {
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
