import API from "../API/API";
import {useState} from "react";

export default function SearchText({onMovies}){
    const [text, setText] = useState("");

    const handleChange = (e) => {
        API.setSearchText(e.target.value).then(data => {
            onMovies(data.hits.hits);
        })
        setText(e.target.value);
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
