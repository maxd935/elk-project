import API from "../API/API";
import {useState} from "react";

export default function OrderButton({onMovies}){
    const [order, setOrder] = useState("asc");

    const toogleOrder = (order) => () => {
        API.filmsByOrder(order).then(data => {
            onMovies(data.hits.hits);
        })
        const new_order = order==="asc" ? "desc" : "asc"
        setOrder(new_order)
    }

    return (
        <button onClick={toogleOrder(order)}>Trie par date : {order==="asc" ? "recent" : "ancien"} </button>
    )
}
