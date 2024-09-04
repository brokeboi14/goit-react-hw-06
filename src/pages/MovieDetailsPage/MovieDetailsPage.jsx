import {
    useParams,
    useLocation,
    Link,
    NavLink,
    Outlet,
  } from "react-router-dom";
  import { BsFillArrowLeftCircleFill } from "react-icons/bs";
  import { getMovieDetails } from "../../js/tmdb-api";
  import { useEffect, useState, Suspense, useRef } from "react";
  import Moment from "moment";
  import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
  import Loader from "../../components/Loader/Loader";
  import movieDefault from "../../img/movieDefault.svg"
  import css from "./MovieDetailsPage.module.css";
  import clsx from "clsx";
  
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  
  const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const backLinkHref = useRef(location.state ?? "/");
  
    useEffect(() => {
      async function getMovieDetailsData() {
        try {
          setIsError(false);
          setIsLoading(true);
          const data = await getMovieDetails(movieId);
          setMovie(data);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetailsData();
    }, [movieId]);
  
    return (
      <main>
        <Link to={backLinkHref.current} className={css.goBackBtn}>
          <BsFillArrowLeftCircleFill size="24" />
          Go Back
        </Link>
        {isError && <ErrorMessage />}
        {isLoading && <Loader />}
        <h2 className={css.title}>{movie.title}</h2>
        <div className={css.movieDetailsContainer}>
          <img
            className={css.PosterImg}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : movieDefault
            }
            alt={movie.title}
          />
          <div className={css.movieDetailsDescription}>
            <h3 className={css.aboutTitle}>About {movie.title}</h3>
            <p className={css.aboutText}>{movie.overview}</p>
            <h3 className={css.aboutTitle}>Genres</h3>
            <ul className={css.genresList}>
              {movie?.genres?.map(({ id, name }) => (
                <li key={id}>{name}, &nbsp;</li>
              ))}
            </ul>
            <p className={css.releaseDate}>User rating: {movie.vote_average}</p>
            <p className={css.releaseDate}>
              Release Date: {Moment(movie.release_date).format("MMMM Do YYYY")}
            </p>
          </div>
        </div>
        <ul className={css.nestedRoutesList}>
          <li>
            <NavLink to="cast" className={buildLinkClass}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={buildLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    );
  };
  
  export default MovieDetailsPage;  