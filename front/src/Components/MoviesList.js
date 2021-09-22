import MovieItem from "./MovieItem";
import {useState} from "react";
import API from "../API/API";

export default function MoviesList(){

    const [movies, setMovies] = useState([]);


    movies.map((movie) => {
        console.log("movie")
        console.log(movie)
        }
    )

    const add_movies = () => () => {
        API().then(data => {
            setMovies(data)
        })
    }

    const ShowMovies = () => {
        if (movies.length === 0){
            return <li>
            </li>
        }
        else {
            return movies.map((movie) => (
            <MovieItem
                key={movie._source.id}
                movie={movie._source}
            />
        ))}

    }

    return (
        <>
            <button onClick={add_movies()}>Press</button>
            <ul>
                <ShowMovies/>
            </ul>
        </>
    )
}
