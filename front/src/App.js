import './App.css';
import MoviesList from "./Components/MoviesList";
import GenresList from "./Components/GenresList";
import {useState} from "react";

function App() {
    const [selectedGenres, setSelectedGenres] = useState([]);

    return (
    <div className="App">
        <MoviesList selectedGenres={selectedGenres}/>
        <GenresList selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}/>
    </div>
    );
}

export default App;
