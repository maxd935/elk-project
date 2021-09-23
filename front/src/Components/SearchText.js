import API from "../API/API";
import {useState} from "react";

export default function SearchText({onMovies}){
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
        API.filmsByRechText(e.target.value).then(data => {
            onMovies(data.hits.hits);
        })
        if (e.target.value.length===0){
            API.filmsPlusRecents().then(data => {
                onMovies(data.hits.hits)
            });
        }

    }

    return (
        <form>
            <label>
                Recherche film :
                <input type="text" value={text} onChange={handleChange} />
            </label>
        </form>
    )

}
