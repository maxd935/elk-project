import {Fragment, useEffect, useState} from "react";
import API from "../API/API";

export default function ListGenres({onMovies}) {

    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        API.setGenres([]).then(data => {
            setGenres(data.aggregations.genres.buckets)
        })
    }, [])

    // BUG QUAND ON REMET LA CHECKLIST VIDE
    const toggleGenre = (genre) => () => {
        let selectedGenres_ = selectedGenres.includes(genre) ? selectedGenres.filter(g => g !== genre) : [...selectedGenres, genre]
        API.setGenres(selectedGenres_).then(data => {
            onMovies(data.hits.hits)
            setSelectedGenres(selectedGenres_)
        })
    }

    console.log(selectedGenres)

    const itemGenres = () => {
        return genres.map((genre) =>
            <Fragment key={genre.key}>
                <label>
                    {genre.key} {genre.doc_count}
                    <input type="checkbox"
                           name="genresList"
                           value={genre.key}
                           onChange={toggleGenre(genre.key)}/>
                </label>
                <br/>
            </Fragment>
        )
    }

    return(
        <form>
            {itemGenres()}
            <br/>
        </form>
    )

}
