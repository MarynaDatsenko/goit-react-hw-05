import axios from "axios";

const baseURL = "https://api.themoviedb.org/3";
const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2MyYzdkOTVjMDk2NzE4ZmVlNzIzYWM1ZmMzNzU0NSIsIm5iZiI6MTc0MjkwMTMxNC4xMjgsInN1YiI6IjY3ZTI5MDQyYTYzYmNjNDk5N2RjNjljMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4KlnpXEwPseLpekcpdfANQO632dcYYn_unCI6IFYV1k",
};

export const fetchTrendingMovies = async () => {
  const resp = await axios.get(`${baseURL}/trending/movie/day`, { headers });
  return resp.data.results;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`, { baseURL, headers });
  return response.data;
};

export const getCreditsById = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`, {
    baseURL,
    headers,
  });
  return response.data;
};

export const getReviewsById = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`, {
    baseURL,
    headers,
  });
  return response.data.results;
};

export const fetchSearchMovies = async (query) => {
  const resp = await axios.get(`${baseURL}/search/movie`, {
    headers,
    params: {
      query,
    },
  });
  return resp.data.results;
};
