export default function MovieItem({movie}){
    return(
        <li>
            <p>{movie.title}</p>
            <p>{movie.overview}</p>
            <p>{movie.genres}</p>
            <p>{movie.release_date}</p>
            <p>{movie.poster}</p>
        </li>
    )
}
