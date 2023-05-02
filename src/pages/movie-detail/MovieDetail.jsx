import React from 'react'
import MovieList from '../../components/movie-list/MovieList'

const MovieDetail = () => {
  return (
    <div className='banner'>
      <div className="movie__content">
        <div className="content__poster"></div>
        <div className="content__info">
          <h1>title</h1>
          <div className="genres">
            <span>genre</span>
          </div>
          <p>overview</p>
          <div className="cast">
            <div className="section__header">
              <h2>casts</h2>
            </div>
            castlist
          </div>
        </div>
      </div>
      <div className="container">
        <div className="section">
          <h2>similar</h2>
        </div>
        {/* <MovieList /> */}
      </div>
    </div>
  )
}

export default MovieDetail