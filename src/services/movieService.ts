import axios from "axios";
import type { Movie } from "../types/movie"


const API_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export interface URLResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export async function getMovies(query: string, page:number = 1): Promise<URLResponse> {
if (!TOKEN) throw new Error("TMDB token is missing");
try { 
  const response = await axios.get<URLResponse>(API_URL, {
  params: {
    query,
    page,
    language: "en-US",
    include_adult: false,
    
  },
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
});

return response.data;
}
  catch (error) {
    console.error("Помилка при отриманні даних:", error);
  throw error;
  }
}