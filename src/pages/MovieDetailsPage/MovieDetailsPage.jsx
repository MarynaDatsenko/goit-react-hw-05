import { Suspense, useEffect, useState } from "react";
import { Outlet, useParams, NavLink } from "react-router";
import { getMovieById } from "../../api";
import BtnGoBack from "../../components/BtnGoBack/BtnGoBack";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieDetailsPage() {
  const imagePath = "https://image.tmdb.org/t/p/w500/";
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        const data = await getMovieById(movieId);

        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovie();
  }, [movieId]);

  const setLinkClass = ({ isActive }) => {
    return clsx(css.linkItem, isActive && css.linkActive);
  };

  return (
    <div className={css.container}>
      <BtnGoBack />
      {isLoading && <p>Loading...</p>}
      {error && <b>HTTP error!</b>}
      {movie && (
        <div className={css.contentWrapper}>
          <div className={css.imgWrapper}>
            <img
              src={
                movie.poster_path
                  ? `${imagePath}${movie.poster_path}`
                  : defaultImg
              }
              alt={movie.title}
              className={css.contentImg}
            />
          </div>
          <div className={css.description}>
            <h2>
              {movie.title} ({movie.release_date.split("-")[0]})
            </h2>
            <p>User Score : {Math.round(movie.vote_average * 10)}%</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <div>
              <h4>Genres</h4>
              <ul className={css.genresList}>
                {movie.genres.map((genre) => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className={css.extraContentWrapper}>
        <p className={css.extraContent}>Additional information</p>
        <ul className={css.additionalList}>
          <li>
            <NavLink to="cast" className={setLinkClass}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={setLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
