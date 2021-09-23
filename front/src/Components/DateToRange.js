import {useEffect, useState} from "react";
import API from "../API/API";

export default function DateToRange({onMovies}){
    const [dateMin, setDateMin] = useState(0)
    const [dateMax, setDateMax] = useState(0)
    const [dateOf, setDateOf] = useState(0)
    const [dateTo, setDateTo] = useState(0)

    useEffect(() =>
        {
            API.filmMinDate().then((data) => {
                const dateMinAPI = new Date(data.aggregations.min_date.value).toJSON().split('T')[0]
                setDateMin(dateMinAPI)
                setDateOf(dateMinAPI)
            })
            API.filmMaxDate().then((data) => {
                const dateMaxAPI = new Date(data.aggregations.max_date.value).toJSON().split('T')[0]
                setDateMax(dateMaxAPI)
                setDateTo(dateMaxAPI)
            })
        },[dateMin, dateMin]
    )
    console.log(dateMin+" to "+dateMax)
    console.log(dateOf+" to "+dateTo)

    const handleChangeDateOf = (e) => {
        setDateOf(e.target.value)
        API.filmsByDate(dateOf,dateTo).then((data) => {
            onMovies(data.hits.hits)
        })
    }

    const handleChangeDateTo = (e) => {
        setDateTo(e.target.value)
        API.filmsByDate(dateOf,dateTo).then((data) => {
            onMovies(data.hits.hits)
        })
    }

    return(
        <>
            <label>
                De :
                <input type="date"
                       name="dateOf"
                       min={dateMin} max={dateMax}
                       value={dateOf}
                       onChange={handleChangeDateOf} />
            </label>
            <label>
                à :
                <input type="date"
                       name="dateTo"
                       min={dateMin} max={dateMax}
                       value={dateTo}
                       onChange={handleChangeDateTo} />
            </label>
        </>
    )
}
