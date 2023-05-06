import React from 'react';
import {Link} from 'react-router-dom'
import apiConfig from '../../api/apiConfig';
import './movie-card.scss'
import { category } from '../../api/tmdbApi';

const MovieCard = ({item}) => {
  const bg = apiConfig.w500_image(item.poster_path)

  const link = item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`;

  console.log(link)

  

  return (
    <Link to={link}>
      <div className="movie__card" style={{backgroundImage:`url(${bg})`}}>
        <button>play</button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  )
}

export default MovieCard