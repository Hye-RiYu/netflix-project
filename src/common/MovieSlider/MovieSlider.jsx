import React from 'react';
import './MovieSlider.style.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';



const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <div>
      <h3>{title} Movies</h3>
      <Carousel
        responsive={responsive}
        infinite={true}
        centerMode={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {movies.map((movie,index) => <MovieCard movie={movie} key={index}/>)}
      </Carousel>
    </div>
  )
}

export default MovieSlider
