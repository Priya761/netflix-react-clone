import React, {useState, useEffect} from 'react';
import axios from './axios';
import requests from './requests';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      // console.log(request.data.results);  // [... , ... , ...] the result will be an array of all the movies of Netflix Originals
      // but we want only one random movie, this could be done using the Math.random() function as follows:
      // Math.floor(Math.random() * request.data.results.length - 1);
      // console.log(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
      setMovie(
        request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)  
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  // to truncate the banner description if it becomes too long
  function truncate(str, n){
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    // {/* **** background image **** */}
    <header className='banner'
      style={{
        background: "cover",
        backgroundImage: `url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
          )`,
        backgroundPosition: "center center",
      }}
    > 
      <div className='banner__contents' >
        {/* title */}
        <h1 className='banner__title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* div -> 2 buttons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  )
}

export default Banner
