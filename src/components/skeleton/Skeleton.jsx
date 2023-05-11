import React from 'react';
import './skeleton.scss'

const Skeleton = ({className}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <p>Skeleton loading...</p>
    </div>
  )
}

export default Skeleton