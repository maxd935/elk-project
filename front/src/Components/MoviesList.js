import MovieItem from "./MovieItem";
import {useEffect, useState} from "react";
import API from "../API/API";

export default function MoviesList({selectedGenres}){
    const [movies, setMovies] = useState([]);
    const [fisrt, setFisrt] = useState(true);
    useEffect(() => {
        API.filmsPlusRecents().then(data => {

            setMovies(data.hits.hits)
            setFisrt(false)
        });
    }, [])

    useEffect(() => {
        console.log(fisrt)
        if (!fisrt) {
            console.log(fisrt)
            API.byGenre(selectedGenres).then(data => {
                setMovies(data.hits.hits)
            })
        }
    }, [selectedGenres])

    const showMovies = () => {
        return movies.map((movie) => (
        <MovieItem
            key={movie._source.id}
            movie={movie._source}
        />
        ))}

    return (
        <>
            <h2>Movies List:</h2>
            <ul>
                {showMovies()}
            </ul>
        </>
    )
}
