import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import apiConfig from '../../api/apiConfig';
import './movie-card.scss'
import { category as cat } from '../../api/tmdbApi';
import {BsPlayFill} from 'react-icons/bs'
import Button from '../buttons/Button';
import { CardSkeleton } from '../skeleton/Skeleton';

const MovieCard = ({item, category}) => {
  const [isLoading, setIsLoading] = useState(true); // State for loading

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  const bg = item?.poster_path ? apiConfig.w500_image(item?.poster_path) : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`

  const slug = (item?.title || item?.name).toLowerCase().replace(/\s+/g, '-') // Assuming slug is the title or name of the item
  
  const link = `/${cat[category]}/${item?.id}-${slug}`

  if (isLoading) {
    return <CardSkeleton />; // Render skeleton loading state
  }

  return (
    <Link to={link}>
      <div className="movie__card" style={{backgroundImage:`url(${bg})`}}>
        <Button title={<BsPlayFill size={20} />} />
      </div>
      <h3>{item?.title || item?.name}</h3>
    </Link>
  )
}

export default MovieCard