import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Banner from './components/Banner'
import Movies from './components/Movies'
import Pagination from './components/Pagination'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Favourites from './components/Favourites'

function App() { // this is the beginning of the project
  return (
    <>
      <BrowserRouter>
        {/*<h1> This is Devansh Srivastava! 🔥🚀 </h1> */}
        {/*// <h2> NavBar </h2> */}
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<Navigate to={"/movies"} replace />} />
          <Route path="/movies" element={<> <Banner /> <Movies /> {/*<Pagination/> */} </>} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>

        {/*<h2> Banner </h2>
      <h2> Trending Movies </h2>
  <h2> pagination </h2> */}
      </BrowserRouter>
    </>

  );
}

export default App;
