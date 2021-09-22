import {Fragment, useEffect, useState} from "react";
import API from "../API/API";

export default function GenresList({selectedGenres, setSelectedGenres}){
    const [genres, setGenres] = useState([]);
    useEffect(() => {API.allGenres().then(data => {
        console.log("all genres:")
        console.log(data.aggregations.genres.buckets)
        setGenres(data.aggregations.genres.buckets)
        setSelectedGenres([])
    })}, [])

    const toggleGenre = (genre) => () => {
        setSelectedGenres(selectedGenres.includes(genre) ? selectedGenres.filter(g => g !== genre) : [...selectedGenres, genre])
    }

    const ShowGenres = () => {
        return genres.map((genre) => (
            <Fragment key={genre.key}>
                <label>
                    {genre.key} ({genre.doc_count})
                    <input type="checkbox" id={genre.key} name={genre.key} value={genre.key} onChange={toggleGenre(genre.key)}/>
                </label>
                <br/>
            </Fragment>
        ))
    }

    return (
        <>
            <h2>Genres List:</h2>
            <form >
                <ShowGenres/>
                <br/>
            </form>
        </>
    )
}
