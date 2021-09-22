import {useEffect, useState} from "react";
import API from "../API/API";

export default function GenresList(){
    const [genres, setGenres] = useState([]);
    useEffect(() => {API.allGenres().then(data => {
        console.log("all genres:")
        console.log(data.aggregations.genres.buckets)
        setGenres(data.aggregations.genres.buckets)
    })}, [])

    const ShowGenres = () => {
        if (genres.length === 0){
            return <li>
            </li>
        }
        else {
            return genres.map((genre) => (
                <li key={genre.key}>
                    {genre.key} ({genre.doc_count})
                </li>
            ))
        }

    }

    return (
        <>
            <h2>Genres List:</h2>
            <ul>
                <ShowGenres/>
            </ul>
        </>
    )
}
