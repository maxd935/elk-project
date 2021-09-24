import {useEffect, useState} from "react";
import API from "../API/API";

export default function SizePage({onMovies}){
    const [from, setFrom] = useState(0);
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(1);
    const [nbrResultat, setNbrResultat] = useState(0);
    const [nbrPage, setNbrPage] = useState(0);

    useEffect(() => {
        API.fetchElasticSearch().then(data => {
            setNbrResultat(data.hits.total.value)
            setNbrPage(data.hits.total.value/size)
        });
    }, [from])

    const toggleSize = (e) => {
        setSize(e.target.value)
        console.log(from +" from - size "+size)
        console.log(e.target.value)
        API.filmPagination(from, e.target.value).then(data => {
            onMovies(data.hits.hits)
            setNbrResultat(data.hits.total.value)
            setNbrPage(data.hits.total.value/e.target.value)
        })
    }


    const handlePagePrec = () => {
        if(page!==0){
            setPage(page-1)
            setFrom(page * size)
        }
        API.filmPagination(from, size).then(data => {
            onMovies(data.hits.hits)
        });
    }

    const handlePageSuivante = () => {
        if(page!==1000){
            setPage(page+1)
            setFrom(page * size)
        }
        API.filmPagination(from, size).then(data => {
            onMovies(data.hits.hits)
        });
    }

    return (
        <>
            <select value={size} onChange={toggleSize}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>

            <p>Resultats obtenus = {nbrResultat}</p>
            <p>Nombre de page = {Math.ceil(nbrPage)}</p>

            <button onClick={handlePagePrec}> Page précédente</button>
            <button onClick={handlePageSuivante}> Page suivante</button>
        </>
    )
}