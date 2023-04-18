import {useState, useEffect} from 'react';

import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';


const ENV = process.env.REACT_APP_OMBD_API_KEY
const API_KEY = ENV.substr(1,ENV.length-3)

const API_URL = `http://omdbapi.com?apikey=${API_KEY}`;


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm,  setSearchTerm] = useState('');
    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    } 

    useEffect(() =>{
        searchMovies('');
    }, []);
    return(
    <div className = "app">
        <h1>Movieland</h1>

        <div className = "search">
            <input 
            placeholder = "Search for movies"
            value = {searchTerm}
            onChange = {(e) => setSearchTerm(e.target.value)}>
            </input>
            <img
            src = {SearchIcon}
            alt = "search"
            onClick = {() => searchMovies(searchTerm)}
            />

        </div>

        {movies?.length > 0
            ? (
            <div className = "container">
                {movies.map((movie) => (
                    <MovieCard movie = {movie}/>
                ))}
            </div>
            ) : (
                <div className = "empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
}

export default App;