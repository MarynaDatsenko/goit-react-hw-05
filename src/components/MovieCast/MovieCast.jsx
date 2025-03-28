import { getCreditsById } from "../../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import css from "./MovieCast.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieCast() {
  const { movieId } = useParams();
  const imagePath = "https://image.tmdb.org/t/p/w500/";
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCredits() {
      try {
        setIsLoading(true);
        const data = await getCreditsById(movieId);
        setCredits(data);
      } catch (error) {
        console.error("Error fetching credits:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getCredits();
  }, [movieId]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <b>HTTP error!</b>}
      <ul className={css.castList}>
        {credits?.cast?.map((actor) => (
          <li key={actor.id} className={css.castListItem}>
            <img
              src={
                actor.profile_path
                  ? `${imagePath}${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
              width={150}
            />
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
