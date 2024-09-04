import axios from "axios";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTk0OWY4ZTlmYTI2MzdhOGIyNmUyMjFkZDczYTY4MSIsIm5iZiI6MTcyNDg3MjIyOS43MDk4MzQsInN1YiI6IjY2Y2Y3NDdlODFmMjVjNTg4N2UyZjhlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZmBqKc0jauscExAzsIgg6GRsMDIj8AJyYF7tidNp9CE",
  },
});

export async function getTodayTrendingMovies() {
  const { data } = await tmdbApi.get("trending/movie/day");
  return data;
}

export async function getMovieByQuery(query, page) {
  const params = {
    query,
    page,
  };
  const { data } = await tmdbApi.get("search/movie", { params });
  return data;
}

export async function getMovieDetails(movie_id) {
  const { data } = await tmdbApi.get(`movie/${movie_id}`);
  return data;
}

export async function getMovieCredits(movie_id) {
  const { data } = await tmdbApi.get(`movie/${movie_id}/credits`);
  return data;
}

export async function getMovieReviews(movie_id) {
  const { data } = await tmdbApi.get(`movie/${movie_id}/reviews`);
  return data;
}