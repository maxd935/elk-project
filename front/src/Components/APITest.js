import {Fragment, useState} from "react";

const defaultMovies = [{ title: "Chat"}]
const defaultMovies2 = [{ title: "Chien"}]

export default function APITest({}) {

    const [movies, setMovies] = useState(defaultMovies);

    const API_test = () => {
        const url = "http://localhost:9200/movies/_search"
        const query = {
            "query": {
                "match": {
                    "title": "Marvel"
                }
            }
        }
        const opt = {
            method: 'POST',
            headers: [
                ["Content-Type", "application/json"]
            ],
            body: JSON.stringify(query)
        }
        return fetch(url, opt)
            .then((response) => response.json())
            .then(data => {return data.hits.hits})
            .catch((error) => console.error(error))
    }

    const API_addMovies = () => {
        API_test()
            .then(data => {
                data.map((movie)=>{
                    setMovies([...movies, movie._source])
                })
            })
    }

    const AddMovies = () => {
        defaultMovies2.map((movie)=>{
            setMovies([...movies, movie])
        })
    }


    return (
        <Fragment>
            <button title={"API"} onClick={API_addMovies}/>
            <button title={"Add"} onClick={AddMovies}/>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        {movie.title}
                    </li>
                ))}
            </ul>
        </Fragment>
    );
}
