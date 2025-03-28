import { Link, useLocation } from "react-router";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const imagePaths = "https://image.tmdb.org/t/p/w500/";
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.movieItem}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <div className={css.imageWrapper}>
              <img
                src={`${imagePaths}${movie.backdrop_path}`}
                alt={movie.title}
                className={css.movieImage}
              />
            </div>
            <h3 className={css.itemTitle}>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
