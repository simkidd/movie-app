import React from 'react'
import './movie-list.scss'
import {Swiper, SwiperSlide} from 'swiper/react'
import MovieCard from '../movie-card/MovieCard'
import { useParams } from 'react-router-dom'

const MovieList = ({type}) => {
  const { category } = useParams();

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
                <MovieCard item={item} category={category} />
              </SwiperSlide>
            )
        })}
        </Swiper>
    </div>
  )
}

export default MovieList