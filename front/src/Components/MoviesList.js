import MovieItem from "./MovieItem";
import {Fragment, useEffect, useState} from "react";
import API from "../API/API";
import OrderButton from "./OrderButton";
import SearchText from "./SearchText";
import ListGenres from "./ListGenres";
import DateToRange from "./DateToRange";

export default function MoviesList(){
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        API.fetchElasticSearch().then(data => {
            setMovies(data.hits.hits)
        });
    }, [])


    const showMovies = () => {
        if (movies.length === 0) {
            return null
        } else {
            return movies.map((movie) => (
                <MovieItem
                    key={movie._source.id}
                    movie={movie._source}
                />
            ))
        }
    }


    return (
        <>
            <h2>Genres List</h2>
            <ListGenres onMovies={setMovies}/>
            <h2>Movies List</h2>
            <OrderButton onMovies={setMovies}/>
            <SearchText onMovies={setMovies}/>
            <DateToRange onMovies={setMovies}/>
            <ul>
                {showMovies()}
            </ul>
        </>
    )
}
