export default function MovieItem({movie}){

    const styles = {
        backgroundColor: "#bbbbbb",
        color:"#000000",
        listStyle: "none"
    }

    const secondToDate = (seconds) => {
        const date = new Date(seconds);
        return date.toString()
    }

    const showGenres = (genres) => {
        if (genres.length === 0) {
            return <></>
        } else {
            return genres.map( (genre) =>
                <li key={genre} style={{listStyle: "none"}}>
                    {genre}
                </li>
            )
        }
    }

    /*

    */
    return(
        <li style={styles}>
            <p>{movie.title}</p>
            <p>{movie.overview}</p>
            <ul>
                {showGenres(movie.genres)}
            </ul>
            <p>{secondToDate(movie.release_date)}</p>
            <img
                alt={"poster"}
                src={movie.poster}
                style={{width:100, height:100}}
            />
        </li>
    )
}
