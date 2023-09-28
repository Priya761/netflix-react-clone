import React, { useEffect, useState } from 'react'
// when we export something as a default, we can name it anything while importing it. 
// Example: in 'axios.js' the default export name was 'instance'; but while importing it, we can change its (only works for default export name) can to anything.
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

// base_url for images of movies returned by the tmdb database
const base_url = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which runs on a specific condition/variable.
  useEffect(() => {
    // if [], run once when the Row loads, and don't run again
    // If the second parameter was a variable instead of [], it would run once when the Row loads and would run again every single time when the variable changes.
    async function fetchData() {
      // async is used because we are requesting to fetch data from a remote server/database which may take a while, and since we do not want to delay the further processing of the codes below, we use 'async' function.
      const request = await axios.get(fetchUrl);
      // 'await' is used because the useEffect function will not process further till the response doesn't come from the server.
      // console.log(request.data.results);
      setMovies(request.data.results);
      console.log(movies);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if(trailerUrl){
      setTrailerUrl("");
    }else{
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
      .then((url) => {
        // the above "url" inside the parameter will give the youtube video url of the movie.name along with its id i.e, the complete url: https://www.youtube.com/watch?{youtube-id} 
        // eg: https://www.youtube.com/watch?{youtube-id}
        // https://www.youtube.com/watch?v=XtMThyBQKqL
        console.log(url);
        // URLSearchParams will search for all the different "parameters" present inside the youtube url.
        const urlParams = new URLSearchParams(new URL(url).search);
        console.log((urlParams));
        // .get will return us the parameter/value with respect to the key 'v' inside the youtube url. i.e, the value inside v:{youtube-id} eg: v=XtMThyBQKqL
        setTrailerUrl(urlParams.get("v"));   // will give XtMThyBQKqL i.e, the youtube video id
      })
      .catch((error) => console.log(error));
    }
  }

  return (
    <div className='row'>
      {/* title */}
      <h2>{title}</h2>

      {/* container - posters */}
      <div className="row__posters">
        {/* several row__posters */}

        {movies.map(movie => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  )
}

export default Row
