import MovieItem from "./MovieItem";
import {Fragment, useEffect, useState} from "react";
import API from "../API/API";

export default function MoviesList(){
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        API.filmsPlusRecents().then(data => {
            setMovies(data.hits.hits)
        });
        API.allGenres().then(data => {
            setGenres(data.aggregations.genres.buckets)
            setSelectedGenres([])
        })
    }, [])

    const toggleGenre = (genre) => () => {
        let selectedGenres_ = selectedGenres.includes(genre) ? selectedGenres.filter(g => g !== genre) : [...selectedGenres, genre]
        API.byGenre(selectedGenres_).then(data => {
            setMovies(data.hits.hits)
            setSelectedGenres(selectedGenres_)
        })
    }

    const showMovies = () => {
        if (movies.length === 0) {
            return <></>
        } else {
            return movies.map((movie) => (
                <MovieItem
                    key={movie._source.id}
                    movie={movie._source}
                />
            ))
        }
    }

    const showGenres = () => {
        if (genres.length === 0) {
            return <></>
        } else {
            return genres.map((genre) => (
                <Fragment key={genre.key}>
                    <label>
                        {genre.key} ({genre.doc_count})
                        <input type="checkbox" id={genre.key} name={genre.key} value={genre.key}
                               onChange={toggleGenre(genre.key)}/>
                    </label>
                    <br/>
                </Fragment>
            ))
        }
    }

    return (
        <>
            <h2>Movies List:</h2>
            <ul>
                {showMovies()}
            </ul>
            <h2>Genres List:</h2>
            <form >
                {showGenres()}
                <br/>
            </form>
        </>
    )
}
