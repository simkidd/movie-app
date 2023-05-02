import React from 'react'
import './movie-list.scss'
import {Swiper, SwiperSlide} from 'swiper/react'
import MovieCard from '../movie-card/MovieCard'

const MovieList = ({type}) => {
  return (
    <div className='movie__list'>
        <Swiper 
        slidesPerView={'auto'}
        spaceBetween={10}
        grabCursor={true}
        >
        {type.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <MovieCard item={item} />
              </SwiperSlide>
            )
        })}
        </Swiper>
    </div>
  )
}

export default MovieList