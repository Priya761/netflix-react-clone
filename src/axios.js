import axios from "axios";

// using React Axios which will replace the use of Postman for sending api requests
// Axios is basically gonna do what Postman does i.e, send requests and fetch data
/** base url to make request to the movie database **/
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

// instance.get('/movie') will convert to (and do get request to) https://api.themoviedb.org/3/movie

export default instance;
// we can only have one default exportin a file