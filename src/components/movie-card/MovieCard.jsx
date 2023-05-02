import React from 'react';
import {Link} from 'react-router-dom'
import apiConfig from '../../api/apiConfig';
import './movie-card.scss'

const MovieCard = ({item}) => {
  const bg = apiConfig.w500_image(item.poster_path)

  return (
    <Link to={`/movie/${item.id}`}>
      <div className="movie__card" style={{backgroundImage:`url(${bg})`}}>
        <button>play</button>
      </div>
      <h3>{item.title}</h3>
    </Link>
  )
}

export default MovieCard