import {Fragment, useEffect, useState} from "react";
import API from "../API/API";

export default function GenresList({selectedGenres, setSelectedGenres}){
    const [genres, setGenres] = useState([]);
    useEffect(() => {API.allGenres().then(data => {
        console.log("all genres:")
        console.log(data.aggregations.genres.buckets)
        setGenres(data.aggregations.genres.buckets)
    })}, [])
    useEffect(() => {setSelectedGenres([])}, [])

    const toggleGenre = (genre) => () => {
        let selectedGenres_ = selectedGenres;
        let index = selectedGenres_.indexOf(genre);

        if (index === -1) {
            selectedGenres_.push(genre);
        } else {
            selectedGenres_.splice(index, 1);
        }
        setSelectedGenres(selectedGenres_)
        console.log(selectedGenres)
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
