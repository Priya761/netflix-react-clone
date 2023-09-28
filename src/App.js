import React from 'react';
import Row from './Row';
import requests from './requests';
import './App.css'
import Banner from './Banner';
import Nav from './Nav';

// we can think about this App() functional component as the homepage which comprises/is divided of/into various <Row> components and more.
function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <Nav/>
      {/* Banner */}
      <Banner/>
      {/* <Row/> (or any component) is basically a function call to Row(). But this function Row() is not written inside the same file but in another file. From here the function call is made by passing some parameters (here, the parameters are 'title' and 'fetchUrl'). In another file these paramters are passed to the function Row() in the form of an object (conventionally, names 'props'). Now, Row(props) does its processing i.e, completes its defination. Now Row() needs to be returned from where it was called (it was called from the <Row> inside the App() functional component). It order to return it to the calling function, we need to export it. The exported is imprted inside the calling function App() and would get rendered inside <Row> */}
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow // if you don't add any equals sign while passing a prop, it means prop={true}. So here it becomes isLargeRow={true}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
