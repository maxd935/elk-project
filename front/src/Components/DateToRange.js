import {useEffect, useState} from "react";
import API from "../API/API";

export default function DateToRange({onMovies}){
    const [dateMin, setDateMin] = useState(0)
    const [dateMax, setDateMax] = useState(0)
    const [dateOf, setDateOf] = useState(0)
    const [dateTo, setDateTo] = useState(0)

    useEffect(() =>
        {
            API.fetchElasticSearch().then((data) => {
                const dateMinAPI = new Date(data.aggregations.min_date.value).toJSON().split('T')[0]
                setDateMin(dateMinAPI)
                setDateOf(dateMinAPI)
                const dateMaxAPI = new Date(data.aggregations.max_date.value).toJSON().split('T')[0]
                setDateMax(dateMaxAPI)
                setDateTo(dateMaxAPI)
            })
        },[dateMin, dateMax]
    )


    const handleChangeDate = (e) => {
        if (e.target.name === "dateTo") {
            setDateTo(e.target.value)
        }
        else {
            setDateOf(e.target.value)
        }
        API.setDateRange(new Date(dateOf).getTime()/1000, new Date(dateTo).getTime()/1000)
            .then((data) => {
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
                       onChange={handleChangeDate} />
            </label>
            <label>
                à :
                <input type="date"
                       name="dateTo"
                       min={dateMin} max={dateMax}
                       value={dateTo}
                       onChange={handleChangeDate} />
            </label>
        </>
    )
}
