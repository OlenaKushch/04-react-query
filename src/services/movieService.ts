import axios from "axios";
import type { Movie } from "../types/movie"


const API_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface URLResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export async function getMovies(query: string): Promise<Movie[]> {
if (!TOKEN) throw new Error("TMDB token is missing");
try { 
  const response = await axios.get<URLResponse>(API_URL, {
  params: {
    query,
    language: "en-US",
    include_adult: false,
    page: 1
  },
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
});

return response.data.results;
}
  catch (error) {
    console.error("Помилка при отриманні даних:", error);
  return [];
  }
}