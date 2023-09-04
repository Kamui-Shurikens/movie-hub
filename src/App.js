import './App.css';
import Navbar from './Components/Navbar.js';
import Banner from './Components/Banner.js';
import Movies_cards from './Components/Movies_cards';
import Favourites from './Components/Favourites';
import MoviePage from './Components/MoviePage';
import SearchResults from './Components/SearchResults';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Discover from './Components/Discover';
import MovieGenList from './Components/MovieGenList';
import Login from './Components/Login';
function App() {
  return (
    <>
      {
        (localStorage.getItem("UserName") == undefined)?
        <Login/>:
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<> <Banner /><Movies_cards /> </>}></Route>
            <Route path='/Favourites' element={<Favourites />}></Route>
            <Route path='/moviepage/:mvid' element={<MoviePage />}></Route>
            <Route path='/searchresults/:searchKey' element={<SearchResults></SearchResults>}></Route>
            <Route path='/discover' element={<Discover></Discover>} ></Route>
            <Route path='/movieByGen/:genre' element={<MovieGenList></MovieGenList>} ></Route>
            <Route path='*' element={<h1 style={{ color: "white" }}>NO SUCH PAGE 😅</h1>}></Route>
          </Routes>
        </BrowserRouter>
      }
    </>
  );
}

export default App;


